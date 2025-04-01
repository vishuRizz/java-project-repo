package com.nextflix.Service;

import com.nextflix.model.Movie;
import com.nextflix.model.User;
import com.nextflix.model.UserWatchHistory;
import com.nextflix.repository.MovieRepository;
import com.nextflix.repository.UserWatchHistoryRepository;
import com.nextflix.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UWHService {

    private final UserWatchHistoryRepository watchHistoryRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public UWHService(UserWatchHistoryRepository watchHistoryRepository,
                      UserRepository userRepository,
                      MovieRepository movieRepository) {
        this.watchHistoryRepository = watchHistoryRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    // **Watch Progress Save or Update**
    public UserWatchHistory saveWatchProgress(Long userId, Long movieId, int lastWatchedTime) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        User user = userOptional.get();
        Optional<UserWatchHistory> existingHistory = watchHistoryRepository.findByUserIdAndMovieId(userId, movieId);

        UserWatchHistory watchHistory = existingHistory.orElse(new UserWatchHistory(user, movieId, 0));
        watchHistory.setLastWatchedTime(lastWatchedTime);

        return watchHistoryRepository.save(watchHistory);
    }

    // **Fetch User's Watch History**
    public List<UserWatchHistory> getUserWatchHistory(Long userId) {
        return watchHistoryRepository.findByUserId(userId);
    }

    // **Fetching Continue Watching List**
    public List<UserWatchHistory> getContinueWatchingList(Long userId) {
        List<UserWatchHistory> watchHistory = watchHistoryRepository.findByUserId(userId);

        return watchHistory.stream()
            .filter(history -> {
                // Fetch movie duration from Movie table
                Movie movie = movieRepository.findById(history.getMovieId()).orElse(null);
                return movie != null && history.getLastWatchedTime() < movie.getDuration();
            })
            .collect(Collectors.toList());
    }

    // **Get Last Watched Time for Resuming Playback**
    public int getLastWatchedTime(Long userId, Long movieId) {
        return watchHistoryRepository.findByUserIdAndMovieId(userId, movieId)
                                     .map(UserWatchHistory::getLastWatchedTime)
                                     .orElse(0);  // Default to 0 if no history found
    }
}
