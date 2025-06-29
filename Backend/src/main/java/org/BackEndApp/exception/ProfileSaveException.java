package org.BackEndApp.exception;

public class ProfileSaveException extends RuntimeException {
    public ProfileSaveException(String message, Exception e) {
        super(message,e);
    }
}
