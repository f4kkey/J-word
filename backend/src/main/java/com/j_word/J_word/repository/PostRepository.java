package com.j_word.J_word.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j_word.J_word.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
