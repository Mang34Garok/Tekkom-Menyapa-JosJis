import React from "react";
import { Search, ChevronDown, Menu, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [showCategories, setShowCategories] = React.useState(false);
  const [showPages, setShowPages] = React.useState(false);
  return (
  <header className="bg-transparent border-b border-border" style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-20">
              <a href="/" className="flex items-center group">
                <img src="/Black Sinple TM Latter Logoo.png" alt="Logo TEKKOM MENYAPA" className="h-16 w-auto object-contain mr-3 transition group-hover:opacity-80" style={{maxHeight: '80px'}} />
                <span className="text-2xl font-bold text-yellow-400 tracking-wide select-none px-2 rounded transition bg-transparent hover:bg-white hover:text-black cursor-pointer">TEKKOM MENYAPA</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <div className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer" onClick={() => setShowCategories((v) => !v)}>
                <span className="font-bold px-2 rounded transition bg-transparent hover:bg-white hover:text-black cursor-pointer">Categories</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {showCategories && (
                <div className="absolute left-0 mt-2 w-40 bg-card border rounded shadow-lg z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Kuliah</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Praktikum</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">UKM</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Himpunan</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Modul</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Teknologi</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Masyarakat</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Kelas</li>
                    <li className="px-4 py-2 hover:bg-primary/10 cursor-pointer">Maba</li>
                  </ul>
                </div>
              )}
            </div>
            <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
              <a href="/contact-us" className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer font-bold px-2 rounded transition bg-transparent hover:bg-white hover:text-black">Contact Us</a>
            </span>
            <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
              <a href="/about-us" className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer font-bold px-2 rounded transition bg-transparent hover:bg-white hover:text-black">About Us</a>
            </span>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <div className="flex items-center">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search Anything"
                    className="w-64 pr-10 bg-background border-input"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-2 relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-icon-profile-icon-member-login-isolated-vector.jpg" />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex items-center space-x-1">
                <a
                  href="/login"
                  className={`text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors px-2 rounded transition bg-transparent hover:bg-white hover:text-black ${showPages ? 'transform -translate-y-3 duration-300' : 'duration-300'}`}
                  style={{ position: 'relative', zIndex: 30 }}
                >
                  Login
                </a>
                <span onClick={() => setShowPages((v) => !v)} className="cursor-pointer" style={{zIndex: 31, position: 'relative'}}>
                  <ChevronDown className="h-4 w-4 text-white transition" />
                </span>
              </div>
              {showPages && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-8 w-auto z-20 transition-all duration-300">
                  <ul className="py-0">
                    <li>
                      <a
                        href="/signup"
                        className="block px-2 py-1 text-sm font-bold text-yellow-400 hover:text-black hover:bg-white transition-colors whitespace-nowrap transform -translate-y-2 rounded"
                        style={{ position: 'relative', zIndex: 30 }}
                      >
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bookmark */}

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;