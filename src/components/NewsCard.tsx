import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  id?: string; // ✅ tambahkan id opsional
  categories?: string[]; // ✅ sekarang plural dan array
  title: string;
  excerpt: string;
  image: string;
  categoryColor?: string;
}
const NewsCard = ({ id, categories, title, excerpt, image }: NewsCardProps) => {
  const navigate = useNavigate();
  const news = { id, categories, title, excerpt, image };

  return (
  <Card className="rounded-xl overflow-hidden border border-gray-100 bg-white/75 dark:bg-slate-900/75 dark:border-slate-700 shadow-sm hover:shadow-lg transform-gpu transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4 items-start" onClick={() => navigate("/detail", { state: { news } })}>
          <img
            src={image}
            alt={title}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-100 dark:border-slate-700"
          />
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((cat, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100/60 dark:bg-white/5 rounded-full text-gray-600">{cat}</span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Tanpa Kategori</span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-0 mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{excerpt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
