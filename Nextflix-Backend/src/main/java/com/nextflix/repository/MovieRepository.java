package com.nextflix.repository;

import com.nextflix.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    
    Optional<Movie> findByTitle(String title); // Fetch movie by title

    List<Movie> findByType(String type); // Fetch movies or web series based on type

    List<Movie> findByGenre(String genre); // Fetch movies based on genre
}
