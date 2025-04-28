// Navbar Component with Login Button Integration
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaBell, FaCaretDown } from 'react-icons/fa';
import { signIn } from "next-auth/react";

interface LoginButtonProps {
  provider: "google" | "github";
  className?: string;
}

function LoginButton({ provider, className }: LoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      console.log("🔹 Attempting sign-in with", provider);

      // ✅ Step 1: Start authentication with callbackUrl pointing to our custom page
      const res = await signIn(provider, { 
        callbackUrl: "/profile",
        redirect: true
      });
      console.log(res);
      // The rest of the logic will be handled in the /auth/sync-after-login page
      
    } catch (error) {
      console.error("❌ Error during login:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white ${
        provider === "google"
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-800 hover:bg-gray-900"
      } ${className || ""}`}
    >
      {loading ? "Signing in..." : `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </button>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 px-6 py-2 flex items-center justify-between transition-colors duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-8">
        <Link href="/">
          <div className="h-6 md:h-8 w-24 md:w-32 relative cursor-pointer">
            <img 
              src="/netflix-logo.png" 
              alt="Nextflix" 
              className="object-contain h-full cursor-pointer"
            />
          </div>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          <Link href="/">
            <span className="text-sm cursor-pointer hover:text-gray-300 transition">Home</span>
          </Link>
          <Link href="/series">
            <span className="text-sm cursor-pointer hover:text-gray-300 transition">TV Shows</span>
          </Link>
          <Link href="/movies">
            <span className="text-sm cursor-pointer hover:text-gray-300 transition">Movies</span>
          </Link>
          <Link href="/new">
            <span className="text-sm cursor-pointer hover:text-gray-300 transition">New & Popular</span>
          </Link>
          <Link href="/mylist">
            <span className="text-sm cursor-pointer hover:text-gray-300 transition">My List</span>
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <FaSearch className="text-white w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
            <FaBell className="text-white w-5 h-5 cursor-pointer hover:text-gray-300 transition" />
            
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded overflow-hidden">
                <img 
                  src="/avatar.png" 
                  alt="Profile" 
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <FaCaretDown className="text-white text-sm" />
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <LoginButton provider="google" className="text-sm py-1" />
            <LoginButton provider="github" className="text-sm py-1" />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;