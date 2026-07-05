package com.j_word.J_word.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.j_word.J_word.dto.CommentRequest;
import com.j_word.J_word.dto.PostRequest;
import com.j_word.J_word.model.Comment;
import com.j_word.J_word.model.Post;
import com.j_word.J_word.model.User;
import com.j_word.J_word.repository.CommentRepository;
import com.j_word.J_word.repository.PostRepository;
import com.j_word.J_word.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

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

    public Comment addComment(Long postId, CommentRequest commentRequest, String email) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = Comment.builder().post(post).author(user).content(commentRequest.getContent()).build();

        return comment;
    }

    public void deleteComment(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!comment.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the comment");
        }
        commentRepository.delete(comment);
    }

    public Comment editComment(Long commentId, CommentRequest commentRequest, String email) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!comment.getAuthor().equals(user)) {
            throw new IllegalArgumentException("User is not the author of the comment");
        }
        comment.setContent(commentRequest.getContent());
        return commentRepository.save(comment);
    }
}
