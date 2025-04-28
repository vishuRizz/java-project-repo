// app/page.tsx
"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

// Video card component
const VideoCard = ({ video, onClick }: { video: VideoSource; onClick: () => void }) => {
  return (
    <div 
      className="relative h-48 min-w-[180px] cursor-pointer transition-transform duration-200 ease-out hover:scale-105 hover:z-10"
      onClick={onClick}
    >
      <img
        src={video.thumb}
        alt={video.title}
        className="rounded object-cover w-full h-full"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-semibold">{video.title}</h3>
        <p className="text-white text-sm opacity-70">{video.subtitle}</p>
      </div>
    </div>
  );
};

// Video modal component
const VideoModal = ({ 
  video, 
  onClose 
}: { 
  video: VideoSource | null; 
  onClose: () => void 
}) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-5xl mx-auto rounded-lg bg-black overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4 z-50 text-white text-xl font-bold bg-gray-800 bg-opacity-50 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="aspect-video w-full">
          <video 
            className="w-full h-full" 
            controls 
            autoPlay
            src={video.sources[0]} 
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-white text-2xl font-bold mb-2">{video.title}</h2>
          <p className="text-gray-400 mb-4">{video.subtitle}</p>
          <p className="text-white">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>
);

// Error component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-white bg-red-600 p-4 rounded">
      <p className="text-lg font-bold">Error loading videos</p>
      <p>{message}</p>
    </div>
  </div>
);

// Main page component
export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<VideoSource | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        // Use GET method since your Spring endpoint is a GET endpoint
        const response = await axios.get("http://localhost:8080/movies");
        console.log("API Response:", response.data);
        setVideoData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

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
    <main className="relative min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-black bg-opacity-90 transition-all duration-500 ease-in">
        <div className="flex items-center h-16 px-6 md:px-12">
          <div className="flex items-center">
            <h1 className="text-red-600 text-3xl font-bold mr-6">NEXTFLIX</h1>
          </div>
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">Home</button>
            <button className="text-white hover:text-gray-300">Movies</button>
            <button className="text-white hover:text-gray-300">My List</button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with Featured Video */}
      <div className="relative pt-16 pb-24">
        <div className="relative h-[60vh] w-full">
          <div className="absolute inset-0">
            <img 
              src={featuredVideo.thumb} 
              alt={featuredVideo.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 p-12 w-1/2">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">{featuredVideo.title}</h1>
            <p className="text-white text-lg mb-6">{featuredVideo.subtitle}</p>
            <button 
              className="px-6 py-2 bg-white text-black font-bold rounded mr-2 hover:bg-opacity-80"
              onClick={() => setSelectedVideo(featuredVideo)}
            >
              ▶ Play
            </button>
            <button className="px-6 py-2 bg-gray-600 bg-opacity-60 text-white font-bold rounded hover:bg-opacity-40">
              More Info
            </button>
          </div>
        </div>
      </div>
      
      {/* Video Categories */}
      {videoData.categories.map((category) => (
        <div key={category.name} className="px-12 mt-6 mb-12">
          <h2 className="text-2xl text-white font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {category.videos.map((video, index) => (
              <VideoCard 
                key={`${video.title}-${index}`} 
                video={video} 
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </div>
      ))}
      
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