package org.BackEndApp.features.Auth.model.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {
    String message;
    String respCode;
    String token;
    String username;


    public AuthResponse(String message, String respCode, String token,String username) {
        this.message = message;
        this.respCode = respCode;
        this.token = token;
        this.username = username;
    }

    public AuthResponse(String message, String respCode) {
        this.message = message;
        this.respCode = respCode;
    }
}
