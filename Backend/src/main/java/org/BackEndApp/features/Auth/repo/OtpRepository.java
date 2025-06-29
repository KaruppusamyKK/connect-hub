package org.BackEndApp.features.Auth.repo;
import org.BackEndApp.features.Auth.enums.OtpUsageType;
import org.BackEndApp.features.Auth.model.OtpData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface OtpRepository extends JpaRepository<OtpData, Long> {

    Optional<OtpData> findByEmailAndUsage(String username, OtpUsageType otpUsageType);

    Optional<OtpData> findByEmail(String username);



}

