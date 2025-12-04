import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturedNewsCarouselProps {
  newsList: any[];
}

const FeaturedNewsCarousel: React.FC<FeaturedNewsCarouselProps> = ({ newsList }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffle berita dan ambil untuk carousel
  const displayNews = useMemo(() => {
    if (newsList.length === 0) return [];
    return [...newsList].sort(() => Math.random() - 0.5);
  }, [newsList]);

  // Auto-rotate setiap 5 detik
  useEffect(() => {
    if (displayNews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayNews.length]);

  if (displayNews.length === 0) {
    return <div className="text-center text-gray-500 py-8">Tidak ada berita untuk ditampilkan</div>;
  }

  const currentNews = displayNews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayNews.length) % displayNews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayNews.length);
  };

  const categories = typeof currentNews.categories === "string"
    ? currentNews.categories.split(",").map((c: string) => c.trim())
    : Array.isArray(currentNews.categories)
      ? currentNews.categories
      : [];

  return (
    <div 
      className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg group"
    >
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentNews.image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-yellow-500 text-yellow-900 rounded-full font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className="text-3xl font-bold mb-2 line-clamp-2 cursor-pointer hover:underline"
            onClick={() => navigate("/detail", { state: { news: currentNews } })}
          >
            {currentNews.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-100 line-clamp-2 mb-4">{currentNews.excerpt}</p>
        </div>
      </div>

      {/* Chevron Icons indicating swipeable */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white/60 p-2 group-hover:text-white/80 transition-colors hover:text-white cursor-pointer bg-transparent border-none"
        aria-label="Previous"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/60 p-2 group-hover:text-white/80 transition-colors hover:text-white cursor-pointer bg-transparent border-none"
        aria-label="Next"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};

export default FeaturedNewsCarousel;
