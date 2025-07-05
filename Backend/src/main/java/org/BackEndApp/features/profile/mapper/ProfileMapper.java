package org.BackEndApp.features.profile.mapper;

import org.BackEndApp.features.Auth.utilities.UserUtils;
import org.BackEndApp.features.profile.model.Profile;
import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class ProfileMapper {

    @Autowired
    protected UserUtils userUtils;

    @Mapping(target = "user", expression = "java(userUtils.getUserByEmailOrThrow())")
    public abstract Profile toProfile(ProfileDataRequest.BasicProfile basicProfile);

    public abstract void updateProfile(@MappingTarget Profile profile, ProfileDataRequest.BasicProfile update);

    public Profile bindProfile(Profile profile, ProfileDataRequest.BasicProfile request) {
        updateProfile(profile, request);
        profile.setUser(userUtils.getUserByEmailOrThrow());
        return profile;
    }
}
