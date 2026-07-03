package com.j_word.J_word.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.UserRepository;
import com.j_word.J_word.utils.Encoder;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class LoadData {
    private final Encoder encoder;

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByEmail("1@gmail.com") == null) {
                User user = User.builder()
                        .email("1@gmail.com")
                        .password(encoder.encode("1"))
                        .build();
                userRepository.save(user);
            }
        };
    }
}
