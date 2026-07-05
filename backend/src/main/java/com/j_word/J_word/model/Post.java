package com.j_word.J_word.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "posts")
@Builder
public class Post {
    @Id
    private Long id;

    @NotEmpty
    private String content;

    private String picture;
}
