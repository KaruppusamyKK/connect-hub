package org.BackEndApp.features.profile.model;
import jakarta.persistence.*;
import lombok.*;
import org.BackEndApp.features.Auth.model.User;
@Getter
@Setter
@Builder
@NoArgsConstructor
@Entity
@ToString
@AllArgsConstructor
@Table(name = "Profile", uniqueConstraints = {
        @UniqueConstraint(columnNames = "phone")
})
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // personal data
    private String headline;
    private String summary;


    // contact and websites
    private String phone;
    private String country;
    private String linkedinUrl;
    private String githubUrl;
    private String websiteUrl;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
