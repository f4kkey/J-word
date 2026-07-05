package com.j_word.J_word.config;

import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.j_word.J_word.model.Post;
import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.PostRepository;
import com.j_word.J_word.repository.UserRepository;
import com.j_word.J_word.utils.Encoder;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class LoadData {
    private final PasswordEncoder encoder;

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository,
            PostRepository postRepository) {
        return args -> {
            List<User> users = createUsers(userRepository);
            createPosts(postRepository, users);
        };
    }

    private List<User> createUsers(UserRepository userRepository) {
        List<User> users = List.of(
                createUser("john.doe@example.com", "john", "John", "Doe",
                        "San Francisco, CA"),
                createUser("anne.claire@example.com", "anne", "Anne", "Claire", "Paris, Fr"),
                createUser("arnauld.manner@example.com", "arnauld", "Arnauld", "Manner",
                        "Dakar, SN"),
                createUser("moussa.diop@example.com", "moussa", "Moussa", "Diop",
                        "Bordeaux, FR"),
                createUser("awa.diop@example.com", "awa", "Awa", "Diop", "New Delhi, IN"));

        userRepository.saveAll(users);
        return users;
    }

    private User createUser(String email, String password, String firstName, String lastName,
            String location) {
        User user = User.builder().email(email).password(encoder.encode(password)).emailVerified(true)
                .firstName(firstName).lastName(lastName).location(location).build();
        return user;
    }

    private void createPosts(PostRepository postRepository, List<User> users) {
        Random random = new Random();
        for (int j = 1; j <= 10; j++) {
            Post post = Post.builder().content("This is content.").author(users.get(random.nextInt(users.size())))
                    .likes(generateLikes(users, j, random)).build();
            postRepository.save(post);
        }
    }

    private HashSet<User> generateLikes(List<User> users, int postNumber, Random random) {
        HashSet<User> likes = new HashSet<>();

        if (postNumber == 1) {
            while (likes.size() < 3) {
                likes.add(users.get(random.nextInt(users.size())));
            }
        } else {
            int likesCount = switch (postNumber % 5) {
                case 0 -> 3;
                case 2, 3 -> 2;
                default -> 1;
            };
            for (int i = 0; i < likesCount; i++) {
                likes.add(users.get(random.nextInt(users.size())));
            }
        }
        return likes;
    }
}
