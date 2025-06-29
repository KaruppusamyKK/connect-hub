package org.BackEndApp.features.Auth.model;
import jakarta.persistence.*;
import lombok.*;
import org.BackEndApp.features.Auth.enums.OtpUsageType;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "OtpData", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Entity
@ToString
public class OtpData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private BigInteger otp;

    @Enumerated(EnumType.STRING)
    @Column(name = "`usage`")
    private OtpUsageType usage;

    private LocalDateTime createdAt;

    private LocalDateTime lastUpdatedAt;

    @PrePersist
    private void setDefault(){
        this.createdAt = LocalDateTime.now();
    }

}
