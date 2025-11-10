import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NewsPagination = ({ currentPage, totalPages, onPrevious, onNext }: NewsPaginationProps) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        className="flex items-center gap-2 px-2 py-1 text-amber-900 transition-colors disabled:opacity-50 bg-transparent rounded"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
  <ChevronLeft className="w-4 h-4 text-amber-400" />
        <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded">Previous Page</span>
      </button>
      <span className="bg-amber-400 text-amber-900 font-semibold px-3 py-1 rounded">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="flex items-center gap-2 px-2 py-1 text-amber-900 transition-colors disabled:opacity-50 bg-transparent rounded"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
  <span className="bg-amber-400 text-amber-900 px-3 py-1 rounded">Next Page</span>
  <ChevronRight className="w-4 h-4 text-amber-400" />
      </button>
    </div>
  );
};

export default NewsPagination;
