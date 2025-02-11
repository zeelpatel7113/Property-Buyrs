import React from "react";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";

const ProductList = ({ products }: { products: any[] }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {products.map((product) => (
        <Link key={product._id} href={`/product/${product.slug.current}`}>
          <div className="border rounded-lg p-4 shadow-md cursor-pointer">
            <Image loader={()=>urlForImage(product.images[0]).url()}
                  src={urlForImage(product.images[0]).url()}
                  width={60}
                  height={40}
                  alt={product.images[0]}className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
