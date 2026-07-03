package com.j_word.J_word.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @GetMapping("/user")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

}
