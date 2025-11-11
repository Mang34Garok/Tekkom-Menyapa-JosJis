import { useNavigate } from "react-router-dom";

interface FeaturedNewsProps {
  categories: string;
  title: string;
  excerpt: string;
  image: string;
  categoryColor: string;
}

const FeaturedNews = ({ categories, title, excerpt, image, categoryColor }: FeaturedNewsProps) => {
  const navigate = useNavigate();
  const news = { categories, title, excerpt, image, categoryColor };

  return (
  <div className="rounded-lg shadow-lg overflow-hidden bg-transparent transform-gpu transition-transform duration-500 ease-out hover:scale-110 hover:shadow-xl cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
      />
      {/* Content panel: semi-opaque dark to contrast with background image */}
      <div className="p-6 bg-black/55 dark:bg-black/60 text-white backdrop-blur-sm">
        <span className={`text-sm font-medium inline-block mb-2 px-2 py-0.5 rounded ${categoryColor} bg-white/10`}>{categories}</span>
        <h2 className="text-2xl font-bold text-white mt-2 mb-3">{title}</h2>
        <p className="text-gray-100 mb-4">{excerpt}</p>
        <button
          className="bg-transparent p-0"
          onClick={() => navigate("/detail", { state: { news } })}
        >
          <span className="bg-amber-400 text-amber-900 px-4 py-1 rounded">Baca Selengkapnya</span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedNews;
