package com.nextflix.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String videoUrl; 

    @Column(nullable = false)
    private String type;  

    @Column(nullable = false)
    private int episodeCount; 

    @Column(nullable = false)
    private int releaseYear; 

    @Column(nullable = false)
    private String genre; 

    @Column(columnDefinition = "TEXT")
    private String description;

    public Movie() {}

    public Movie(String title, int duration, String videoUrl, String type, int episodeCount, int releaseYear, String genre, String description) {
        this.title = title;
        this.duration = duration;
        this.videoUrl = videoUrl;
        this.type = type;
        this.episodeCount = episodeCount;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getEpisodeCount() { return episodeCount; }
    public void setEpisodeCount(int episodeCount) { this.episodeCount = episodeCount; }

    public int getReleaseYear() { return releaseYear; }
    public void setReleaseYear(int releaseYear) { this.releaseYear = releaseYear; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
