import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
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

const CategoryFilter = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-tag ${category.className} flex-shrink-0 whitespace-nowrap`}
              >
                #{category.name}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;