"use client";

import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FaWhatsapp } from 'react-icons/fa6';

const ProductDetails = ({ product }: any) => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const { cartItems, addProduct, qty, decQty, incQty }: any = useContext(CartContext);

  // Simulating loading effect for product data
  useEffect(() => {
    if (product) {
      setTimeout(() => setLoading(false), 1000); // Simulate a short delay
    }
  }, [product]);

  if (loading) return <p className="flex text-3xl justify-center items-center min-h-screen">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden bg-white rounded-lg shadow">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left - Image Section */}
            <div className="space-y-6">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  loader={() => urlForImage(product.images[index]).url()}
                  src={urlForImage(product.images[index]).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {product.images?.map((item: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      index === i ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <Image
                      loader={() => urlForImage(item).url()}
                      src={urlForImage(item).url()}
                      alt={`Product view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  In Stock
                </Badge>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {product.name}
                </h1>
                <p className="mt-4 text-3xl font-bold text-gray-900">₹{product.price}</p>
              </div>

              <Separator />

              <div className="space-y-6">
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={decQty} className="h-10 w-10">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium">{qty}</span>
                    <Button variant="outline" size="icon" onClick={incQty} className="h-10 w-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div> */}

                <Button className="w-full h-12 text-lg" onClick={() => window.open("https://wa.me/919987862640", "_blank")}>
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  Message
                </Button>
              </div>

              {product.description && (
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-900">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
