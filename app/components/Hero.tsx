import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return <div className="relative py-12">
  {/* Hero Background with Overlay */}
  <div className="absolute inset-0 z-0">
    <img 
      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
      alt="Luxury Home"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
  </div>

  {/* Hero Content */}
  <div className="relative z-10 h-full flex flex-col items-start justify-center px-4 sm:px-6 lg:px-20">
    <div className="max-w-2xl">
      <h2 className="text-blue-300 font-semibold text-lg sm:text-xl mb-2">
        Welcome to LuxuryHomes
      </h2>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Discover Your <br />
        Perfect Property
      </h1>
      <p className="text-lg sm:text-xl text-blue-50 mb-6 leading-relaxed">
        Experience luxury living with our handpicked selection of premium properties across the globe.
      </p>
      <div className="flex gap-4">
        <button className="bg-zinc-100 hover:bg-zinc-300 text-black px-6 py-3 rounded-lg transition duration-200 flex items-center gap-2 text-base font-semibold">
          Explore Properties
          <ArrowRight className="ml-2" size={18} />
        </button>
        <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition duration-200 text-base font-semibold">
          Learn More
        </button>
      </div>
    </div>
  </div>
</div>
};

export default Hero;
