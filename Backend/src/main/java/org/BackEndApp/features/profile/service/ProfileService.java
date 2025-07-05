package org.BackEndApp.features.profile.service;

import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.BackEndApp.features.profile.model.response.ServerResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProfileService {

    ServerResponse saveProfileDetails(ProfileDataRequest.BasicProfile profileRequest) throws IllegalAccessException;

    ServerResponse getProfileDetails(String s);

    ServerResponse uploadProfile(String loggedUser, MultipartFile multipartFile);


    ServerResponse saveExperienceDetails(ProfileDataRequest.Experience experienceRequest);

//    ServerResponse getProfileImage(String user);

    ServerResponse deleteProfileImage(String user);

    ServerResponse insertEducationDetails(ProfileDataRequest.Education educationRequest);

    ServerResponse updateEducationDetails(ProfileDataRequest.Education educationRequest);

    ServerResponse deleteEducationDetails(Long id);
}
