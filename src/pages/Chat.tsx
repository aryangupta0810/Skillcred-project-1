import React, { useState } from 'react';
import { Settings, User, Bot, Sparkles, Target, Palette, Calendar } from 'lucide-react';
import ChatUI from '../components/ChatUI';
import { usePreferences } from '../contexts/UserPreferencesContext';

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'preferences'>('chat');
  const { state: preferencesState, setBudget, setSize, addStyleTag, removeStyleTag, setPreferredCategories, setFavoriteColors, setOccasion, resetPreferences } = usePreferences();

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const occasionOptions = ['casual', 'business', 'formal', 'athletic', 'party', 'outdoor'];
  const popularColors = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'purple', 'pink', 'brown', 'gray'];
     const categoryOptions = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Watches', 'Laptops', 'Makeup', 'Computer Accessories', 'Books', 'Home Accessories', 'Dresses', 'Activewear'];

  const handleBudgetChange = (type: 'min' | 'max', value: number) => {
    const newBudget = {
      ...preferencesState.preferences.budget,
      [type]: value
    };
    setBudget(newBudget.min, newBudget.max);
  };

  const handleStyleTagToggle = (tag: string) => {
    if (preferencesState.preferences.styleTags.includes(tag)) {
      removeStyleTag(tag);
    } else {
      addStyleTag(tag);
    }
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = preferencesState.preferences.preferredCategories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    setPreferredCategories(newCategories);
  };

  const handleColorToggle = (color: string) => {
    const currentColors = preferencesState.preferences.favoriteColors;
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    setFavoriteColors(newColors);
  };

  return (
         <div className="min-h-screen bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">GLA E-Cart Shopping Assistant</h1>
           <p className="text-gray-300">
              Chat with our GLA E-Cart assistant to get personalized shopping recommendations and manage your preferences
            </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Bot className="w-5 h-5" />
                         <span>Shopping Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'preferences'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Preferences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'chat' ? (
              <div className="h-[600px]">
                <ChatUI />
              </div>
            ) : (
              <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-8 h-8 text-primary-500" />
                  <h2 className="text-2xl font-bold text-white">Your Shopping Preferences</h2>
                </div>

                <div className="space-y-8">
                  {/* Budget Range */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 text-primary-500 mr-2" />
                      Budget Range
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Budget
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            value={preferencesState.preferences.budget.min}
                            onChange={(e) => handleBudgetChange('min', Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            min="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Budget
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <input
                            type="number"
                            value={preferencesState.preferences.budget.max}
                            onChange={(e) => handleBudgetChange('max', Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Preference */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Size Preference</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            preferencesState.preferences.size === size
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style Tags */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 text-primary-500 mr-2" />
                      Style Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['casual', 'formal', 'trendy', 'classic', 'minimalist', 'bohemian', 'streetwear', 'vintage', 'sporty', 'elegant'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleStyleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            preferencesState.preferences.styleTags.includes(tag)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Categories */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryOptions.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={preferencesState.preferences.preferredCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Colors */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Palette className="w-5 h-5 text-primary-500 mr-2" />
                      Favorite Colors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorToggle(color)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            preferencesState.preferences.favoriteColors.includes(color)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 text-primary-500 mr-2" />
                      Preferred Occasions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {occasionOptions.map((occasion) => (
                        <button
                          key={occasion}
                          onClick={() => setOccasion(occasion)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            preferencesState.preferences.occasion === occasion
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {occasion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      onClick={resetPreferences}
                      className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Reset All Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Preferences Summary */}
                         <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
               <h3 className="text-lg font-semibold text-white mb-4">Current Preferences</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">
                    ₹{preferencesState.preferences.budget.min} - ₹{preferencesState.preferences.budget.max}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{preferencesState.preferences.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-medium">
                    {preferencesState.preferences.styleTags.length > 0
                      ? preferencesState.preferences.styleTags.slice(0, 2).join(', ')
                      : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Occasion:</span>
                  <span className="font-medium capitalize">{preferencesState.preferences.occasion}</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
                         <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6">
               <h3 className="text-lg font-semibold text-white mb-4">💡 Quick Tips</h3>
               <ul className="space-y-2 text-sm text-gray-300">
                <li>• Set your budget to get better recommendations</li>
                <li>• Add style tags to help AI understand your taste</li>
                <li>• Choose your preferred categories for focused results</li>
                <li>• Update preferences as your style evolves</li>
              </ul>
            </div>

            {/* AI Features */}
                         <div className="bg-gray-700 rounded-lg shadow-sm border border-gray-600 p-6">
               <h3 className="text-lg font-semibold text-white mb-4">🤖 AI Features</h3>
               <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary-500" />
                  <span>Personalized recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary-500" />
                  <span>Style analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary-500" />
                  <span>Cart optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary-500" />
                  <span>Shopping advice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;


