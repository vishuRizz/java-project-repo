package com.nextflix.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_watch_history")
public class UserWatchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Long movieId;  // Movie ya Web Series ka ID

    @Column(nullable = false)
    private int lastWatchedTime;  // Seconds me store hoga

    public UserWatchHistory() {}

    public UserWatchHistory(User user, Long movieId, int lastWatchedTime) {
        this.user = user;
        this.movieId = movieId;
        this.lastWatchedTime = lastWatchedTime;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }

    public int getLastWatchedTime() { return lastWatchedTime; }
    public void setLastWatchedTime(int lastWatchedTime) { this.lastWatchedTime = lastWatchedTime; }
}
