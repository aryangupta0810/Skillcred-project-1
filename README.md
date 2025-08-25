# AI Virtual Shopping Assistant

A fully functional e-commerce website with AI-powered shopping recommendations, built with React, TypeScript, and Tailwind CSS. The application integrates with Google's Gemini AI API to provide personalized shopping experiences.

## 🚀 Features

### Core Functionality
- **AI-Powered Shopping Assistant**: Chat with Gemini AI for personalized recommendations
- **Smart Product Filtering**: Advanced filters based on budget, style, category, and preferences
- **Personalized User Experience**: User preferences management with localStorage persistence
- **Shopping Cart Management**: Full cart functionality with AI-powered insights
- **Responsive Design**: Mobile-first design with modern UI/UX

### AI Integration
- **Product Recommendations**: AI suggests products based on user preferences
- **Cart Analysis**: AI analyzes shopping cart and provides optimization tips
- **Style Analysis**: AI understands user style and provides fashion advice
- **Shopping Guidance**: Conversational AI assistant for shopping queries

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Context API**: Efficient state management with React Context
- **Responsive Grid**: Tailwind CSS powered responsive layouts
- **Mock API Services**: Simulated Shopify and Gemini API integration
- **Local Storage**: Persistent user preferences and cart data

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API
- **State Management**: React Context + useReducer
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Header.tsx          # Navigation and search
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product display card
│   ├── Filters.tsx         # Product filtering
│   └── ChatUI.tsx          # AI chat interface
├── contexts/                # React Context providers
│   ├── CartContext.tsx     # Shopping cart state
│   └── UserPreferencesContext.tsx  # User preferences
├── pages/                   # Main page components
│   ├── Home.tsx            # Landing page
│   ├── Products.tsx        # Product catalog
│   ├── ProductDetail.tsx   # Individual product view
│   ├── Cart.tsx            # Shopping cart
│   └── Chat.tsx            # AI assistant
├── services/                # API and external services
│   ├── geminiService.ts    # Gemini AI integration
│   └── shopifyService.ts   # Mock Shopify API
├── App.tsx                  # Main app component
└── index.tsx               # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (optional for full AI functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-virtual-shopping-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🔧 Configuration

### Gemini AI API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file:
   ```env
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```

### Customizing Mock Data

Edit `src/services/shopifyService.ts` to modify:
- Product catalog
- Categories and collections
- Mock API responses

## 🎯 Usage

### For Users

1. **Set Your Preferences**: Go to the Chat page and set your budget, size, style tags, and favorite colors
2. **Browse Products**: Use filters and search to find items
3. **Chat with AI**: Ask the AI assistant for recommendations
4. **Manage Cart**: Add/remove items and get AI-powered cart insights

### For Developers

1. **Adding New Components**: Create components in the `components/` directory
2. **Extending AI Features**: Modify `geminiService.ts` for additional AI functionality
3. **Customizing Styles**: Update Tailwind configuration in `tailwind.config.js`
4. **Adding New Pages**: Create new page components and add routes in `App.tsx`

## 🎨 Customization

### Colors and Theme
Modify `tailwind.config.js` to customize:
- Primary and secondary color schemes
- Font families
- Animation durations
- Custom spacing and breakpoints

### Component Styling
All components use Tailwind CSS classes and can be easily customized by modifying the className props.

## 🔒 Security Notes

- API keys should never be committed to version control
- Use environment variables for sensitive configuration
- Implement proper authentication in production
- Validate all user inputs

## 🚧 Future Enhancements

- [ ] Real Shopify API integration
- [ ] User authentication and accounts
- [ ] Payment processing (Stripe integration)
- [ ] Advanced AI features (image recognition, style matching)
- [ ] Mobile app (React Native)
- [ ] Analytics and tracking
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Unsplash](https://unsplash.com/) for sample images

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Note**: This is a demonstration project. For production use, implement proper security measures, error handling, and real API integrations.


