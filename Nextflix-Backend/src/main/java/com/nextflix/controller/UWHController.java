package com.nextflix.controller;

import com.nextflix.model.UserWatchHistory;
import com.nextflix.Service.UWHService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/watch-history")
public class UWHController {

    private final UWHService watchHistoryService;

    public UWHController(UWHService watchHistoryService) {
        this.watchHistoryService = watchHistoryService;
    }

    // **Watch progress save/update karega**
    @PostMapping("/save")
    public ResponseEntity<UserWatchHistory> saveWatchProgress(@RequestBody UserWatchHistory request) {
        UserWatchHistory savedHistory = watchHistoryService.saveWatchProgress(
            request.getUser().getId(),  // User ID fetch from request
            request.getMovieId(),
            request.getLastWatchedTime()
        );
        return ResponseEntity.ok(savedHistory);
    }

    // **User ki watch history fetch karega**
    @GetMapping("/{userId}")
    public ResponseEntity<List<UserWatchHistory>> getUWH(@PathVariable Long userId) {
        List<UserWatchHistory> watchHistory = watchHistoryService.getUserWatchHistory(userId);
        return ResponseEntity.ok(watchHistory);
    }

    // **Fetching Continue Watching List**
    @GetMapping("/continue-watching/{userId}")
    public ResponseEntity<List<UserWatchHistory>> getContinueWatching(@PathVariable Long userId) {
        List<UserWatchHistory> continueWatchingList = watchHistoryService.getContinueWatchingList(userId);
        return ResponseEntity.ok(continueWatchingList);
    }
}
