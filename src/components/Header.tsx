import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { usePreferences } from '../contexts/UserPreferencesContext';
import { shopifyService, Product } from '../services/shopifyService';
import SearchSuggestions from './SearchSuggestions';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { state: cartState } = useCart();
  const { state: preferencesState } = usePreferences();
  const navigate = useNavigate();

  // Search suggestions effect
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const suggestions = await shopifyService.searchProducts(searchQuery.trim());
          setSearchSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    if (product.id.startsWith('search') || product.id.startsWith('recent')) {
      // Handle search term clicks
      setSearchQuery(product.title);
      setShowSuggestions(false);
    } else {
      // Handle actual product clicks
      navigate(`/product/${product.id}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim().length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
         <header className="bg-gray-900 shadow-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
                         <span className="text-xl font-bold text-white">E-Cart Shopping</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
                         <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
               Home
             </Link>
             <Link to="/products" className="text-gray-300 hover:text-primary-400 transition-colors">
               Products
             </Link>
             <Link to="/chat" className="text-gray-300 hover:text-primary-400 transition-colors">
               Shopping Assistant
             </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                
                {/* Search Suggestions */}
                <SearchSuggestions
                  query={searchQuery}
                  suggestions={searchSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  onViewAllClick={handleViewAllResults}
                  visible={showSuggestions}
                />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* User Preferences */}
                         <Link to="/chat" className="hidden sm:flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors">
               <User className="h-5 w-5" />
               <span className="hidden lg:inline">Preferences</span>
             </Link>

             {/* Cart */}
             <Link to="/cart" className="relative flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
              <span className="hidden lg:inline">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
                         <button
               onClick={toggleMenu}
               className="md:hidden p-2 rounded-md text-gray-300 hover:text-primary-400 hover:bg-gray-800 transition-colors"
             >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

                 {/* Mobile Menu */}
         {isMenuOpen && (
           <div className="md:hidden border-t border-gray-700 py-4 bg-gray-800">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-xs text-gray-400" />
                  
                  {/* Mobile Search Suggestions */}
                  <SearchSuggestions
                    query={searchQuery}
                    suggestions={searchSuggestions}
                    onSuggestionClick={handleSuggestionClick}
                    onViewAllClick={handleViewAllResults}
                    visible={showSuggestions}
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                                 <Link
                   to="/"
                   className="block px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-md transition-colors"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Home
                 </Link>
                 <Link
                   to="/products"
                   className="block px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-md transition-colors"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Products
                 </Link>
                 <Link
                   to="/chat"
                   className="block px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-md transition-colors"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Shopping Assistant
                 </Link>
                 <Link
                   to="/cart"
                   className="block px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-gray-700 rounded-md transition-colors"
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Cart ({cartState.itemCount})
                 </Link>
              </nav>

              {/* User Preferences Summary */}
                             <div className="px-3 py-2 bg-gray-700 rounded-md">
                 <div className="text-sm text-gray-300">
                  <p>Budget: ₹{preferencesState.preferences.budget.min} - ₹{preferencesState.preferences.budget.max}</p>
                  <p>Size: {preferencesState.preferences.size}</p>
                  {preferencesState.preferences.styleTags.length > 0 && (
                    <p>Style: {preferencesState.preferences.styleTags.join(', ')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

