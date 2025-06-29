package org.BackEndApp.features.Auth.model.dto;

public record AuthRequest(
        String email,
        String password,
        String username) {
}
