package com.nextflix.repository;
import com.nextflix.model.User;


import com.nextflix.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Long> {
    int countByUser(User user);

    // Yahan custom queries likh sakte ho agar zaroorat ho
}
