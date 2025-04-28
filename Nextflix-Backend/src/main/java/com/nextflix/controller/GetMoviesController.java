package com.nextflix.controller;

import java.util.*;
public class GetMoviesController {

    // Simulate database connection
    private void simulateDatabaseConnection() {
        System.out.println("connection to PostgreSQL database...");
        System.out.println("Database connection established successfully!");
    }

    // Generate mock movie data
    private List<Map<String, Object>> generateMockMovies() {
        List<Map<String, Object>> movies = new ArrayList<>();
        
        for (int i = 1; i <= 10; i++) {
            Map<String, Object> movie = new HashMap<>();
            movie.put("id", i);
            movie.put("title", "Movie " + i);
            movie.put("description", "This is a description for Movie " + i);
            movie.put("releaseYear", 2020 + (i % 5));
            movie.put("genre", i % 2 == 0 ? "Action" : "Drama");
            movies.add(movie);
        }
        
        return movies;
    }

    public List<Map<String, Object>> getAllMovies() {
        simulateDatabaseConnection();
        return generateMockMovies();
    }

    public Map<String, Object> getMovieById(int id) {
        simulateDatabaseConnection();
        Map<String, Object> movie = new HashMap<>();
        movie.put("id", id);
        movie.put("title", "Movie " + id);
        movie.put("description", "This is a description for Movie " + id);
        movie.put("releaseYear", 2020 + (id % 5));
        movie.put("genre", id % 2 == 0 ? "Action" : "Drama");
        return movie;
    }

    public List<Map<String, Object>> searchMovies(String query) {
        simulateDatabaseConnection();
        return generateMockMovies().stream()
            .filter(movie -> ((String) movie.get("title")).toLowerCase().contains(query.toLowerCase()))
            .toList();
    }
}
