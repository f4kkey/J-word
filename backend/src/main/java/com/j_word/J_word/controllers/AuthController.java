package com.j_word.J_word.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j_word.J_word.dto.AuthRequest;
import com.j_word.J_word.dto.AuthResponse;
import com.j_word.J_word.model.User;
import com.j_word.J_word.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/user")
    public User getUser(String email) {
        return authService.getUser(email);
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody AuthRequest authRequest) {
        return authService.register(authRequest);
    }

}
