import { useGetBoardsQuery } from "@/store/api/baseApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface SearchResultProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchResult({ isOpen, onClose }: SearchResultProps) {
  const [searchValue, setSearchValue] = useState("");
  //   console.log(searchValue);
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);
  const {
    data: searchData,
    isLoading,
    error,
  } = useGetBoardsQuery({ page: 1, limit: 5, search: debounceSearch });

  const result = searchData?.data.boards || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx={11} cy={11} r={8} />
            </svg>
            <input
              placeholder="Search Trello"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              //   defaultValue
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="p-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900 ">Boards</h3>
              {result.map((board) => (
                <Link
                  key={board.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  to={`/app/board/${board.id}`}
                  data-discover="true"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      alt="dsfds"
                      className="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {board.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {board.owner.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
