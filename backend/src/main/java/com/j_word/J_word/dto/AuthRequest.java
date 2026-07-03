package com.j_word.J_word.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthRequest {
    @NotBlank(message = "email is required")
    @Email
    private String email;
    @NotBlank(message = "password is required")
    private String password;

}
