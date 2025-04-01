"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar: React.FC = () => {
    const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-black/70">
      <div className="flex items-center space-x-8">
        <img 
          src="/netflix-logo.png" 
          alt="Netflix Logo" 
          className="h-8"
        />
        <div className="text-white space-x-4">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Movies</a>
          <a href="#" className="hover:text-gray-300">Series</a>
          <a href="#" className="hover:text-gray-300">My List</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-white">
          <i className="fas fa-search"></i>
        </button>
        <button className="text-white">
          <i className="fas fa-bell"></i>
        </button>
        <Link 
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-red-700"
          >
            Sign In
          </Link>
        <div className=''
        onClick={()=>{
            router.push('/profile')
        }}>
        <img 
          src="/profile-icon.png" 
          alt="Profile" 
          className="h-8 w-8 rounded-md"
        />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;