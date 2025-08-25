import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid, List, Filter as FilterIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Filters, { FilterState } from '../components/Filters';
import { shopifyService, Product } from '../services/shopifyService';
import { usePreferences } from '../contexts/UserPreferencesContext';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: preferencesState } = usePreferences();

  // Initialize filters from URL params or user preferences
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || 'All',
    priceMin: Number(searchParams.get('priceMin')) || preferencesState.preferences.budget.min,
    priceMax: Number(searchParams.get('priceMax')) || preferencesState.preferences.budget.max,
    tags: searchParams.get('tags')?.split(',') || [],
    available: true
  });

  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await shopifyService.getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    // Apply search query from URL
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      handleSearch(searchFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    try {
      const searchResults = await shopifyService.searchProducts(query);
      setFilteredProducts(searchResults);
    } catch (error) {
      console.error('Error searching products:', error);
      setFilteredProducts(products);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceMin && product.price <= filters.priceMax
    );

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        filters.tags.some(tag => product.tags.includes(tag))
      );
    }

    // Apply availability filter
    if (filters.available) {
      filtered = filtered.filter(product => product.available);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    if (newFilters.category !== 'All') {
      newSearchParams.set('category', newFilters.category);
    } else {
      newSearchParams.delete('category');
    }
    
    if (newFilters.priceMin > 0) {
      newSearchParams.set('priceMin', newFilters.priceMin.toString());
    } else {
      newSearchParams.delete('priceMin');
    }
    
    if (newFilters.priceMax < 1000) {
      newSearchParams.set('priceMax', newFilters.priceMax.toString());
    } else {
      newSearchParams.delete('priceMax');
    }
    
    if (newFilters.tags.length > 0) {
      newSearchParams.set('tags', newFilters.tags.join(','));
    } else {
      newSearchParams.delete('tags');
    }
    
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSort);
    setSearchParams(newSearchParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', searchQuery.trim());
      setSearchParams(newSearchParams);
      handleSearch(searchQuery.trim());
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('search');
    setSearchParams(newSearchParams);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.priceMin > 0) count++;
    if (filters.priceMax < 1000) count++;
    if (filters.tags.length > 0) count += filters.tags.length;
    return count;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our curated collection of products tailored to your preferences
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </form>
            </div>

            {/* View Mode and Filters Toggle */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FilterIcon className="w-5 h-5" />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-white text-primary-600 text-xs rounded-full px-2 py-1 font-semibold">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Filters
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              currentFilters={filters}
              currentSort={sortBy}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: 'All',
                      priceMin: 0,
                      priceMax: 1000,
                      tags: [],
                      available: true
                    });
                    clearSearch();
                  }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    showQuickView={viewMode === 'grid'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;


