package com.j_word.J_word.service;

import java.util.List;

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

    public Post editPost(Long postId, PostRequest postRequest, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (!post.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the post");
        }

        post.setContent(postRequest.getContent());
        post.setPicture(postRequest.getPicture());

        return postRepository.save(post);
    }

    public List<Post> getFeedPosts(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return postRepository.findByAuthorIdNotOrderByCreatedAtDesc(user.getId());
    }

    public List<Post> getAllPosts(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return postRepository.findAllByOrderByCreatedAtDesc(user.getId());
    }

    public void deletePost(Long postId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (!post.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the post");
        }

        postRepository.delete(post);
    }

    public List<Post> getPostsByUser(Long userId) {
        return postRepository.findByAuthorId(userId);
    }

    public Post likePost(Long postId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (post.getLikes().contains(user)) {
            post.getLikes().remove(user);
        } else {
            post.getLikes().add(user);
        }

        return postRepository.save(post);
    }
}
