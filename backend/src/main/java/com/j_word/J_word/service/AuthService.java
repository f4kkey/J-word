package com.j_word.J_word.service;

import org.springframework.stereotype.Service;

import com.j_word.J_word.dto.AuthRequest;
import com.j_word.J_word.dto.AuthResponse;
import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.UserRepository;
import com.j_word.J_word.utils.Encoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final Encoder encoder;

    public User getUser(String email) {
        return userRepository.findByEmail(null).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public AuthResponse register(AuthRequest authRequest) {
        userRepository.save(User.builder().email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword())).build());
        return new AuthResponse("token", "User register successfully");
    }
}
