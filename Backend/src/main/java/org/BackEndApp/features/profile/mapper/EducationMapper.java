package org.BackEndApp.features.profile.mapper;

import org.BackEndApp.features.Auth.utilities.UserUtils;
import org.BackEndApp.features.profile.model.Education;
import org.BackEndApp.features.profile.model.ProfileDataRequest;
import org.mapstruct.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class EducationMapper {

    @Autowired
    protected UserUtils userUtils;

    @Mapping(target = "user", expression = "java(userUtils.getUserByEmailOrThrow())")


    public abstract Education toEducation(ProfileDataRequest.Education educationRequest);

    public abstract Education updateEducationFromDto(ProfileDataRequest.Education dto, @MappingTarget Education entity);


    public Education bindNewEducation(ProfileDataRequest.Education educationRequest) {
        return toEducation(educationRequest);
    }





}
