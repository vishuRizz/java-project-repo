package com.nextflix.Service;

import com.nextflix.model.User;
import com.nextflix.model.Watchlist;
import com.nextflix.repository.UserRepository;
import com.nextflix.repository.WatchlistRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, UserRepository userRepository) {
        this.watchlistRepository = watchlistRepository;
        this.userRepository = userRepository;
    }

    // **Add Movie to Watchlist**
    public Watchlist addToWatchlist(Long userId, Long movieId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
        Watchlist watchlist = new Watchlist(userOptional.get(), movieId);
        return watchlistRepository.save(watchlist);
    }

    // **Remove Movie from Watchlist**
    @Transactional
    public void removeFromWatchlist(Long userId, Long movieId) {
        watchlistRepository.deleteByUserIdAndMovieId(userId, movieId);
    }

    // **Get User Watchlist**
    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }
}
