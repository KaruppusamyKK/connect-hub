package org.BackEndApp.exception;

public class UserAlreadyExistsException extends CustomServiceException {

    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
