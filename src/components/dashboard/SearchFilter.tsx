import { Search, Filter } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  fetchBooks: () => void;
}

function SearchFilter({
  search,
  setSearch,
  fetchBooks,
}: Props) {
  return (
    <div className="glass-card p-6 mb-8 theme-card border-2 border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-secondary w-5 h-5" />

          <input
            type="text"
            placeholder="Search by title or author....."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-modern pl-10 theme-card"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;