package com.nextflix.controller;

import com.nextflix.dto.ProfileRequest;
import com.nextflix.model.Profile;
import com.nextflix.model.User;
import com.nextflix.Service.ProfileService;
import com.nextflix.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository; // User fetch karne ke liye

    // **Profile Create karega**
    @PostMapping
    public ResponseEntity<?> saveProfile(@RequestBody ProfileRequest profileRequest) {
        Optional<User> userOptional = userRepository.findById(profileRequest.getUserId());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        User user = userOptional.get();
        try {
            Profile profile = profileService.createProfile(profileRequest.getName(), user);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // ✅ Limit exceed ka error message
        }
    }

    // **Sabhi Profiles Fetch karega**
    @GetMapping
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    // **Ek Specific Profile Fetch karega**
    @GetMapping("/{id}")
    public Profile getProfileById(@PathVariable Long id) {
        return profileService.getProfileById(id);
    }

    // **Profile Delete karega**
    @DeleteMapping("/{id}")
    public String deleteProfile(@PathVariable Long id) {
        profileService.deleteProfile(id);
        return "Profile deleted successfully";
    }
}
