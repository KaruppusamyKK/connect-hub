package org.BackEndApp.features.Auth.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.exception.UserAlreadyExistsException;
import org.BackEndApp.features.Auth.enums.OtpUsageType;
import org.BackEndApp.features.Auth.model.OtpData;
import org.BackEndApp.features.Auth.model.User;
import org.BackEndApp.features.Auth.model.dto.AuthRequest;
import org.BackEndApp.features.Auth.model.dto.AuthResponse;
import org.BackEndApp.features.Auth.repo.OtpRepository;
import org.BackEndApp.features.Auth.repo.UserRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final EmailService emailService;


    public AuthResponse registerUser(AuthRequest request) {
        return (AuthResponse) userRepository.findByEmail(request.email())
                .map(user -> {
                    throw new UserAlreadyExistsException("User already exists " + request.email());
                })
                .orElseGet(() -> {
                    User user = new User();
                    user.setEmail(request.email());
                    user.setPassword(request.password());
                    userRepository.save(user);
                    return new AuthResponse("Signup pending, otp not verified", "0000");
                });
    }


    public String getUsername(String email) {
        return userRepository.findByEmail(email)
                .map(User::getUsername)
                .orElse(null);
    }

    public Map<String, Object> generateOtp(String email) throws MessagingException {
        int otp = Math.abs(UUID.randomUUID().toString().hashCode()) % 900000 + 100000;
        userRepository.findByEmail(email)
                .ifPresent(user -> {
                    throw new UserAlreadyExistsException("User already exists with email: " + email);
                });
        requestOtp(email, otp);
        return Map.of("REQUEST_OTP", "Sent via email");
    }

    public Map<String, Object> verifyOtp(String email, int otp,AuthRequest request) {
        return Map.of("VERIFY_OTP", verifySignupOtp(email, otp,request));
    }

    private boolean verifySignupOtp(String email, int otp,AuthRequest request) {

        OtpData otpData = otpRepository.findByEmailAndUsage(email, OtpUsageType.SIGNUP)
                .orElseThrow(()-> new RuntimeException("No records found"));
        BigInteger existingOtp = otpData.getOtp();
        boolean isOtpVerified = existingOtp != null && existingOtp.equals(BigInteger.valueOf(otp));
        if (isOtpVerified){
            saveUserInDb(email,request);
        }
        return isOtpVerified;
    }


    private void saveUserInDb(String email, AuthRequest request) {
        boolean userExists = userRepository.findByEmail(email).isPresent();

        if (userExists) {
            throw new UserAlreadyExistsException("User already exists with email: " + email);
        }

        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setPassword(request.password());
        newUser.setEmail(email);

        userRepository.save(newUser);
    }




    private void requestOtp(String email, int otp) throws MessagingException {
        emailService.mailTemplate(email, otp);
        saveOtpInDb(email, otp);
    }



    @Async
    protected void saveOtpInDb(String email, int otp) {
        otpRepository.findByEmail(email)
                .map(otpData -> {
                    otpData.setOtp(BigInteger.valueOf(otp));
                    otpData.setUsage(OtpUsageType.SIGNUP);
                    otpData.setLastUpdatedAt(LocalDateTime.now());
                    return otpRepository.save(otpData);
                })
                .orElseGet(() -> {
                    OtpData newOtp = new OtpData();
                    newOtp.setEmail(email);
                    newOtp.setOtp(BigInteger.valueOf(otp));
                    newOtp.setUsage(OtpUsageType.SIGNUP);
                    newOtp.setLastUpdatedAt(LocalDateTime.now());
                    return otpRepository.save(newOtp);
                });
    }

}
