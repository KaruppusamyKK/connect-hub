package org.BackEndApp.features.profile.service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.exception.ProfileSaveException;
import org.BackEndApp.exception.UserNotFoundException;
import org.BackEndApp.features.Auth.model.User;
import org.BackEndApp.features.Auth.repo.UserRepository;
import org.BackEndApp.features.Auth.utilities.SecurityUtil;
import org.BackEndApp.features.profile.model.Education;
import org.BackEndApp.features.profile.model.Profile;
import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.BackEndApp.features.profile.model.response.FilteredProfileResponse;
import org.BackEndApp.features.profile.model.response.ProfileResponse;
import org.BackEndApp.features.profile.repo.EducationRepo;
import org.BackEndApp.features.profile.repo.ProfileRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private final ProfileRepo profileRepo;
    private final UserRepository userRepository;
    private final EducationRepo educationRepo;

    @Override
    public ProfileResponse saveProfileDetails(ProfileDataRequest profileRequest) {
        try {
            // #Step1 : save profile
            Profile profile =  bindProfileRecords(profileRequest);
            Profile savedProfile = profileRepo.save(profile);
            // #Step2 : save education
            Education education = bindEducationRecords(profileRequest);
            educationRepo.save(education);

        } catch (Exception e) {
            throw new ProfileSaveException("Exception while saving profile ",e);
        }
        return new ProfileResponse("Profile saved","0000",null);
    }

    @Override
    public ProfileResponse getProfileDetails(String loggedUser) {
        FilteredProfileResponse filteredProfileByEmail = profileRepo.getFilteredProfileByEmail(loggedUser);
        User user = userRepository.findByEmail(loggedUser).get();
        List<Education> educationList  = educationRepo.findByUser(user);
        filteredProfileByEmail.setEducationList(educationList);
        return new ProfileResponse("Records fetched successfully","1000", filteredProfileByEmail);
    }


    private Profile bindProfileRecords(ProfileDataRequest profileRequest) {
        Profile profile = new Profile();
        Optional.ofNullable(profileRequest.fullName()).ifPresent(profile::setFullName);
        // if null does nothing , if not null setter is invoked

        Optional.ofNullable(profileRequest.headline()).ifPresent(profile::setHeadline);
        Optional.ofNullable(profileRequest.summary()).ifPresent(profile::setSummary);

        Optional.ofNullable(profileRequest.phone()).ifPresent(profile::setPhone);
        Optional.ofNullable(profileRequest.address()).ifPresent(profile::setAddress);
        Optional.ofNullable(profileRequest.city()).ifPresent(profile::setCity);
        Optional.ofNullable(profileRequest.country()).ifPresent(profile::setCountry);
        Optional.ofNullable(profileRequest.postalCode()).ifPresent(profile::setPostalCode);
        Optional.ofNullable(profileRequest.linkedinUrl()).ifPresent(profile::setLinkedinUrl);
        Optional.ofNullable(profileRequest.githubUrl()).ifPresent(profile::setGithubUrl);
        Optional.ofNullable(profileRequest.websiteUrl()).ifPresent(profile::setWebsiteUrl);
        Optional.of(profileRequest.showPhoneNumber()).ifPresent(profile::setShowPhoneNumber);


        profile.setUser(setUser());
        return profile;
    }

    private Education bindEducationRecords(ProfileDataRequest profileRequest) {
        Education education = new Education();

        Optional.ofNullable(profileRequest.degree()).ifPresent(education::setDegree);
        Optional.ofNullable(profileRequest.collegeName()).ifPresent(education::setCollegeName);
        Optional.ofNullable(profileRequest.startDate()).ifPresent(education::setStartDate);
        Optional.ofNullable(profileRequest.endDate()).ifPresent(education::setEndDate);
        Optional.ofNullable(profileRequest.grade()).ifPresent(education::setGrade);
        Optional.ofNullable(profileRequest.description()).ifPresent(education::setDescription);

        education.setUser(setUser());

        return education;
    }


    public User setUser(){
        return userRepository.findByEmail(SecurityUtil.LOGGED_USER())
                .orElseThrow(() -> new UserNotFoundException("Logged-in user not found "+SecurityUtil.LOGGED_USER()));
    }

}
