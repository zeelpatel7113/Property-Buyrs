"use client";
import React from "react";
import {
  MapPin,
  Bed,
  Bath,
  Home,
  Calendar,
  Square as SquareFeet,
  Building,
  MapIcon,
} from "lucide-react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Product {
  name: string;
  slug: { current: string };
  images: { asset: { url: string } }[];
  description: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  possession: string;
  location: string;
  address: string;
  mapEmbeded: string;
  category: string[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [activeImage, setActiveImage] = React.useState(0);

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          {/* Main Image Display */}
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={urlForImage(product.images[activeImage])?.url() || "/placeholder.jpg"} // Fallback image
              alt={`Product view ${activeImage + 1}`}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              unoptimized // Ensures external images load
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4 md:grid-cols-6 p-2  overflow-x-auto">
            {product.images.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden ${
                  activeImage === i ? "ring-2 ring-black" : "ring-1 ring-gray-200"
                }`}
              >
                <Image
                  src={urlForImage(item)?.url() || "/placeholder.jpg"}
                  alt={`Thumbnail ${i + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <p>
                {product.location} - {product.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 flex items-center">
              {formatPrice(product.price)}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-gray-600" />
                <span>{product.bedrooms} Beds</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="w-5 h-5 text-gray-600" />
                <span>{product.bathrooms} Baths</span>
              </div>
              <div className="flex items-center space-x-2">
                <SquareFeet className="w-5 h-5 text-gray-600" />
                <span>{product.area} sq.ft</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-gray-600" />
                <span>{product.floors} Floors</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapIcon className="w-5 h-5 text-gray-600" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span>{product.possession}</span>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
  <h2 className="text-2xl font-semibold mb-6">Location</h2>
  <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
    <div
      dangerouslySetInnerHTML={{ __html: product.mapEmbeded }}
      className="absolute inset-0 w-full h-full"
    />
  </div>
</div>

    </div>
  );
};

export default ProductDetails;
