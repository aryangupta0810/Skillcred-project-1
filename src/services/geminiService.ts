import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || 'your-api-key-here');

export interface ProductRecommendation {
  id: string;
  name: string;
  reason: string;
  confidence: number;
}

export interface CartSummary {
  totalItems: number;
  totalValue: number;
  recommendations: string[];
  savings: string[];
}

export interface StyleAnalysis {
  style: string;
  confidence: number;
  suggestions: string[];
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async askGemini(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'I apologize, but I encountered an error. Please try again.';
    }
  }

  async getProductRecommendations(
    userPreferences: any,
    currentProducts: any[],
    query: string
  ): Promise<ProductRecommendation[]> {
    const prompt = `
      As an AI shopping assistant, analyze the user's preferences and provide personalized product recommendations.
      
      User Preferences:
      - Budget: $${userPreferences.budget.min} - $${userPreferences.budget.max}
      - Size: ${userPreferences.size}
      - Style Tags: ${userPreferences.styleTags.join(', ')}
      - Preferred Categories: ${userPreferences.preferredCategories.join(', ')}
      - Favorite Colors: ${userPreferences.favoriteColors.join(', ')}
      - Occasion: ${userPreferences.occasion}
      
      User Query: "${query}"
      
      Available Products: ${JSON.stringify(currentProducts.slice(0, 10))}
      
      Please provide 3-5 product recommendations with:
      1. Product ID from the available products
      2. Reason for recommendation
      3. Confidence level (0-1)
      
      Format as JSON array with fields: id, name, reason, confidence
    `;

    try {
      const response = await this.askGemini(prompt);
      // Try to parse JSON response, fallback to mock data if parsing fails
      try {
        const recommendations = JSON.parse(response);
        return recommendations.filter((rec: any) => rec.id && rec.name);
      } catch {
        return this.getMockRecommendations(userPreferences, query);
      }
    } catch (error) {
      return this.getMockRecommendations(userPreferences, query);
    }
  }

  async generateCartSummary(cartItems: any[]): Promise<CartSummary> {
    const prompt = `
      Analyze this shopping cart and provide insights:
      
      Cart Items: ${JSON.stringify(cartItems)}
      
      Please provide:
      1. Total items count
      2. Total value
      3. 2-3 personalized recommendations
      4. 1-2 potential savings tips
      
      Format as JSON with fields: totalItems, totalValue, recommendations, savings
    `;

    try {
      const response = await this.askGemini(prompt);
      try {
        const summary = JSON.parse(response);
        return {
          totalItems: summary.totalItems || cartItems.length,
          totalValue: summary.totalValue || cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          recommendations: summary.recommendations || ['Consider adding accessories to complete your look'],
          savings: summary.savings || ['Look for bundle deals to save more']
        };
      } catch {
        return this.getMockCartSummary(cartItems);
      }
    } catch (error) {
      return this.getMockCartSummary(cartItems);
    }
  }

  async analyzeStyle(userPreferences: any, productHistory: any[]): Promise<StyleAnalysis> {
    const prompt = `
      Analyze the user's style preferences and shopping history to determine their style profile.
      
      User Preferences: ${JSON.stringify(userPreferences)}
      Shopping History: ${JSON.stringify(productHistory.slice(0, 10))}
      
      Please provide:
      1. Primary style classification
      2. Confidence level (0-1)
      3. 3 style improvement suggestions
      
      Format as JSON with fields: style, confidence, suggestions
    `;

    try {
      const response = await this.askGemini(prompt);
      try {
        const analysis = JSON.parse(response);
        return {
          style: analysis.style || 'Contemporary Casual',
          confidence: analysis.confidence || 0.8,
          suggestions: analysis.suggestions || [
            'Try mixing classic pieces with trendy accessories',
            'Consider adding more color variety to your wardrobe',
            'Explore sustainable fashion options'
          ]
        };
      } catch {
        return this.getMockStyleAnalysis();
      }
    } catch (error) {
      return this.getMockStyleAnalysis();
    }
  }

  async getShoppingAdvice(query: string, context: any): Promise<string> {
    const prompt = `
      As a personal shopping assistant, provide helpful advice for: "${query}"
      
      Context: ${JSON.stringify(context)}
      
      Please provide friendly, practical advice in 2-3 sentences.
    `;

    try {
      return await this.askGemini(prompt);
    } catch (error) {
      return 'I\'m here to help you find the perfect items! Could you tell me more about what you\'re looking for?';
    }
  }

  private getMockRecommendations(userPreferences: any, query: string): ProductRecommendation[] {
    const mockProducts = [
      { id: '1', name: 'Classic Denim Jacket', reason: 'Perfect for your casual style and fits your budget', confidence: 0.9 },
      { id: '2', name: 'Sustainable Cotton T-Shirt', reason: 'Matches your preferred colors and occasion', confidence: 0.8 },
      { id: '3', name: 'Versatile Sneakers', reason: 'Great for everyday wear and within your price range', confidence: 0.85 }
    ];
    
    return mockProducts.filter(() => Math.random() > 0.3);
  }

  private getMockCartSummary(cartItems: any[]): CartSummary {
    return {
      totalItems: cartItems.length,
      totalValue: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      recommendations: [
        'Consider adding a matching accessory to complete your look',
        'You might like our seasonal collection based on your style'
      ],
      savings: [
        'Add 2 more items to qualify for free shipping',
        'Check out our loyalty program for member discounts'
      ]
    };
  }

  private getMockStyleAnalysis(): StyleAnalysis {
    return {
      style: 'Contemporary Casual',
      confidence: 0.8,
      suggestions: [
        'Try mixing classic pieces with trendy accessories',
        'Consider adding more color variety to your wardrobe',
        'Explore sustainable fashion options'
      ]
    };
  }
}

export const geminiService = new GeminiService();
export default geminiService;


