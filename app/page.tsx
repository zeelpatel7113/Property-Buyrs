'use client'

import { useState, createContext } from 'react';
import { Hero, Navbar, Products } from './components';
import { AppContext } from './context/AppContext';
import Categories from '@/components/ui/Categories';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
// import App from './components/Products';

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  console.log(showCart);
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("I am Interested to Buy a Property");
    window.open(`https://wa.me/+919510774987?text=${message}`, '_blank');
  };
  return (
    <AppContext.Provider value={{ showCart, setShowCart }}>
      <Navbar />
      <Hero />
      {/* <Categories/> */}
      <Products />
      <Footer/>
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} className="group-hover:animate-pulse" />
        <span className="absolute right-full mr-3 bg-black/75 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat with us
        </span>
      </button>
    </AppContext.Provider>
  )
}
