package com.nextflix.model;

import jakarta.persistence.*;

@Entity
@Table(name = "watchlist")
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Long movieId; // Storing the movie ID

    public Watchlist() {}

    public Watchlist(User user, Long movieId) {
        this.user = user;
        this.movieId = movieId;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Long getMovieId() { return movieId; }
}
