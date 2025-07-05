package org.BackEndApp.features.profile.model.dto;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProfileBindResult<T> {
    private boolean allFieldsNull;
    private boolean isNewProfile;
    private T data;
}
