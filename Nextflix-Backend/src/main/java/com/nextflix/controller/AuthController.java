package com.nextflix.controller;

import com.nextflix.model.User;
import com.nextflix.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Signup API
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Signup successful!");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());
        if (user.isPresent() && loginUser.getPassword().equals(user.get().getPassword())) {
            return ResponseEntity.ok("Login successful!");
        }
        return ResponseEntity.badRequest().body("Invalid email or password!");
    }
}
