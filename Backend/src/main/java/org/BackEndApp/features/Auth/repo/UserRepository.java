package org.BackEndApp.features.Auth.repo;
import org.BackEndApp.features.Auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String username);

    Optional<User> findByUsername(String username);
}

