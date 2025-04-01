"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ShowDetails: React.FC = () => {
  const router = useRouter()
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleWatchClick = () => {
    router.push("/watch");
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="text-white max-w-4xl p-8 relative">
      <div className="flex items-center mb-4">
        <span className="mr-4 text-yellow-500">★ 7.5</span>
        <span>Season 8 • Episode 14 • Still Gotta Mean Something</span>
      </div>
      
      <h1 className="text-5xl font-bold mb-4">The Walking Dead</h1>
      
      <p className="text-xl mb-6">
        A Heaps prisoner makes a discovery; Carol searches for someone in the nearby forest; 
        Rick and Morgan find themselves in the company of strangers.
      </p>
      
      <div className="flex space-x-4 cursor-pointer">
        <button 
          onClick={handleWatchClick}
          className="bg-red-600 text-white px-8 py-3 rounded-md flex items-center"
        >
          <i className="fas fa-play mr-2"></i> Watch
        </button>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-md">
          + Add List
        </button>
      </div>

      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl h-[70vh]">
            <button 
              onClick={handleCloseVideo}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕ Close
            </button>
            <iframe 
              src="http://localhost:8080/api/v1/videos/stream/mp4/toystory"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;