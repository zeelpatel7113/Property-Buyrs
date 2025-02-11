'use client'

import { useState, createContext } from 'react';
import { Hero, Navbar, Products } from './components';
import { AppContext } from './context/AppContext';
import Categories from '@/components/ui/Categories';
import Footer from './components/Footer';

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  console.log(showCart);
  // if (loading) return <p className='flex text-3xl justify-center items-center min-h-screen'>Loading...</p>;
  return (
    <AppContext.Provider value={{ showCart, setShowCart }}>
      <Navbar />
      <Hero />
      <Categories/>
      <Products />
      <Footer/>
    </AppContext.Provider>
  )
}
