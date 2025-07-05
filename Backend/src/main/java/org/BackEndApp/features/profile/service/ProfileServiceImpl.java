package org.BackEndApp.features.profile.service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.exception.*;
import org.BackEndApp.features.Auth.model.*;
import org.BackEndApp.features.Auth.repo.*;
import org.BackEndApp.features.Auth.utilities.*;
import org.BackEndApp.features.profile.enums.*;
import org.BackEndApp.features.profile.mapper.*;
import org.BackEndApp.features.profile.model.*;
import org.BackEndApp.features.profile.model.response.*;
import org.BackEndApp.features.profile.repo.*;
import org.BackEndApp.features.profile.utilities.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepo profileRepo;
    private final UserRepository userRepository;
    private final EducationRepo educationRepo;
    private final ExperienceRepo experienceRepo;
    private final UserUtils userUtils;
    private final ProfileMapper profileMapper;
    private final EducationMapper educationMapper;

    @Value("${image.upload.dir}")
    private String profilePictureUploadPath;

    @Override
    @Transactional
    public ServerResponse saveProfileDetails(ProfileDataRequest.BasicProfile profileRequest) {
        if (ProfileUtilities.isEveryFieldNull(profileRequest)) {
            return new ServerResponse("No fields needs updation", "0000", null);
        }
        User user = userUtils.getUserByEmailOrThrow();
        Profile profile = profileRepo
                .findByUserId(user.getId())
                .orElseGet(Profile::new);

        boolean isNew = profile.getId() == null;

        Profile currentProfile = profileMapper.bindProfile(profile, profileRequest);
        profileRepo.save(currentProfile);
        return new ServerResponse(isNew ? "Profile saved." : "Profile updated.", "0000", null);
    }


    @Override
    public ServerResponse getProfileDetails(String loggedUser) {
        FilteredProfileResponse filteredProfileByEmail = profileRepo.getFilteredProfileByEmail(loggedUser)
                .orElseThrow(() -> new NoRecordsFoundException("No Profile found for email: " + loggedUser));
        User user = userUtils.getUserByEmailOrThrow();
        List<Education> educationList  = educationRepo.findByUser(user);
        List<Experience> experienceList  = experienceRepo.findByUser(user);
        filteredProfileByEmail.setEducationList(educationList != null ? educationList : Collections.emptyList());
        filteredProfileByEmail.setExperienceList(experienceList != null ? experienceList : Collections.emptyList());
        filteredProfileByEmail.setProfileImage(getProfileImage());
        return new ServerResponse("Records fetched successfully","1000", filteredProfileByEmail);
    }

    @Override
    public ServerResponse uploadProfile(String loggedUser, MultipartFile multipartFile) {
        User user = userUtils.getUserByEmailOrThrow();
        try {
            Path uploadPath = Paths.get(profilePictureUploadPath);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = multipartFile.getOriginalFilename();
            String fileExtension = "";

            if (originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String fileName = user.getUsername() + ProfileImageEnum._profile_pic + fileExtension;

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(multipartFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return new ServerResponse("Image uploaded successfully: " + filePath.getFileName(), "0000", null);

        } catch (IOException e) {
            log.error("Exception while uploading profile picture ", e);
            return new ServerResponse("Image upload failure", "0001", null);
        }
    }

    @Override
    public ServerResponse saveExperienceDetails(ProfileDataRequest.Experience experienceRequest) {
        try {
//            Experience experience = bindExperienceRecords(experienceRequest);
            experienceRepo.save(new Experience());
        } catch (Exception e) {
            throw new ProfileSaveException("Exception while saving profile ",e);
        }
        return new ServerResponse("Profile saved","0000",null);
    }




    public Map<String, String> getProfileImage() {
        String username = userUtils.getUserByEmailOrThrow().getUsername();
        try {
            List<String> supportedExtensions = List.of(".png", ".jpg", ".jpeg", ".webp");

            for (String ext : supportedExtensions) {
                String fileName = username + ProfileImageEnum._profile_pic + ext;
                Path filePath = Paths.get(profilePictureUploadPath).resolve(fileName);

                if (Files.exists(filePath)) {
                    byte[] imageBytes = Files.readAllBytes(filePath);
                    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

                    String contentType = switch (ext) {
                        case ".png" -> "image/png";
                        case ".jpg", ".jpeg" -> "image/jpeg";
                        case ".webp" -> "image/webp";
                        default -> "image/jpeg";
                    };

                    return Map.of(
                            "profileImage", base64Image,
                            "contentType", contentType
                    );
                }
            }

            throw new NoRecordsFoundException("No image found for user " + username);

        } catch (IOException e) {
            log.error("Error while fetching profile image", e);
            throw new NoRecordsFoundException("Error retrieving image for user " + username);
        }
    }


    @Override
    public ServerResponse deleteProfileImage(String user) {
        String username = userUtils.getUserByEmailOrThrow().getUsername();
        try {
            List<String> supportedExtensions = List.of(".png", ".jpg", ".jpeg", ".webp");

            for (String ext : supportedExtensions) {
                String fileName = username + ProfileImageEnum._profile_pic + ext;
                Path filePath = Paths.get(profilePictureUploadPath).resolve(fileName);

                if (Files.exists(filePath)) {
                    Files.delete(filePath);
                    return new ServerResponse(
                            "Profile image deleted successfully",
                            "0000",
                            null
                    );
                }
            }
            throw new NoRecordsFoundException("No profile image found to delete for user: " + username);
        } catch (IOException e) {
            log.error("Error while deleting profile image", e);
            throw new NoRecordsFoundException("Error deleting image for user " + username);
        }
    }

    @Override
    public ServerResponse insertEducationDetails(ProfileDataRequest.Education educationRequest) {
        try {
            User user = userUtils.getUserByEmailOrThrow();
            log.info("Inserting education record for user {} ",user.getUsername());
            Education education = educationMapper.bindNewEducation(educationRequest);
            educationRepo.save(education);
            return new ServerResponse("Save success!","0000",null);
        } catch (Exception e) {
            log.error("Exception while saving new education ",e);
            throw e;
        }

    }

    @Override
    public ServerResponse updateEducationDetails(ProfileDataRequest.Education educationRequest) {
        Education education = educationRepo
                .findById(educationRequest.id()).orElseThrow(()-> new NoRecordsFoundException("The requested education does not present"));

        Education currentEducation = educationMapper.updateEducationFromDto(educationRequest, education);
        educationRepo.save(currentEducation);
        return new ServerResponse("Education updated", "0000", null);
    }

    @Override
    public ServerResponse deleteEducationDetails(Long id) {
        Education education = educationRepo.findById(id).orElseThrow(() -> new NoRecordsFoundException("Record not found to delete education " + id));
        educationRepo.deleteById(education.getId());
        return new ServerResponse("Education Details Deleted", "0000", null);
    }



    private List<Experience> bindExperienceRecords(List<ProfileDataRequest.Experience> experienceRequests) {
        return experienceRequests.stream().map(req -> {
            Experience experience = new Experience();
            Optional.ofNullable(req.experienceTitle()).ifPresent(experience::setTitle);
            Optional.ofNullable(req.experienceCompany()).ifPresent(experience::setCompany);
            Optional.ofNullable(req.experienceLocation()).ifPresent(experience::setLocation);
            Optional.ofNullable(req.experienceStartDate())
                    .filter(date -> !date.isBlank())
                    .map(LocalDate::parse)
                    .ifPresent(experience::setStartDate);

            Optional.ofNullable(req.experienceEndDate())
                    .filter(date -> !date.isBlank())
                    .map(LocalDate::parse)
                    .ifPresent(experience::setEndDate);

            experience.setCurrentlyWorking(req.currentlyWorking());
            Optional.ofNullable(req.experienceDescription()).ifPresent(experience::setDescription);
            experience.setUser(userUtils.getUserByEmailOrThrow());
            return experience;
        }).collect(Collectors.toList());
    }


}
