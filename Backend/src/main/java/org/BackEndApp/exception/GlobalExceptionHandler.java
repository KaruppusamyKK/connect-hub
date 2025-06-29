package org.BackEndApp.exception;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.profile.model.response.ProfileResponse;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {



    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> userAlreadyExistException(UserAlreadyExistsException exception) {
        log.error("UserAlreadyExistsException: ", exception);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", exception.getMessage(),
                "errorCode", "1001"));
    }

    @ExceptionHandler(ProfileSaveException.class)
    public ResponseEntity<ProfileResponse> handleProfileSaveException(ProfileSaveException exception) {
        log.error("ProfileSaveException: ", exception);

        String rootCauseMessage = ExceptionUtils.getRootCauseMessage(exception);

        ProfileResponse profileResponse = new ProfileResponse(
                "Profile save failed: " + rootCauseMessage,
                "0001",
                null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(profileResponse);
    }



}
