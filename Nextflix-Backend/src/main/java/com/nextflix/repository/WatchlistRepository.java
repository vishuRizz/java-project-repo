package com.nextflix.repository;

import com.nextflix.model.Watchlist;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByUserId(Long userId);
    @Transactional
    void deleteByUserIdAndMovieId(Long userId, Long movieId);
}
