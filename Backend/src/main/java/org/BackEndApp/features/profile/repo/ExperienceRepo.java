package org.BackEndApp.features.profile.repo;

import org.BackEndApp.features.Auth.model.User;
import org.BackEndApp.features.profile.model.Education;
import org.BackEndApp.features.profile.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepo extends JpaRepository<Experience,Long> {

    List<Experience> findByUser(User user);
}
