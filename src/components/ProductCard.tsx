import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../services/shopifyService';
import { useCart } from '../contexts/CartContext';
import { usePreferences } from '../contexts/UserPreferencesContext';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickView = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { addToHistory } = usePreferences();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: product.variants[0]?.title
    };
    
    addItem(cartItem);
    addToHistory(product.id);
  };

  const handleQuickView = () => {
    addToHistory(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Actions Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-800 p-2 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            
            {showQuickView && (
              <Link
                to={`/product/${product.id}`}
                onClick={handleQuickView}
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200"
                title="Quick View"
              >
                <Eye className="w-5 h-5" />
              </Link>
            )}
            
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}

        {/* Sale Badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="block text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-2"
          onClick={handleQuickView}
        >
          {product.title}
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

