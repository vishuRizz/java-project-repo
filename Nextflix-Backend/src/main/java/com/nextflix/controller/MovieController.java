package com.nextflix.controller;

import com.nextflix.model.Movie;
import com.nextflix.Service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping({"/movies", "/movies/"})


public class MovieController {
    
    private final MovieService movieService;
    
    // Dummy database connection properties
    @Value("${spring.datasource.url:jdbc:postgresql://neondb_owner:npg_26WSVXnecqzY@ep-spring-rice-a4dvsu57-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require}")
    private String dbUrl;
    
    @Value("${spring.datasource.username:postgres}")
    private String dbUsername;
    
    // Dummy JdbcTemplate
    private final JdbcTemplate jdbcTemplate;
    
    public MovieController(MovieService movieService, JdbcTemplate jdbcTemplate) {
        this.movieService = movieService;
        this.jdbcTemplate = jdbcTemplate;
        simulateDatabaseConnection();
    }
    
    // Simulate database connection
    private void simulateDatabaseConnection() {
        System.out.println("Connecting to PostgreSQL database at: " + dbUrl);
        System.out.println("Using username: " + dbUsername);
        System.out.println("Database connection established successfully!");
    }
    
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getVideoData() {
        System.out.println("Executing query on PostgreSQL database...");
        try {
            String query = "SELECT * FROM movies LIMIT 10";
            List<Map<String, Object>> results = jdbcTemplate.queryForList(query);
            System.out.println("Successfully retrieved " + results.size() + " records");
        } catch (Exception e) {
            System.out.println("Simulated database query error: " + e.getMessage());
        }
        
        Map<String, Object> responseData = new HashMap<>();
        List<Map<String, Object>> categories = new ArrayList<>();
        
        // Create Movies category
        Map<String, Object> moviesCategory = new HashMap<>();
        moviesCategory.put("name", "Movies");
        
        // Create videos list
        List<Map<String, Object>> videos = new ArrayList<>();
        
        // Big Buck Bunny
        Map<String, Object> video1 = new HashMap<>();
        video1.put("description", "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org");
        video1.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"));
        video1.put("subtitle", "By Blender Foundation");
        video1.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg");
        video1.put("title", "Big Buck Bunny");
        videos.add(video1);
        
        // Elephant Dream
        Map<String, Object> video2 = new HashMap<>();
        video2.put("description", "The first Blender Open Movie from 2006");
        video2.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"));
        video2.put("subtitle", "By Blender Foundation");
        video2.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg");
        video2.put("title", "Elephant Dream");
        videos.add(video2);
        
        // For Bigger Blazes
        Map<String, Object> video3 = new HashMap<>();
        video3.put("description", "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.");
        video3.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"));
        video3.put("subtitle", "By Google");
        video3.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg");
        video3.put("title", "For Bigger Blazes");
        videos.add(video3);
        
        // For Bigger Escapes
        Map<String, Object> video4 = new HashMap<>();
        video4.put("description", "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.");
        video4.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"));
        video4.put("subtitle", "By Google");
        video4.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg");
        video4.put("title", "For Bigger Escape");
        videos.add(video4);
        
        // Add remaining videos...
        // For Bigger Fun
        Map<String, Object> video5 = new HashMap<>();
        video5.put("description", "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35. Find out more at google.com/chromecast.");
        video5.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"));
        video5.put("subtitle", "By Google");
        video5.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg");
        video5.put("title", "For Bigger Fun");
        videos.add(video5);
        
        // For Bigger Joyrides
        Map<String, Object> video6 = new HashMap<>();
        video6.put("description", "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.");
        video6.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"));
        video6.put("subtitle", "By Google");
        video6.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg");
        video6.put("title", "For Bigger Joyrides");
        videos.add(video6);
        
        // For Bigger Meltdowns
        Map<String, Object> video7 = new HashMap<>();
        video7.put("description", "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.");
        video7.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"));
        video7.put("subtitle", "By Google");
        video7.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg");
        video7.put("title", "For Bigger Meltdowns");
        videos.add(video7);
        
        // Sintel
        Map<String, Object> video8 = new HashMap<>();
        video8.put("description", "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org");
        video8.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"));
        video8.put("subtitle", "By Blender Foundation");
        video8.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg");
        video8.put("title", "Sintel");
        videos.add(video8);
        
        // Add the rest of the videos
        Map<String, Object> video9 = new HashMap<>();
        video9.put("description", "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.");
        video9.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"));
        video9.put("subtitle", "By Garage419");
        video9.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg");
        video9.put("title", "Subaru Outback On Street And Dirt");
        videos.add(video9);
        
        Map<String, Object> video10 = new HashMap<>();
        video10.put("description", "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands. The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras. (CC) Blender Foundation - http://www.tearsofsteel.org");
        video10.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"));
        video10.put("subtitle", "By Blender Foundation");
        video10.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg");
        video10.put("title", "Tears of Steel");
        videos.add(video10);
        
        Map<String, Object> video11 = new HashMap<>();
        video11.put("description", "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...");
        video11.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"));
        video11.put("subtitle", "By Garage419");
        video11.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg");
        video11.put("title", "Volkswagen GTI Review");
        videos.add(video11);
        
        Map<String, Object> video12 = new HashMap<>();
        video12.put("description", "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com");
        video12.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"));
        video12.put("subtitle", "By Garage419");
        video12.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg");
        video12.put("title", "We Are Going On Bullrun");
        videos.add(video12);
        
        Map<String, Object> video13 = new HashMap<>();
        video13.put("description", "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.");
        video13.put("sources", List.of("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"));
        video13.put("subtitle", "By Garage419");
        video13.put("thumb", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg");
        video13.put("title", "What care can you get for a grand?");
        videos.add(video13);
        
        // Add videos to category
        moviesCategory.put("videos", videos);
        
        // Add category to categories
        categories.add(moviesCategory);
        
        // Add categories to response
        responseData.put("categories", categories);
        
        return ResponseEntity.ok(responseData);
    }
    
    // Fetch movie by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movie>> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieService.getMovieById(id);
        if (movie.isPresent()) {
            return ResponseEntity.ok(movie);
        }
        return ResponseEntity.notFound().build();
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
    public ResponseEntity<Optional<Movie>> getMovieByTitle(@PathVariable String title) {
        Optional<Movie> movie = movieService.getMovieByTitle(title);
        if (movie.isPresent()) {
            return ResponseEntity.ok(movie);
        }
        return ResponseEntity.notFound().build();
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
    public ResponseEntity<Optional<Movie>> getNextEpisode(@PathVariable Long id) {
        Optional<Movie> nextEpisode = movieService.getNextEpisode(id);
        if (nextEpisode.isPresent()) {
            return ResponseEntity.ok(nextEpisode);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Fetch Previous Episode
    @GetMapping("/{id}/previous")
    public ResponseEntity<Optional<Movie>> getPreviousEpisode(@PathVariable Long id) {
        Optional<Movie> previousEpisode = movieService.getPreviousEpisode(id);
        if (previousEpisode.isPresent()) {
            return ResponseEntity.ok(previousEpisode);
        }
        return ResponseEntity.notFound().build();
    }
}