package com.j_word.J_word.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j_word.J_word.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByAuthorIdNotOrderByCreatedAtDesc(Long userId);

    List<Post> findAllByOrderByCreatedAtDesc(Long userId);

    List<Post> findByAuthorId(Long userId);
}
