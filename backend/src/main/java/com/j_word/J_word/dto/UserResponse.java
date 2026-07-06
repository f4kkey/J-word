package com.j_word.J_word.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    @Id
    private Long id;
    @Email
    @Column(unique = true)
    private String email;

    private boolean emailVerified;
}
