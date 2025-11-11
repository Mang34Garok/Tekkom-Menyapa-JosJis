import { useNavigate } from "react-router-dom";
import { getCategoryColor } from "../utils/color";

interface FeaturedNewsGridProps {
  newsList: Array<{
    categories: string[];
    title: string;
    excerpt: string;
    image: string;
    categoryColor: string;
  }>;
}

const FeaturedNewsGrid = ({ newsList }: FeaturedNewsGridProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {newsList.map((news, idx) => (
        <div
          key={idx}
          className="rounded-xl overflow-hidden border border-amber-200/40 bg-white/75 dark:bg-slate-900/75 shadow-sm transform-gpu transition-transform duration-500 ease-out hover:scale-110 hover:shadow-md cursor-pointer"
          onClick={() => navigate("/detail", { state: { news } })}
        >
          <div className="relative h-64">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            {/* subtle gradient to help text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
          <div className="p-6 bg-transparent dark:bg-slate-900/75 backdrop-blur-sm rounded-b-xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {news.categories.map((category, i) => (
                <span
                  key={i}
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 ${getCategoryColor(category)}`}
                >
                  {category}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0 mb-2 line-clamp-2">{news.title}</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">{news.excerpt}</p>
            <div>
              <button className="bg-transparent p-0">
                <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded">Baca Selengkapnya</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedNewsGrid;
