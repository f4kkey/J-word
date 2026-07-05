package com.j_word.J_word.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "users")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Email
    @Column(unique = true)
    private String email;

    private boolean emailVerified = false;
    private String emailVerificationToken = null;
    private LocalDateTime emailVerificationTokenExpiryDate = null;

    @JsonIgnore
    private String password;
    private String passwordResetToken = null;
    private LocalDateTime passwordResetTokenExpiryDate = null;

    private String firstName = null;
    private String lastName = null;
    private String location = null;
    private String profilePicture = null;
    private String coverPicture = null;
    private Boolean profileComplete = false;
    private String about = null;

    void updateProfileCompletion() {
        this.profileComplete = (this.firstName != null && !this.firstName.isEmpty()) &&
                (this.lastName != null && !this.lastName.isEmpty()) &&
                (this.location != null && !this.location.isEmpty());
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        updateProfileCompletion();
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        updateProfileCompletion();
    }

    public void setLocation(String location) {
        this.location = location;
        updateProfileCompletion();
    }
}
