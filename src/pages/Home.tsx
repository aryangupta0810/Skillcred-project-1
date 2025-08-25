import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Bot, Sparkles, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { shopifyService, Product } from '../services/shopifyService';
import { usePreferences } from '../contexts/UserPreferencesContext';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const { state: preferencesState } = usePreferences();

  useEffect(() => {
    const loadData = async () => {
      try {
        const products = await shopifyService.getProducts();
        const collectionsData = await shopifyService.getCollections();
        
        // Get featured products (top rated)
        const featured = products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        
        setFeaturedProducts(featured);
        setCollections(collectionsData);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    };

    loadData();
  }, []);

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary-500" />,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized product suggestions based on your style, budget, and preferences.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      title: 'Smart Style Analysis',
      description: 'Our AI analyzes your shopping patterns to understand your unique style profile.'
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: 'Secure Shopping',
      description: 'Shop with confidence knowing your data is protected with enterprise-grade security.'
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your new items to you as soon as possible.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '50K+', label: 'Products Available' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                GLA E-Cart
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  Shopping
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed">
                Discover products that match your unique style, budget, and preferences with our intelligent GLA E-Cart shopping assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/chat"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
                >
                  Chat with Assistant
                  <Bot className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
                <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                  <div className="text-center">
                    <Bot className="w-24 h-24 mx-auto mb-4 text-white" />
                    <h3 className="text-2xl font-bold mb-2">GLA E-Cart Assistant</h3>
                    <p className="text-gray-200">Ready to help you find the perfect items!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose GLA E-Cart Shopping?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of online shopping with our intelligent GLA E-Cart assistant that understands your style and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
                             <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                 Featured Products
               </h2>
               <p className="text-xl text-gray-300">
                 Curated selections based on your preferences
               </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                         <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
               Shop by Collection
             </h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Explore our carefully curated collections designed to match different styles and occasions.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/products?collection=${collection.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                    <p className="text-gray-200 mb-3">{collection.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {collection.productCount} products
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            Join thousands of satisfied customers who have discovered their perfect style with AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Start Chatting with AI
              <Bot className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Browse Products
              <ShoppingBag className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

