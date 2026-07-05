package com.j_word.J_word.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j_word.J_word.dto.CommentRequest;
import com.j_word.J_word.dto.PostRequest;
import com.j_word.J_word.model.Comment;
import com.j_word.J_word.model.Post;
import com.j_word.J_word.service.FeedService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/feed")
@RequiredArgsConstructor
public class FeedController {
    private final FeedService feedService;

    @GetMapping
    public ResponseEntity<List<Post>> getFeedPosts(Authentication authentication) {
        List<Post> posts = feedService.getFeedPosts(authentication.getName());
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts(Authentication authentication) {
        List<Post> posts = feedService.getAllPosts(authentication.getName());
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/posts")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, Authentication authentication) {
        Post post = feedService.createPost(postRequest, authentication.getName());
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Post> deletePost(@PathVariable Long postId, Authentication authentication) {
        feedService.deletePost(postId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<Post> editPost(@PathVariable Long postId, @RequestBody PostRequest postRequest,
            Authentication authentication) {
        Post post = feedService.editPost(postId, postRequest, authentication.getName());
        return ResponseEntity.ok(post);
    }

    @PutMapping("/posts/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, Authentication authentication) {
        Post post = feedService.likePost(postId, authentication.getName());
        return ResponseEntity.ok(post);
    }

    @GetMapping("/posts/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(@PathVariable Long userId) {
        List<Post> posts = feedService.getPostsByUser(userId);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody CommentRequest commentRequest,
            Authentication authentication) {
        Comment comment = feedService.addComment(postId, commentRequest, authentication.getName());
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Post> deleteComment(@PathVariable Long commentId, Authentication authentication) {
        feedService.deleteComment(commentId, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> editComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest,
            Authentication authentication) {
        Comment comment = feedService.editComment(commentId, commentRequest, authentication.getName());
        return ResponseEntity.ok(comment);
    }

}
