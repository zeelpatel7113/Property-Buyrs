"use client";

import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from './Cart';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Laptop, Monitor, Microchip, Cpu, Keyboard, Mouse } from 'lucide-react';
import {
  ShoppingBag,
  Menu,
  ChevronDown,
  Phone,
  MapPin,
} from 'lucide-react';


import { Printer, Camera, HardDrive, MemoryStick } from 'lucide-react';

const categories = [
  { name: 'Computer', slug: 'computers', icon: Laptop }, 
  { name: 'Laptop', slug: 'laptop', icon: Laptop }, 
  { name: 'Printer', slug: 'printer', icon: Printer }, 
  { name: 'CCTV Camara', slug: 'cctv-camara', icon: Camera }, 
  { name: 'Monitor', slug: 'monitor', icon: Monitor }, 
  { name: 'CPU', slug: 'cpu', icon: Cpu }, 
  { name: 'GPU', slug: 'gpu', icon: Microchip }, 
  { name: 'RAM', slug: 'ram', icon: MemoryStick }, 
  { name: 'SSD', slug: 'ssd', icon: HardDrive }, 
  { name: 'Keyboard', slug: 'keyboard', icon: Keyboard }, 
  { name: 'Mouse', slug: 'mouse', icon: Mouse }
];


const PHONE_NUMBER = "+919987862640";
const SHOP_LOCATION = "https://maps.app.goo.gl/psfZqVaJzJURGxhf9";

const Navbar = () => {
  
  

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleCategoryClick = (slug: string) => {
    window.location.href = `/categories/${slug}`;
    setIsMobileMenuOpen(false);
  };
  
 
  
  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleLocationClick = () => {
    window.open(SHOP_LOCATION, '_blank');
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-col w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="w-full border-b">
          <div className="container mx-auto px-4 h-16">
            <div className="flex h-full items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="py-4">
                      <h2 className="text-lg font-semibold mb-4">Categories</h2>
                      <nav className="flex flex-col gap-2">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <Button
                              key={category.slug}
                              variant="ghost"
                              className="justify-start w-full"
                              onClick={() => handleCategoryClick(category.slug)}
                            >
                              <Icon className="mr-2 h-4 w-4" />
                              {category.name}
                            </Button>
                          );
                        })}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>

                <Link
                  href="/"
                  className="text-xl font-bold tracking-tight whitespace-nowrap"
                >
                  Universe Computers
                </Link>

                <div className="hidden lg:flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        Categories
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-[300px] grid grid-cols-1 gap-1"
                    >
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <DropdownMenuItem
                            key={category.slug}
                            onClick={() => handleCategoryClick(category.slug)}
                            className="gap-2 cursor-pointer"
                          >
                            <Icon className="h-4 w-4" />
                            {category.name}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <div className="hidden md:flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCallClick}
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Call Us</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleLocationClick}
                        >
                          <MapPin className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Find Us</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>

                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={handleCartClick}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button> */}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Contact Bar */}
        <div className="md:hidden w-full px-4 py-2 border-b">
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCallClick}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleLocationClick}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Find Us
            </Button>
          </div>
        </div>
      </div>

      {/* {showCart && <Cart />} */}
    </>
  );
};

export default Navbar;