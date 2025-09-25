import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    date: string;
  };
  size?: "large" | "small";
  kategori?: string;
}

const ArticleCard = ({ title, description, image, author, size = "large", kategori }: ArticleCardProps) => {
  if (size === "large") {
    return (
  <div className="relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-2xl hover:scale-[1.04] hover:border-2 hover:border-primary transition-all duration-300 group">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Navigation arrows for large cards */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-10 h-10 p-0 bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="p-6">
          <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
  <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-2xl hover:scale-[1.04] hover:border-2 hover:border-primary transition-all duration-300 group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {kategori && (
          <span className="inline-block mb-1 px-2 py-0.5 rounded bg-yellow-200 text-yellow-800 text-[10px] font-bold uppercase tracking-wider">
            {kategori}
          </span>
        )}
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 text-sm">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="text-xs">
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-medium text-card-foreground">
                {author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {author.date}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bookmark className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;