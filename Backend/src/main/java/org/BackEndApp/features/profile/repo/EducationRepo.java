package org.BackEndApp.features.profile.repo;

import org.BackEndApp.features.Auth.model.User;
import org.BackEndApp.features.profile.model.Education;
import org.BackEndApp.features.profile.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EducationRepo extends JpaRepository<Education,Long> {

    List<Education> findByUser(User user);


}
