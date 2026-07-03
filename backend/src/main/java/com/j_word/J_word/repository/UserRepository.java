package com.j_word.J_word.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.j_word.J_word.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
