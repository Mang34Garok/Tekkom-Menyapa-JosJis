import React from "react";
import { Search, ChevronDown, Menu, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [showCategories, setShowCategories] = React.useState(false);
  const [showPages, setShowPages] = React.useState(false);
  return (
    <header className="bg-transparent border-b border-border sticky top-0 z-50" style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center justify-center h-20">
              <img src="/Black Sinple TM Latter Logoo.png" alt="Logo TEKKOM MENYAPA" className="h-16 w-auto object-contain" style={{maxHeight: '80px'}} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <div className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer" onClick={() => setShowCategories((v) => !v)}>
                <span className="font-bold">Categories</span>
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
              <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer font-bold">Contact Us</span>
            </span>
            <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
              <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer font-bold">About Us</span>
            </span>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <div className="flex items-center">
                <Menu className="h-4 w-4 text-muted-foreground mr-2" />
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
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex items-center space-x-1">
                <a href="/login" className="text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors">Login</a>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Bookmark */}
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>

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