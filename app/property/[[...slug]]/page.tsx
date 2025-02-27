"use client"

import Footer from '@/app/components/Footer';
import { Navbar, ProductDetails } from '../../components'

// import Footer from "@/app/components/Footer";
import React from "react";
import { useParams } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const page = async () => {
  const { slug }:any = useParams();
  const products = await client.fetch(groq `*[_type=="product"]`);
  const product = products.find((product:any)=>product.slug.current == slug);
  return <div>
    <Navbar/>
    <ProductDetails product={product}/>
    <Footer/>
  </div>;
};

export default page;
