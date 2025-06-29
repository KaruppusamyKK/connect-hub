package org.BackEndApp.features.profile.model;

import java.time.LocalDate;

public record ProfileDataRequest(
        String fullName,
        String headline,
        String summary,
        boolean showPhoneNumber,
        String phone,
        String address,
        String city,
        String country,
        String postalCode,
        String linkedinUrl,
        String githubUrl,
        String websiteUrl,


        // education details
        String degree,
        String collegeName,
        LocalDate startDate,
        LocalDate endDate,
        String grade,
        String description
        ) {
}
