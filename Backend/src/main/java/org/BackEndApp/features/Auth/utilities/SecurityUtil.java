package org.BackEndApp.features.Auth.utilities;
import org.springframework.security.core.context.SecurityContextHolder;
public class SecurityUtil {

    public static String LOGGED_USER(){
        return SecurityContextHolder.getContext().getAuthentication().getName();

    }
}
