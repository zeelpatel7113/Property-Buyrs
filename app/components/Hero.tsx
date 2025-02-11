import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PromoCard from './PromoCard';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Gaming PCs",
      subtitle: "THE BEST PLACE TO GAME",
      description: "Save up to 50% on select Gaming PCs. Get 3 months of Xbox Game Pass for $2 USD.",
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800",
      price: "$999"
    },
    // Add more slides as needed
  ];

  const promos = [
    {
      label: "SUMMER SALES",
      title: "New RTX 4090",
      price: "$1,599",
      discount: "29% OFF",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400"
    },
    {
      label: "SPECIAL OFFER",
      title: "Gaming Laptops",
      price: "$1,299",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero Slider */}
        <div className="lg:col-span-2 relative bg-gray-100 rounded-2xl overflow-hidden">
          <div className="relative h-[500px]">
            <img
              src={slides[activeSlide].image}
              alt="Featured Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="p-12 h-full flex flex-col justify-center text-white">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-0.5 bg-blue-500"></div>
                    <span className="text-blue-400 font-medium">
                      {slides[activeSlide].subtitle}
                    </span>
                  </div>
                  <h1 className="text-5xl font-bold">{slides[activeSlide].title}</h1>
                  <p className="text-lg text-gray-200 max-w-md">
                    {slides[activeSlide].description}
                  </p>
                  <div className="flex items-center space-x-8 pt-4">
                    <span className="text-3xl font-bold">{slides[activeSlide].price}</span>
                    <button className="flex items-center space-x-2 bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 group">
                      <span>SHOP NOW</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-12 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-8 bg-blue-400' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Promotional Cards */}
        <div className="space-y-6">
          {promos.map((promo, index) => (
            <PromoCard key={index} {...promo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;