import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ShoppingCart, Star, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { usePreferences } from '../contexts/UserPreferencesContext';
import { useCart } from '../contexts/CartContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatUIProps {
  onProductRecommendation?: (productId: string) => void;
}

const ChatUI: React.FC<ChatUIProps> = ({ onProductRecommendation }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your GLA E-Cart shopping assistant. I can help you find products based on your preferences, budget, and style. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { state: preferencesState } = usePreferences();
  const { state: cartState } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'assistant',
      content: '...',
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      // Get AI response
      const response = await geminiService.getShoppingAdvice(inputMessage, {
        preferences: preferencesState.preferences,
        cart: cartState.items,
        context: 'shopping_assistant'
      });

      // Remove typing indicator and add response
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if response contains product recommendations
      if (response.toLowerCase().includes('product') || response.toLowerCase().includes('item')) {
        // You could parse the response here to extract product IDs
        // For now, we'll just show a general recommendation
        setTimeout(() => {
          const recommendationMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'assistant',
            content: "💡 **Pro Tip**: I can also help you find specific products! Try asking me things like:\n• 'Show me casual jackets under ₹5000'\n• 'Find sustainable clothing in my size'\n• 'Recommend shoes for a formal event'\n\nOr let me analyze your current cart and suggest complementary items!",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, recommendationMessage]);
        }, 1000);
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getQuickActions = () => {
    const actions = [
      {
        icon: <ShoppingCart className="w-4 h-4" />,
        text: 'Cart Analysis',
        action: () => handleQuickAction('Can you analyze my shopping cart and suggest improvements?')
      },
      {
        icon: <Star className="w-4 h-4" />,
        text: 'Style Advice',
        action: () => handleQuickAction('What\'s my current style profile and how can I improve it?')
      },
      {
        icon: <Sparkles className="w-4 h-4" />,
        text: 'Trending Items',
        action: () => handleQuickAction('What are the trending fashion items this season?')
      }
    ];

    return actions;
  };

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
         <div className="flex flex-col h-full bg-gray-800 rounded-lg border border-gray-600">
      {/* Header */}
             <div className="flex items-center space-x-3 p-4 border-b border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
                                     <h3 className="font-semibold text-white">GLA E-Cart Shopping Assistant</h3>
           <p className="text-sm text-gray-300">Powered by Gemini AI</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
                             className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                 message.type === 'user'
                   ? 'bg-primary-500 text-white'
                   : 'bg-gray-700 text-white'
               } ${message.isLoading ? 'animate-pulse' : ''}`}
            >
              {message.type === 'assistant' && !message.isLoading && (
                <div className="flex items-center space-x-2 mb-2">
                  <Bot className="w-4 h-4 text-primary-500" />
                  <span className="text-xs text-gray-500">AI Assistant</span>
                </div>
              )}
              
              <div
                className={`text-sm ${
                  message.isLoading ? 'text-gray-400' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: message.isLoading ? '...' : formatMessage(message.content)
                }}
              />
              
              <div className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex space-x-2 mb-3">
          {getQuickActions().map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center space-x-2 px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {action.icon}
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about products, style advice, or shopping tips..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* User Preferences Summary */}
                 <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                     <div className="text-xs text-gray-300 mb-2">Your Preferences:</div>
          <div className="flex flex-wrap gap-2 text-xs">
                         <span className="px-2 py-1 bg-gray-600 text-white rounded">
               Budget: ₹{preferencesState.preferences.budget.min}-₹{preferencesState.preferences.budget.max}
             </span>
             <span className="px-2 py-1 bg-gray-600 text-white rounded">
               Size: {preferencesState.preferences.size}
             </span>
             {preferencesState.preferences.styleTags.slice(0, 2).map((tag, index) => (
               <span key={index} className="px-2 py-1 bg-gray-600 text-white rounded">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

