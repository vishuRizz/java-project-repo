package com.nextflix.controller;

import com.nextflix.Service.WatchlistService;
import com.nextflix.dto.WatchlistRequest;
import com.nextflix.model.Watchlist;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    // **Add Movie to Watchlist**
    @PostMapping("/add")
    public ResponseEntity<Watchlist> addToWatchlist(@RequestBody WatchlistRequest request) {
        Watchlist watchlist = watchlistService.addToWatchlist(request.getUserId(), request.getMovieId());
        return ResponseEntity.ok(watchlist);
    }

    // **Remove Movie from Watchlist**
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromWatchlist(@RequestParam Long userId, @RequestParam Long movieId) {
        watchlistService.removeFromWatchlist(userId, movieId);
        return ResponseEntity.ok("Movie removed from watchlist");
    }

    // **Get User's Watchlist**
    @GetMapping("/{userId}")
    public ResponseEntity<List<Watchlist>> getWatchlist(@PathVariable Long userId) {
        List<Watchlist> watchlist = watchlistService.getUserWatchlist(userId);
        return ResponseEntity.ok(watchlist);
    }
}
