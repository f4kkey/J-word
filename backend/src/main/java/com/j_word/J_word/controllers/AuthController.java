package com.j_word.J_word.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j_word.J_word.dto.AuthRequest;
import com.j_word.J_word.dto.AuthResponse;
import com.j_word.J_word.service.AuthService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.io.UnsupportedEncodingException;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody AuthRequest authRequest)
            throws UnsupportedEncodingException, MessagingException {
        return authService.register(authRequest);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest authRequest) {
        return authService.login(authRequest);
    }

    @GetMapping("/getme")
    public String getCurrentUser(Authentication authentication) {
        return authService.getCurrentUser(authentication);
    }

    @PostMapping("/email/validate")
    public String verifyEmail(@RequestParam String token, Authentication authentication) {
        authService.validateEmailVerificationToken(token, authentication.getName());
        return "Email verifycation token validated successfully.";
    }

    @GetMapping("/email/token")
    public String getEmailToken(Authentication authentication) {
        authService.sendEmailVerificationToken(authentication.getName());
        return "Email verification token sent successfully.";
    }

    @GetMapping("/password/reset")
    public String getPasswordResetToken(@RequestParam String email) {
        authService.sendPasswordResetToken(email);
        return "Password reset token sent successfully.";
    }

    @PostMapping("/password/reset")
    public String verifyEmail(@RequestParam String newPassword, @RequestParam String token,
            @RequestParam String email) {
        authService.resetPassword(token, email, newPassword);
        return "Password reset successfully.";
    }

}
