package org.BackEndApp.features.profile.model;
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
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean currentlyWorking;
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
