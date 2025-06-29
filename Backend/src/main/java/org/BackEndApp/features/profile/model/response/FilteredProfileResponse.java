package org.BackEndApp.features.profile.model.response;

import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.BackEndApp.features.profile.model.Education;

import java.util.List;

@Getter
@AllArgsConstructor
@Setter
public class FilteredProfileResponse {

    private String fullName;
    private String headline;
    private String summary;
    private String phone;
    private String address;
    private String city;
    private String country;
    private String postalCode;
    private String linkedinUrl;
    private String githubUrl;
    private String websiteUrl;
    private boolean showPhoneNumber;
    private String username;
    private String email;

    public FilteredProfileResponse(String fullName, String headline, String summary, String phone, String address, String city, String country, String postalCode, String linkedinUrl, String githubUrl, String websiteUrl, boolean showPhoneNumber, String username, String email) {
        this.fullName = fullName;
        this.headline = headline;
        this.summary = summary;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
        this.websiteUrl = websiteUrl;
        this.showPhoneNumber = showPhoneNumber;
        this.username = username;
        this.email = email;
    }

    @Transient
    List<Education> educationList;
}
