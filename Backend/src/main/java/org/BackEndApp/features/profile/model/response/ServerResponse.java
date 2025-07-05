package org.BackEndApp.features.profile.model.response;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServerResponse {

    private String message;
    private String respCode;
    private Object Data;



}
