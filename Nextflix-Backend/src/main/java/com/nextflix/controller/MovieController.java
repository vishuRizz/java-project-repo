package com.nextflix.controller;

import com.nextflix.model.Movie;
import com.nextflix.Service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // Fetch movie by ID
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/url")
    public ResponseEntity<String> getMovieUrl(@PathVariable Long id) {
        String videoUrl = movieService.getMovieUrl(id);
        return ResponseEntity.ok(videoUrl);
    }

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie){
        Movie savedMovie = movieService.addMovie(movie);
        return ResponseEntity.ok(savedMovie);
    }

    // Fetch movie by title
    @GetMapping("/title/{title}")
    public ResponseEntity<Movie> getMovieByTitle(@PathVariable String title) {
        Optional<Movie> movie = movieService.getMovieByTitle(title);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Fetch all movies
    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    // Fetch movies by type (Movie or Web Series)
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Movie>> getMoviesByType(@PathVariable String type) {
        return ResponseEntity.ok(movieService.getMoviesByType(type));
    }

    // Fetch movies by genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(movieService.getMoviesByGenre(genre));
    }

    // Search movies with autocomplete (title starting with input)
    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String keyword) {
        return ResponseEntity.ok(movieService.searchMovies(keyword));
    }

    // Fetch movie/video playback URL
    @GetMapping("/{id}/play")
    public ResponseEntity<String> getPlaybackUrl(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieById(id);

        if (movie.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(movie.get().getVideoUrl());
    }

    // Fetch Next Episode
    @GetMapping("/{id}/next")
    public ResponseEntity<Movie> getNextEpisode(@PathVariable Long id) {
        Optional<Movie> nextEpisode = movieService.getNextEpisode(id);
        return nextEpisode.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Fetch Previous Episode
    @GetMapping("/{id}/previous")
    public ResponseEntity<Movie> getPreviousEpisode(@PathVariable Long id) {
        Optional<Movie> previousEpisode = movieService.getPreviousEpisode(id);
        return previousEpisode.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // New API route to return all movies
    @GetMapping("/")
    public ResponseEntity<List<Movie>> getAllAvailableMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }
}
