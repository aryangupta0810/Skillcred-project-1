import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { usePreferences } from '../contexts/UserPreferencesContext';

interface FiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
  currentFilters: FilterState;
  currentSort: string;
}

export interface FilterState {
  category: string;
  priceMin: number;
  priceMax: number;
  tags: string[];
  available: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  onFiltersChange,
  onSortChange,
  currentFilters,
  currentSort
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const { state: preferencesState } = usePreferences();

     const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Watches', 'Laptops', 'Makeup', 'Computer Accessories', 'Books', 'Home Accessories'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const popularTags = ['casual', 'formal', 'sustainable', 'trendy', 'classic', 'comfortable', 'stylish'];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = localFilters.tags.includes(tag)
      ? localFilters.tags.filter(t => t !== tag)
      : [...localFilters.tags, tag];
    handleFilterChange('tags', newTags);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      category: 'All',
      priceMin: preferencesState.preferences.budget.min,
      priceMax: preferencesState.preferences.budget.max,
      tags: [],
      available: true
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      category: 'All',
      priceMin: 0,
      priceMax: 1000,
      tags: [],
      available: true
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return localFilters.category !== 'All' ||
           localFilters.priceMin > 0 ||
           localFilters.priceMax < 1000 ||
           localFilters.tags.length > 0;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters & Sort</h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      {/* Filters Content */}
      {isOpen && (
        <div className="p-4 space-y-6">
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Your budget: ₹{preferencesState.preferences.budget.min} - ₹{preferencesState.preferences.budget.max}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    localFilters.tags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={localFilters.available}
              onChange={(e) => handleFilterChange('available', e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 text-sm text-gray-700">
              In Stock Only
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <button
              onClick={applyFilters}
              className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Clear All Filters */}
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="w-full text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Filters:</span>
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {localFilters.category !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                {localFilters.category}
                <button
                  onClick={() => handleFilterChange('category', 'All')}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {localFilters.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                {tag}
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-1 text-primary-600 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;

