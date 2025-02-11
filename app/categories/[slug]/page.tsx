"use client"; // Ensure this is at the top

import { useParams } from 'next/navigation';
import { Navbar } from '../../components';
import React, { useEffect, useState } from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Footer from '@/app/components/Footer';
import ProductList from '@/app/components/ProductList';

const Page = () => {
    const params = useParams();
    const slug = params?.slug; // Ensure slug is correctly extracted
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    function toTitleCase(title: string) {
        return title.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
    } 

    useEffect(() => {
        const fetchProducts = async () => {
            if (!slug) return;

            setLoading(true);
            try {
                const products = await client.fetch(groq`*[_type=="product"]`);
                const filtered = products.filter((product: any) => product.category === slug);
                setFilteredProducts(filtered);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [slug]);

    if (loading) return <p className='flex text-3xl justify-center items-center min-h-screen'>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className='min-h-screen md:pl-16 md:pr-16 p-8'>
                <h1 className="text-3xl font-semibold text-center mt-8 mb-8">
                    {slug ? toTitleCase(slug) : "Category"}
                </h1>
                {filteredProducts.length > 0 ? (
                    <ProductList products={filteredProducts} />
                ) : (
                    <p>No products found for this category.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Page;
