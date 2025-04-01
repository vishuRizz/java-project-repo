// app/page.tsx
"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

// Video data
const videoData: VideoData = {
  "categories": [
    {
      "name": "Movies",
      "videos": [
        {
          "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ],
          "subtitle": "By Blender Foundation",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
          "title": "Big Buck Bunny"
        },
        {
          "description": "The first Blender Open Movie from 2006",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          ],
          "subtitle": "By Blender Foundation",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
          "title": "Elephant Dream"
        },
        {
          "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          ],
          "subtitle": "By Google",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
          "title": "For Bigger Blazes"
        },
        {
          "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          ],
          "subtitle": "By Google",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
          "title": "For Bigger Escape"
        },
        {
          "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
          ],
          "subtitle": "By Google",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
          "title": "For Bigger Fun"
        },
        {
          "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
          ],
          "subtitle": "By Google",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
          "title": "For Bigger Joyrides"
        },
        {
          "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
          ],
          "subtitle": "By Google",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
          "title": "For Bigger Meltdowns"
        },
        {
          "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
          ],
          "subtitle": "By Blender Foundation",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
          "title": "Sintel"
        },
        {
          "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
          ],
          "subtitle": "By Garage419",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
          "title": "Subaru Outback On Street And Dirt"
        },
        {
          "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          ],
          "subtitle": "By Blender Foundation",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
          "title": "Tears of Steel"
        },
        {
          "description": "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
          ],
          "subtitle": "By Garage419",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
          "title": "Volkswagen GTI Review"
        },
        {
          "description": "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
          ],
          "subtitle": "By Garage419",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
          "title": "We Are Going On Bullrun"
        },
        {
          "description": "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
          "sources": [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
          ],
          "subtitle": "By Garage419",
          "thumb": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
          "title": "What care can you get for a grand?"
        }
      ]
    }
  ]
};



// Video card component
const VideoCard = ({ video, onClick }: { video: VideoSource; onClick: () => void }) => {


    useEffect(()=>{
    
        const fetchingVideos = async()=>{
            try {
                const fetchVideos = await axios.post("http://localhost:8080/movies/")
                console.log(fetchVideos)
            } catch (error) {
                console.log(error)
            }
      
        }
        fetchingVideos();
    },[])


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

// Main page component
export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<VideoSource | null>(null);
  
  // Get a featured video (first video)
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
            {category.videos.map((video) => (
              <VideoCard 
                key={video.title} 
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