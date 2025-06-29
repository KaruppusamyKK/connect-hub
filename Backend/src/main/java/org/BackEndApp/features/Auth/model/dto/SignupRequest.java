package org.BackEndApp.features.Auth.model.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class SignupRequest {

    private String username;
    private String password;
    private String email;
    private String phoneNumber;

    private String firstName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;

    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String timeZone;

    private String profilePhotoUrl;
    private String headline;
    private String about;
    private boolean profileVisibility;

    private String highestEducation;
    private String universityName;
    private String graduationYear;

    private String currentCompany;
    private String currentPosition;
    private String industry;
    private int yearsOfExperience;

    private List<String> skills;
    private List<String> interests;

    private String linkedInUrl;
    private String githubUrl;
    private String personalWebsite;

    private boolean emailVerified;
    private boolean phoneVerified;
    private boolean twoFactorEnabled;
    private boolean profileCompleted;
    private Date signupDate;
}
