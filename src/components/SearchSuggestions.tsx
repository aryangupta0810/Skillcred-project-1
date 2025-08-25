import React from 'react';
import { Search, TrendingUp, Clock } from 'lucide-react';
import { Product } from '../services/shopifyService';

interface SearchSuggestionsProps {
  query: string;
  suggestions: Product[];
  onSuggestionClick: (product: Product) => void;
  onViewAllClick: () => void;
  visible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  suggestions,
  onSuggestionClick,
  onViewAllClick,
  visible
}) => {
  if (!visible || !query.trim()) return null;

  const popularSearches = [
    'laptop', 'watch', 'shoes', 'makeup', 'book', 'mouse', 'keyboard', 'lamp'
  ];

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {/* Search Results */}
      {suggestions.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <Search className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Search Results</span>
          </div>
          <div className="space-y-2">
            {suggestions.slice(0, 5).map((product) => (
              <button
                key={product.id}
                onClick={() => onSuggestionClick(product)}
                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors text-left"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.category} • ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </button>
            ))}
            {suggestions.length > 5 && (
              <button
                onClick={onViewAllClick}
                className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2 text-center"
              >
                View all {suggestions.length} results
              </button>
            )}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Popular Searches</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => onSuggestionClick({ id: 'search', title: search, description: '', price: 0, images: [], variants: [], category: '', tags: [], available: true, rating: 0, reviewCount: 0 })}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors capitalize"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Recent Searches</span>
        </div>
        <div className="space-y-1">
          {['laptop', 'wireless mouse', 'makeup palette'].map((search, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick({ id: `recent-${index}`, title: search, description: '', price: 0, images: [], variants: [], category: '', tags: [], available: true, rating: 0, reviewCount: 0 })}
              className="w-full text-sm text-gray-600 hover:text-gray-900 text-left py-1 px-2 rounded hover:bg-gray-50 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;

