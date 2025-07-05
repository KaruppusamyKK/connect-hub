package org.BackEndApp.features.profile.utilities;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.List;

@Slf4j
public class ProfileUtilities<T> {

    public static <T> boolean areAllFieldsNullInList(List<T> list) {
        if (list == null || list.isEmpty()) return false;

        for (T item : list) {
            if (!isEveryFieldNull(item)) {
                return false;
            }
        }
        return true;
    }


    public static <T> boolean isEveryFieldNull(T data) {
        if (data == null) return false;

        String className = data.getClass().getName();
        if (className.startsWith("java.")) {
            return false;
        }

        for (Field field : data.getClass().getDeclaredFields()) {
            if (Modifier.isStatic(field.getModifiers()) || field.isSynthetic()) continue;
            try {
                field.setAccessible(true);
                if (field.get(data) != null) {
                    return false;
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Error accessing field: " + field.getName(), e);
            }
        }

        return true;
    }


}
