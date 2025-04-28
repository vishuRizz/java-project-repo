// File: app/page.tsx
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight, FaPlus, FaThumbsUp, FaChevronDown, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Navbar from '@/components/NewNavbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Billboard />
      <div className="pb-12 -mt-16 relative z-10">
        <MovieRow title="Popular on Netflix" category="popular" />
        <MovieRow title="Trending Now" category="trending" />
        <MovieRow title="TV Shows" category="tv" />
        <MovieRow title="Movies" category="movies" />
        <MovieRow title="My List" category="mylist" />
      </div>
      <Footer />
    </main>
  );
}


// Billboard Component
const Billboard = () => {
  const [movie, setMovie] = useState({
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    image: "https://occ-0-8407-1007.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABS6v2gvwesuRN6c28ZykPq_fpmnQCJwELBU-kAmEcuC9HhWX-DfuDbtA-bfo-IrfgNtxl0qwJJlhI6DENsGFXknKkjhxPGTV-qhp.jpg?r=608"
  });
  
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0">
        <div className="h-full w-full object-cover">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundSize: "cover"
            }}
          >
            <div className="bg-gradient-to-r from-black to-transparent h-full w-full absolute top-0 left-0" />
            <div className="bg-gradient-to-t from-black to-transparent h-1/3 w-full absolute bottom-0 left-0" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/3 left-16 max-w-lg">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {movie.title}
        </motion.h1>
        
        <motion.p 
          className="text-white text-lg mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {movie.description}
        </motion.p>
        
        <motion.div 
          className="flex gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="/watch">
            <motion.button 
              className="bg-white text-black py-2 px-6 rounded flex items-center gap-2 font-medium hover:bg-opacity-80 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlay />
              Play
            </motion.button>
          </Link>
          
          <button className="bg-gray-600 bg-opacity-70 text-white py-2 px-6 rounded flex items-center gap-2 font-medium hover:bg-opacity-90 transition">
            <FaInfoCircle />
            More Info
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Interface definitions
interface Movie {
  id: number;
  title: string;
  image: string;
}

interface MovieCardProps {
  movie: Movie;
  index: number;
}

interface MovieRowProps {
  title: string;
  category: string;
}

// Movie Row Component
const MovieRow: React.FC<MovieRowProps> = ({ title, category }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Sample movie data
  const movies = [
    { id: 1, title: "Movie 1", image: "/movie1.jpg" },
    { id: 2, title: "Movie 2", image: "/movie2.jpg" },
    { id: 3, title: "Movie 3", image: "/movie3.jpg" },
    { id: 4, title: "Movie 4", image: "/movie4.jpg" },
    { id: 5, title: "Movie 5", image: "/movie5.jpg" },
    { id: 6, title: "Movie 6", image: "/movie6.jpg" },
    { id: 7, title: "Movie 7", image: "/movie7.jpg" },
    { id: 8, title: "Movie 8", image: "/movie8.jpg" },
  ];
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  
  const handleScrollCheck = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  return (
    <div className="relative px-4 md:px-16 mt-6 space-y-4">
      <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
      
      <div className="group relative">
        {showLeftArrow && (
          <motion.div 
            className="absolute left-0 z-40 h-full w-12 flex items-center justify-center cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: showLeftArrow ? 1 : 0 }}
            onClick={() => handleScroll('left')}
          >
            <FaChevronLeft className="text-white" size={24} />
          </motion.div>
        )}
        
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide"
          onScroll={handleScrollCheck}
        >
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index} 
            />
          ))}
        </div>
        
        {showRightArrow && (
          <motion.div 
            className="absolute right-0 top-0 z-40 h-full w-12 flex items-center justify-center cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: showRightArrow ? 1 : 0 }}
            onClick={() => handleScroll('right')}
          >
            <FaChevronRight className="text-white" size={24} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="relative h-28 min-w-48 md:h-36 md:min-w-64 bg-zinc-900 rounded overflow-hidden">
      <motion.div 
        className="relative h-full w-full cursor-pointer"
        layoutId={`movie-${movie.id}`}
        whileHover={{ scale: 1.05 }}
        transition={{ delay: 0.2 * (index % 5) }}
        onHoverStart={() => setShowInfo(true)}
        onHoverEnd={() => setShowInfo(false)}
      >
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.image})`,
            backgroundSize: "cover"
          }}
        />
        
        {showInfo && (
          <motion.div 
            className="absolute inset-0 bg-black/80 p-3 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="text-white font-medium">{movie.title}</h3>
            
            <div className="flex gap-2 mt-2">
              <Link href="/watch">
                <motion.button 
                  className="bg-white rounded-full p-1 hover:bg-opacity-80 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay className="text-black text-xs" />
                </motion.button>
              </Link>
              
              <motion.button 
                className="border border-gray-400 rounded-full p-1 hover:border-white transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlus className="text-white text-xs" />
              </motion.button>
              
              <motion.button 
                className="border border-gray-400 rounded-full p-1 hover:border-white transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaThumbsUp className="text-white text-xs" />
              </motion.button>
              
              <motion.button 
                className="border border-gray-400 rounded-full p-1 ml-auto hover:border-white transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronDown className="text-white text-xs" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 px-12 py-8">
      <div className="flex gap-6 mb-6">
        <FaFacebookF className="text-gray-500 cursor-pointer hover:text-gray-300 transition" size={20} />
        <FaInstagram className="text-gray-500 cursor-pointer hover:text-gray-300 transition" size={20} />
        <FaTwitter className="text-gray-500 cursor-pointer hover:text-gray-300 transition" size={20} />
        <FaYoutube className="text-gray-500 cursor-pointer hover:text-gray-300 transition" size={20} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <Link href="#" className="hover:text-gray-300 transition">Audio Description</Link>
        <Link href="#" className="hover:text-gray-300 transition">Help Center</Link>
        <Link href="#" className="hover:text-gray-300 transition">Gift Cards</Link>
        <Link href="#" className="hover:text-gray-300 transition">Media Center</Link>
        <Link href="#" className="hover:text-gray-300 transition">Investor Relations</Link>
        <Link href="#" className="hover:text-gray-300 transition">Jobs</Link>
        <Link href="#" className="hover:text-gray-300 transition">Terms of Use</Link>
        <Link href="#" className="hover:text-gray-300 transition">Privacy</Link>
        <Link href="#" className="hover:text-gray-300 transition">Legal Notices</Link>
        <Link href="#" className="hover:text-gray-300 transition">Cookie Preferences</Link>
        <Link href="#" className="hover:text-gray-300 transition">Corporate Information</Link>
        <Link href="#" className="hover:text-gray-300 transition">Contact Us</Link>
      </div>
      
      <div className="mt-6 border border-gray-700 inline-block px-2 py-1">
        <span className="text-sm">Service Code</span>
      </div>
      
      <p className="mt-6 text-xs">© 1997-2025 Netflix, Inc.</p>
    </footer>
  );
};