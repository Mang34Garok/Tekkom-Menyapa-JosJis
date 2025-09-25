import React from "react";

const Footer = () => (
  <footer className="w-full bg-black/70 text-yellow-400 py-8 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <a href="/" className="flex items-center mb-4 md:mb-0 group">
        <span className="font-bold text-lg text-yellow-400 group-hover:bg-white group-hover:text-black px-2 rounded transition">TEKKOM MENYAPA</span>
      </a>
      <div className="flex space-x-6 text-sm font-bold">
        <a href="/" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Contact Us</a>
        <a href="#" className="hover:underline">About Us</a>
        <a href="https://www.instagram.com/tekkomenyapa/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
      </div>
      <div className="mt-4 md:mt-0 text-xs text-yellow-300">
        &copy; {new Date().getFullYear()} TEKKOM MENYAPA. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
