import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Semua", className: "category-semua" },
  { name: "Kuliah", className: "category-kuliah" },
  { name: "Praktikum", className: "category-praktikum" },
  { name: "UKM", className: "category-ukm" },
  { name: "Himpunan", className: "category-himpunan" },
  { name: "Modul", className: "category-modul" },
  { name: "Teknologi", className: "category-teknologi" },
  { name: "Masyarakat", className: "category-masyarakat" },
  { name: "Kelas", className: "category-kelas" },
  { name: "Maba", className: "category-maba" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

import React, { useState } from "react";

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [startIdx, setStartIdx] = useState(0);
  const windowSize = 6;
  const canScrollLeft = categories.length > windowSize;
  const canScrollRight = categories.length > windowSize;
  let shownCategories = categories.slice(startIdx, startIdx + windowSize);
  if (shownCategories.length < windowSize) {
    shownCategories = shownCategories.concat(categories.slice(0, windowSize - shownCategories.length));
  }
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="flex space-x-3 items-center">
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 bg-white text-black hover:bg-yellow-100"
              onClick={() => setStartIdx((prev) => (prev - 1 + categories.length) % categories.length)}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {shownCategories.map((category, index) => (
              <button
                key={category.name}
                className={[
                  'category-tag',
                  category.className,
                  'flex-shrink-0 whitespace-nowrap',
                  'transition-all duration-200',
                  'hover:scale-105 hover:shadow-md',
                  selectedCategory === category.name
                    ? 'bg-yellow-400 text-black font-bold'
                    : selectedCategory === 'Semua' && category.name !== 'Semua'
                      ? (
                          category.name === 'Kuliah' ? 'bg-black text-white' :
                          category.name === 'Praktikum' ? 'bg-yellow-900 text-white' :
                          category.name === 'Maba' ? 'bg-gray-400 text-black' :
                          (startIdx + index) % 8 === 0 ? 'bg-red-400 text-white' :
                          (startIdx + index) % 8 === 1 ? 'bg-orange-400 text-white' :
                          (startIdx + index) % 8 === 2 ? 'bg-yellow-400 text-black' :
                          (startIdx + index) % 8 === 3 ? 'bg-green-400 text-white' :
                          (startIdx + index) % 8 === 4 ? 'bg-blue-400 text-white' :
                          (startIdx + index) % 8 === 5 ? 'bg-indigo-400 text-white' :
                          (startIdx + index) % 8 === 6 ? 'bg-purple-400 text-white' :
                          (startIdx + index) % 8 === 7 ? 'bg-pink-400 text-white' :
                          'bg-gray-200 text-black'
                        )
                      : 'bg-transparent text-yellow-400'
                ].filter(Boolean).join(' ')}
                onClick={() => onCategoryChange(category.name)}
                onMouseEnter={() => setHovered(category.name)}
                onMouseLeave={() => setHovered(null)}
              >
                #{category.name}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 bg-white text-black hover:bg-yellow-100"
              onClick={() => setStartIdx((prev) => (prev + 1) % categories.length)}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;