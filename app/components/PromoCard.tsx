import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoCardProps {
  label: string;
  title: string;
  path: string;
  image: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ label, title, path, image }) => {
  return (
    <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-[235px] group">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
      />
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div>
          <span className="text-blue-400 text-sm font-medium">{label}</span>
          <h3 className="text-white text-2xl font-bold mt-1">{title}</h3>
        </div>
        <button
          className="flex items-center space-x-2 text-white group/btn"
          onClick={() => (window.location.href = path)}
        >
          <span className="font-medium">SHOP NOW</span>
          <ArrowRight
            size={20}
            className="group-hover/btn:translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
