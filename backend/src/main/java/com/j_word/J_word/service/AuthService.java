package com.j_word.J_word.service;

import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;

    public static String generate5DigitToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(5);
        for (int i = 0; i < 5; i++) {
            token.append(random.nextInt(10));
        }
        return token.toString();
    }

    public void sendEmailVerificationToken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && !user.get().isEmailVerified()) {
            String emailVerificationToken = generate5DigitToken();
            String hashToken = passwordEncoder.encode(emailVerificationToken);
            user.get().setEmailVerificationToken(hashToken);
            user.get().setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
            userRepository.save(user.get());
            String subject = "Email Verification";
            String body = String.format(
                    "Enter this code to verify your email: " + "%s\n\n" + "The code will expire in 5 minutes.",
                    emailVerificationToken);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("error while sending email token: {}", e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("Email verification token failed, or email is already verify");
        }
    }

    public void validateEmailVerificationToken(String token, String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(token, user.get().getEmailVerificationToken())
                && !user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setEmailVerified(true);
            user.get().setEmailVerificationToken(null);
            user.get().setEmailVerificationTokenExpiryDate(null);
            userRepository.save(user.get());
        } else if (user.isPresent() && passwordEncoder.matches(token, user.get().getEmailVerificationToken())
                && user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Email verification token expired");
        } else {
            throw new IllegalArgumentException("Email verification token failed");
        }
    }

    public void sendPasswordResetToken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String passwordResetToken = generate5DigitToken();
            String hashToken = passwordEncoder.encode(passwordResetToken);
            user.get().setPasswordResetToken(hashToken);
            user.get().setPasswordResetTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
            userRepository.save(user.get());
            String subject = "Password reset";
            String body = String.format(
                    "You requested a password reset. \n\n Enter this code to reset your password: " + "%s\n\n"
                            + "The code will expire in 5 minutes.",
                    passwordResetToken);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("error while sending email token: {}", e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    public void resetPassword(String token, String email, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(token, user.get().getPasswordResetToken())
                && !user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setPassword(passwordEncoder.encode(newPassword));
            user.get().setPasswordResetToken(null);
            user.get().setPasswordResetTokenExpiryDate(null);
            userRepository.save(user.get());
        } else if (user.isPresent() && passwordEncoder.matches(token, user.get().getPasswordResetToken())
                && user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Password reset token expired");
        } else {
            throw new IllegalArgumentException("Password reset token failed");
        }
    }

    public AuthResponse register(AuthRequest authRequest) throws UnsupportedEncodingException, MessagingException {
        User user = User.builder().email(authRequest.getEmail())
                .password(passwordEncoder.encode(authRequest.getPassword())).build();

        String emailVerificationToken = generate5DigitToken();
        String hashToken = passwordEncoder.encode(emailVerificationToken);
        user.setEmailVerificationToken(hashToken);
        user.setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);
        String subject = "Email Verification";
        String body = String.format(
                "Enter this code to verify your email: " + "%s\n\n" + "The code will expire in 5 minutes.",
                emailVerificationToken);
        try {
            emailService.sendEmail(user.getEmail(), subject, body);
        } catch (Exception e) {
            logger.info("error while sending email token: {}", e.getMessage());
        }

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
