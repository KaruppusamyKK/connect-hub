package org.BackEndApp.features.profile.model;
import jakarta.persistence.*;
import lombok.*;
import org.BackEndApp.features.Auth.model.User;
@Getter
@Setter
@Builder
@NoArgsConstructor
@Entity
@AllArgsConstructor
@Table(name = "Profile", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone")
})
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // personal data
    private String fullName;
    private String headline;
    private String summary;


    // contact and websites
    private String phone;
    private String address;
    private String city;
    private String country;
    private String postalCode;
    private String linkedinUrl;
    private String githubUrl;
    private String websiteUrl;

    private boolean showPhoneNumber;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
