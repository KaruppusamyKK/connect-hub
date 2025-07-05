package org.BackEndApp.exception;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.stereotype.Component;

import java.sql.SQLSyntaxErrorException;
import java.util.Set;

@Component
public class ExceptionRegistry {
    private final Set<Class<? extends Throwable>> handledExceptions = Set.of(
            UserNotFoundException.class,
            SQLSyntaxErrorException.class,
            ProfileSaveException.class,
            NoRecordsFoundException.class

    );

    public boolean isHandled(Throwable ex) {
        return handledExceptions.stream().anyMatch(clazz -> clazz.isAssignableFrom(ex.getClass()));
    }

    public boolean isRootCauseHandled(Throwable ex) {
        Throwable rootCause = ExceptionUtils.getRootCause(ex);
        return rootCause != null && handledExceptions.stream().anyMatch(clazz -> clazz.isAssignableFrom(rootCause.getClass()));
    }
}
