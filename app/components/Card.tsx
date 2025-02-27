import React from 'react';
import { Home, MapPin, IndianRupee, Clock } from 'lucide-react';
import {  useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

interface Property {
  slug: string;
  name: string;
  images: Array<{
    asset: {
      url: string;
    };
  }>;
  price: number;
  bedrooms: number;
  possession: string;
  address: string;
}

interface PropertyCardProps {
  property: Property;
}

const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  } else {
    return `${(price / 100000).toFixed(1)} Lac`;
  }
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/property/${property.slug}`);
  // Change `_id` if you have a `slug`
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
    onClick={handleClick}
    >
      <img 
        src={property.images?.[0]?.asset?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600'} 
        alt={property.name} 
        className="w-full h-48 object-cover " 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            {property.address}
          </div>
          <div className="flex items-center text-gray-600">
            <Home size={16} className="mr-2" />
            {property.bedrooms} BHK
          </div>
          <div className="flex items-center text-gray-600">
            <IndianRupee size={16} className="mr-2" />
            {formatPrice(property.price)}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2" />
            {property.possession}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;