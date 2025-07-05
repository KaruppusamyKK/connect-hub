package org.BackEndApp.features.profile.model.response;

import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.BackEndApp.features.profile.model.Education;
import org.BackEndApp.features.profile.model.Experience;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
@Setter
public class FilteredProfileResponse {

    private String headline;
    private String summary;
    private String phone;

    private String country;
    private String postalCode;
    private String linkedinUrl;
    private String githubUrl;
    private String websiteUrl;
    private String username;
    private String email;

    public FilteredProfileResponse(String headline, String summary, String phone, String country, String postalCode, String linkedinUrl, String githubUrl, String websiteUrl, String username, String email) {
        this.headline = headline;
        this.summary = summary;
        this.phone = phone;
        this.country = country;
        this.postalCode = postalCode;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
        this.websiteUrl = websiteUrl;
        this.username = username;
        this.email = email;
    }

    @Transient
    List<Education> educationList;

    @Transient
    List<Experience> experienceList;

    @Transient
    private Map<String, String> profileImage;
}
