package com.nextflix.Service;

import com.nextflix.model.User;
import com.nextflix.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileService profileService;
    private static final int MAX_USERS = 3; // Fixed max users per account

    public UserService(UserRepository userRepository, ProfileService profileService) {
        this.userRepository = userRepository;
        this.profileService = profileService;
    }

    @Transactional
    public User createUserWithProfiles(String username, String email, String password, List<String> profileNames) {
        if (profileNames.size() > MAX_USERS) {
            throw new IllegalArgumentException("A user can have a maximum of " + MAX_USERS + " profiles.");
        }
        
        User user = new User(username, email, password, MAX_USERS); // Correct

        user = userRepository.save(user);

        // Profile creation
        for (String profileName : profileNames) {
            profileService.createProfile(profileName, user);
        }

        return user;
    }
}
