package com.j_word.J_word.service;

import org.springframework.stereotype.Service;

import com.j_word.J_word.dto.PostRequest;
import com.j_word.J_word.model.Post;
import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.PostRepository;
import com.j_word.J_word.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(PostRequest postRequest, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = Post.builder().content(postRequest.getContent()).author(user).picture(postRequest.getPicture())
                .build();
        return postRepository.save(post);
    }
}
