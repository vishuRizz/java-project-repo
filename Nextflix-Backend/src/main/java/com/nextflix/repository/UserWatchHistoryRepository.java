package com.nextflix.repository;

import com.nextflix.model.UserWatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserWatchHistoryRepository extends JpaRepository<UserWatchHistory, Long> {
    List<UserWatchHistory> findByUserId(Long userId); // Specific user ke watch history ko fetch karega

    // Fetch movies that are not fully watched
    @Query("SELECT uwh FROM UserWatchHistory uwh WHERE uwh.user.id = :userId AND uwh.lastWatchedTime < :movieDuration")
    List<UserWatchHistory> findContinueWatching(@Param("userId") Long userId, @Param("movieDuration") int movieDuration);
    Optional<UserWatchHistory> findByUserIdAndMovieId(Long userId, Long movieId);
}
