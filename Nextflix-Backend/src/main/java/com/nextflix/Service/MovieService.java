package com.nextflix.Service;

import com.nextflix.model.Movie;
import com.nextflix.repository.MovieRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie addMovie(Movie movie){
        return movieRepository.save(movie);
    }


    // Fetch movie by ID
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    // Fetch movie by title
    public Optional<Movie> getMovieByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    // Fetch all movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Fetch movies by type (Movie or Web Series)
    public List<Movie> getMoviesByType(String type) {
        return movieRepository.findByType(type);
    }

    // Fetch movies by genre
    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    // Search movies with autocomplete (title starting with input)
    public List<Movie> searchMovies(String keyword) {
        return movieRepository.findAll().stream()
                .filter(movie -> movie.getTitle().toLowerCase().startsWith(keyword.toLowerCase()))
                .toList();
    }

    // Get movie URL by ID
    public String getMovieUrl(Long id) {
        return movieRepository.findById(id)
                .map(Movie::getVideoUrl)
                .orElseThrow(() -> new RuntimeException("Movie not found!"));
    }

    // Fetch next episode
    @GetMapping("/{id}/next")
    public Optional<Movie> getPreviousEpisode(Long id) {
        return movieRepository.findById(id - 1); // Assuming ID follows sequential order
    }

    // Fetch previous episode
    @GetMapping("/{id}/previous")
    public Optional<Movie> getNextEpisode(Long id) {
        return movieRepository.findById(id + 1);
    }
}

