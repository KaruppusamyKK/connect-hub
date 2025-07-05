package org.BackEndApp.features.Auth.utilities;

import lombok.RequiredArgsConstructor;
import org.BackEndApp.exception.UserNotFoundException;
import org.BackEndApp.features.Auth.model.User;
import org.BackEndApp.features.Auth.repo.UserRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserUtils {

    private final UserRepository userRepository;

    public User getUserByEmailOrThrow() {
        String email = SecurityUtil.LOGGED_USER();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }
}
