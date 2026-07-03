package com.j_word.J_word.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.j_word.J_word.dto.AuthRequest;
import com.j_word.J_word.dto.AuthResponse;
import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.UserRepository;
import com.j_word.J_word.security.JwtService;
import com.j_word.J_word.utils.Encoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(AuthRequest authRequest) {
        User user = User.builder().email(authRequest.getEmail())
                .password(passwordEncoder.encode(authRequest.getPassword())).build();

        userRepository.save(user);
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token, "User register successfully");
    }

    public AuthResponse login(AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()));

        String token = jwtService.generateToken(authRequest.getEmail());

        return new AuthResponse(token, "User login successfully");
    }

    public String getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return email;
    }
}
