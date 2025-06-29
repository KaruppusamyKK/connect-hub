package org.BackEndApp.features.profile.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.BackEndApp.features.Auth.model.User;

import java.time.LocalDate;
@Getter
@Setter
@Builder
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class Education {
    @Id
    @GeneratedValue
    private Long id;


    private String degree;
    private String collegeName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String grade;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
