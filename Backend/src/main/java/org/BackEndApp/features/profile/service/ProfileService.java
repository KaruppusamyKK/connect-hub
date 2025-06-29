package org.BackEndApp.features.profile.service;

import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.BackEndApp.features.profile.model.response.ProfileResponse;

public interface ProfileService {

    ProfileResponse saveProfileDetails(ProfileDataRequest profileRequest);

    ProfileResponse getProfileDetails(String s);
}
