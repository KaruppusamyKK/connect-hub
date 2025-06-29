package org.BackEndApp.features.Auth.controller;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.Auth.model.dto.AuthRequest;
import org.BackEndApp.features.Auth.model.dto.AuthResponse;
import org.BackEndApp.features.Auth.security.jwt.JwtService;
import org.BackEndApp.features.Auth.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;


    /***
     * @param request
     * Username & password are given and as response JWT token is responded to UI
     */

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        try {
            log.info("Login attempt by user: {}", request.email());
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), "{noop}" + request.password())
            );
            String token = jwtService.generateAccessToken(request.email());
            String username = userService.getUsername(request.email());
            return ResponseEntity.ok().body(new AuthResponse("Token generated", "0000",token,username));
        } catch (AuthenticationException e) {
            log.warn("Invalid credentials for user: {}", request.email());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Token failed to generate - {ErrorMsg : "+e.getMessage()+" }", "0001"));
        }
    }

//    @PostMapping("/register")
//    public ResponseEntity<RegisterServiceResponse> register(@RequestBody SignupRequest request) {
//        log.info("Signup request for username {} , and Request Object {} ", request.getUsername(),request);
//        RegisterServiceResponse registerServiceResponse = userService.registerUser(request);
//        return ResponseEntity.status(HttpStatus.OK).body(registerServiceResponse);
//    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        log.info("Signup request for username {} , and Request Object {} ", request.email(),request);
        return ResponseEntity.status(HttpStatus.OK).body(userService.registerUser(request));
    }

    @PostMapping("/generateOtp/{email}")
    public ResponseEntity<?> handleOtp(@PathVariable String email) throws MessagingException {
        log.info("OTP generation requested for user '{}' during signup process.", email);
        return ResponseEntity.ok().body(userService.generateOtp(email));
    }


    @PostMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<?> handleOtp(@PathVariable String email,
                                       @PathVariable String otp,
                                       @RequestBody AuthRequest request) {

        log.info("OTP verification processing for user '{}', with otp '{}' ", email,otp);

        Map<String, Object> resultMap  = userService.verifyOtp(email, Integer.parseInt(otp),request);
        return ResponseEntity.status(
                (boolean) resultMap.get("VERIFY_OTP") ? HttpStatus.OK : HttpStatus.NOT_FOUND)
                .body(resultMap);
    }

}