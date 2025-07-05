package org.BackEndApp.exception;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.BackEndApp.features.profile.model.response.ServerResponse;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
@RequiredArgsConstructor
@Slf4j
public class GlobalExceptionHandler {

    private final ExceptionRegistry exceptionRegistry;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ServerResponse> handleAllExceptions(Exception ex) {
        if (exceptionRegistry.isHandled(ex) || exceptionRegistry.isRootCauseHandled(ex)) {log.error("Handled Exception: ", ex);

            ServerResponse serverResponse = new ServerResponse(
                    "Request failed: " + ExceptionUtils.getRootCauseMessage(ex),
                    "0001",
                    null
            );

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(serverResponse);
        }


        log.error("Unhandled Exception: ", ex);

        ServerResponse fallbackResponse = new ServerResponse(
                "Something went wrong: " + ExceptionUtils.getRootCauseMessage(ex),
                "9999",
                null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(fallbackResponse);
    }
}
