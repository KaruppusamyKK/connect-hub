package org.BackEndApp.features.profile.repo;

import org.BackEndApp.features.profile.model.Profile;
import org.BackEndApp.features.profile.model.response.FilteredProfileResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ProfileRepo extends JpaRepository<Profile, Long> {


    @Query(value = """
            SELECT 
                p.headline AS headline,
                p.summary AS summary,
                p.phone AS phone,
                
    
                p.country AS country,
                p.postal_code AS postalCode,
                p.linkedin_url AS linkedinUrl,
                p.github_url AS githubUrl,
                p.website_url AS websiteUrl,
            
                u.username,
                u.email
            FROM user u
            INNER JOIN profile p ON u.id = p.user_id
            WHERE u.email = :email
            """, nativeQuery = true)
    Optional<FilteredProfileResponse> getFilteredProfileByEmail(@Param("email") String email);


    @Query("SELECT p FROM Profile p")
    Optional<Profile> findByUserId(@Param("id") Long id);
}
