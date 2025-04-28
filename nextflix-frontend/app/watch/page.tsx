// app/page.tsx
"use client";
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Plus, ThumbsUp, Volume2, VolumeX, X } from 'lucide-react';

// Types
interface VideoSource {
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
  description: string;
}

interface Category {
  name: string;
  videos: VideoSource[];
}

interface VideoData {
  categories: Category[];
}

// Video row component with horizontal scrolling
const VideoRow = ({ category, onSelectVideo }: { category: Category; onSelectVideo: (video: VideoSource) => void }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const currentRowRef = rowRef.current;
    if (currentRowRef) {
      currentRowRef.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }
    
    return () => {
      if (currentRowRef) {
        currentRowRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div 
      className="relative group mb-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className="text-lg md:text-xl text-white font-bold mb-2 pl-12">{category.name}</h2>
      
      {/* Left arrow */}
      {showLeftArrow && isHovering && (
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 z-10 text-white cursor-pointer hover:bg-opacity-70"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={30} />
        </button>
      )}
      
      {/* Right arrow */}
      {showRightArrow && isHovering && (
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1 z-10 text-white cursor-pointer hover:bg-opacity-70"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={30} />
        </button>
      )}
      
      <div 
        ref={rowRef}
        className="flex gap-2 overflow-x-scroll scrollbar-hide pl-12 pr-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={handleScroll}
      >
        {category.videos.map((video, index) => (
          <VideoCard 
            key={`${video.title}-${index}`} 
            video={video} 
            onClick={() => onSelectVideo(video)}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced video card component with hover effects
const VideoCard = ({ video, onClick }: { video: VideoSource; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 500); // Small delay before showing preview
  };
  
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  };

  return (
    <div 
      className={`relative flex-shrink-0 transition-all duration-300 ${
        isHovered ? 'scale-125 z-20 shadow-2xl' : 'scale-100 z-10'
      }`}
      style={{ width: isHovered ? '300px' : '220px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative rounded overflow-hidden ${isHovered ? 'rounded-b-none' : ''}`}>
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full object-cover"
          style={{ 
            height: isHovered ? '165px' : '130px',
            transition: 'height 0.3s ease' 
          }}
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
        )}
        
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-2 flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="bg-white text-black rounded-full p-1 hover:bg-opacity-80"
              >
                <Play size={16} fill="black" />
              </button>
              <button className="bg-gray-600 bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80">
                <Plus size={16} />
              </button>
              <button className="bg-gray-600 bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80">
                <ThumbsUp size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {isHovered && (
        <div className="absolute left-0 right-0 bg-black bg-opacity-90 p-3 rounded-b" onClick={onClick}>
          <h3 className="text-white font-semibold text-sm">{video.title}</h3>
          <p className="text-green-500 text-xs font-bold mt-1">98% Match</p>
          <p className="text-white text-xs mt-1">{video.subtitle}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-white text-xs border border-white px-1">HD</span>
            <span className="text-white text-xs">+16</span>
          </div>
          <div className="flex gap-2 mt-2 text-white text-xs">
            <span>Action</span>
            <span>•</span>
            <span>Adventure</span>
            <span>•</span>
            <span>Thriller</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced video modal component
const VideoModal = ({ 
  video, 
  onClose 
}: { 
  video: VideoSource | null; 
  onClose: () => void 
}) => {
  const [isMuted, setIsMuted] = useState(false);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-md bg-zinc-900" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4 z-50 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-700 bg-opacity-50"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="relative w-full aspect-video">
          <video 
            className="w-full h-full object-cover" 
            controls 
            autoPlay
            muted={isMuted}
            src={video.sources[0]} 
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 bg-white text-black font-bold rounded flex items-center gap-2 hover:bg-opacity-80">
                <Play size={18} fill="black" /> Play
              </button>
              <button className="p-2 bg-gray-600 bg-opacity-60 text-white rounded-full hover:bg-opacity-80">
                <Plus size={20} />
              </button>
              <button className="p-2 bg-gray-600 bg-opacity-60 text-white rounded-full hover:bg-opacity-80">
                <ThumbsUp size={20} />
              </button>
              <button 
                className="p-2 bg-gray-600 bg-opacity-60 text-white rounded-full hover:bg-opacity-80 ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex gap-4">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-500 font-bold">98% Match</span>
                <span className="text-white">{new Date().getFullYear()}</span>
                <span className="border border-white text-white px-1 text-xs">HD</span>
                <span className="border border-white text-white px-1 text-xs">5.1</span>
              </div>
              <h2 className="text-white text-3xl font-bold mb-4">{video.title}</h2>
              <p className="text-white mb-6">{video.description}</p>
            </div>
            <div className="text-gray-400 text-sm w-1/3">
              <div className="mb-2">
                <span className="text-gray-500">Cast:</span> Actor 1, Actor 2, Actor 3
              </div>
              <div className="mb-2">
                <span className="text-gray-500">Genres:</span> Action, Adventure, Thriller
              </div>
              <div>
                <span className="text-gray-500">This movie is:</span> Suspenseful, Exciting
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-white text-xl font-bold mb-4">More Like This</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative rounded overflow-hidden h-40">
                  <img 
                    src={`/api/placeholder/300/170`} 
                    alt="Similar content"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h4 className="text-white font-semibold">Similar Title {i}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-green-500 text-xs">97% Match</span>
                      <span className="text-white text-xs border border-white px-1">HD</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading component with Netflix-style spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-black">
    <div className="relative h-12 w-12">
      <div className="absolute border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full h-12 w-12 animate-spin"></div>
    </div>
  </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-screen bg-black">
    <div className="text-white bg-red-600 p-6 rounded max-w-md">
      <p className="text-xl font-bold mb-2">Unable to load content</p>
      <p>{message}</p>
      <button className="mt-4 px-4 py-2 bg-white text-red-600 font-bold rounded">
        Try Again
      </button>
    </div>
  </div>
);

// Main page component
export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<VideoSource | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  
  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/movies");
        console.log("API Response:", response.data);
        setVideoData(response.data);
        setIsLoading(false);
        
        // Auto-play featured video after a delay
        setTimeout(() => {
          if (featuredVideoRef.current) {
            featuredVideoRef.current.play();
            setIsPlaying(true);
          }
        }, 1500);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  const handlePlayFeatured = () => {
    if (videoData) {
      setSelectedVideo(videoData.categories[0].videos[0]);
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show error message if there was an error fetching data
  if (error || !videoData) {
    return <ErrorMessage message={error || "No video data available"} />;
  }

  // Get a featured video (first video from first category)
  const featuredVideo = videoData.categories[0].videos[0];

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black via-black/80 to-transparent'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 md:px-12">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-600 text-3xl font-bold">NEXTFLIX</h1>
            <div className="hidden md:flex space-x-4 text-sm text-gray-300">
              <button className="text-white font-semibold">Home</button>
              <button className="hover:text-white">TV Shows</button>
              <button className="hover:text-white">Movies</button>
              <button className="hover:text-white">New & Popular</button>
              <button className="hover:text-white">My List</button>
              <button className="hover:text-white">Browse by Languages</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center">
              <img src="/api/placeholder/32/32" alt="User profile" className="rounded w-8 h-8" />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with Featured Video */}
      <div className="relative h-screen w-full">
        <div className="relative h-full w-full">
          {/* Background image that shows before video starts */}
          <img 
            src={featuredVideo.thumb} 
            alt={featuredVideo.title}
            className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            style={{ transition: 'opacity 1s ease' }}
          />
          
          {/* Video background for featured content */}
          <video 
            ref={featuredVideoRef}
            className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            muted={isMuted}
            loop
            style={{ transition: 'opacity 1s ease' }}
            poster={featuredVideo.thumb}
          >
            <source src={featuredVideo.sources[0]} type="video/mp4" />
          </video>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-40" />
          
          {/* Featured content information */}
          <div className="absolute bottom-1/4 left-0 p-12 w-full md:w-1/2">
            <div className="mb-6">
              <img src="/api/placeholder/200/80" alt="Featured title logo" className="max-w-md" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 font-bold">98% Match</span>
              <span>{new Date().getFullYear()}</span>
              <span className="border border-white px-1 text-xs">HD</span>
            </div>
            <p className="text-lg mb-6 line-clamp-3">{featuredVideo.description}</p>
            <div className="flex items-center gap-3">
              <button 
                className="px-6 py-2 bg-white text-black font-bold rounded flex items-center gap-2 hover:bg-opacity-80"
                onClick={handlePlayFeatured}
              >
                <Play size={18} fill="black" />
                Play
              </button>
              <button className="px-6 py-2 bg-gray-600 bg-opacity-60 text-white font-bold rounded flex items-center gap-2 hover:bg-opacity-80">
                <Info size={18} />
                More Info
              </button>
              <button 
                className="ml-auto p-2 bg-gray-800 bg-opacity-60 rounded-full border border-white hover:bg-opacity-80"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Categories */}
      <div className="relative mt-20 z-10">
        {videoData.categories.map((category, index) => (
          <VideoRow 
            key={category.name} 
            category={category} 
            onSelectVideo={setSelectedVideo}
          />
        ))}
      </div>
      
      {/* Footer */}
      <footer className="pt-12 pb-8 px-12 text-gray-500 text-sm">
        <div className="flex gap-6 mb-4">
          <a href="#" className="hover:text-gray-300">FAQ</a>
          <a href="#" className="hover:text-gray-300">Help Center</a>
          <a href="#" className="hover:text-gray-300">Terms of Use</a>
          <a href="#" className="hover:text-gray-300">Privacy</a>
        </div>
        <p>© 2025 NEXTFLIX, Inc.</p>
      </footer>
      
      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </main>
  );
}