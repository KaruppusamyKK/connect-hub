package org.BackEndApp.features.Auth.model;
import jakarta.persistence.*;
import lombok.*;
import org.BackEndApp.features.profile.model.Profile;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private LocalDateTime signupDate;

    @PrePersist
    public void preSave(){
        this.signupDate = LocalDateTime.now();
    }
}

