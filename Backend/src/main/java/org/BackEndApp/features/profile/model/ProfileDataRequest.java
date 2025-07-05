package org.BackEndApp.features.profile.model;

import java.time.LocalDate;
import java.util.List;

public record ProfileDataRequest(
        BasicProfile basicProfile,
        List<Education> educationList,
        List<Experience> experienceList
) {

    public record BasicProfile(
            String headline, // headline
            String summary,// (about)
            String phone,
            String country,
            String linkedinUrl,
            String githubUrl,
            String websiteUrl
    ) {}

    public record Education(
            String degree,
            String collegeName,
            LocalDate startDate,
            LocalDate endDate,
            String grade,
            String description,
            Long id
    ) {}

    public record Experience(
            String experienceTitle, //title
            String experienceCompany, //company
            String experienceLocation, //location
            String experienceStartDate, //startDate
            String experienceEndDate, //endDate
            boolean currentlyWorking,
            String experienceDescription //description
    ) {}
}
