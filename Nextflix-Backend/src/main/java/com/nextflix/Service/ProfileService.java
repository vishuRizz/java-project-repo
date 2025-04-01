package com.nextflix.Service;

import com.nextflix.model.Profile;
import com.nextflix.model.User;
import com.nextflix.repository.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepo profileRepo;

    public Profile createProfile(String name, User user) {
        // Pehle se existing profiles count karega
        int profileCount = profileRepo.countByUser(user);
    
        if (profileCount >= user.getMaxUsers()) { // ✅ Agar 3 se zyada profiles hain toh error
            throw new RuntimeException("User can only have " + user.getMaxUsers() + " profiles.");
        }
    
        Profile profile = new Profile(name, user);
        return profileRepo.save(profile);
    }
    

    public List<Profile> getAllProfiles() {
        return profileRepo.findAll();
    }

    public Profile getProfileById(Long id) {
        return profileRepo.findById(id).orElse(null);
    }

    public void deleteProfile(Long id) {
        profileRepo.deleteById(id);
    }
}
