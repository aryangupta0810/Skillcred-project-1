import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <UserPreferencesProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </UserPreferencesProvider>
    </Router>
  );
}

export default App;


