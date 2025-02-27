"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
// import Logo from '@/public/logoblue.png';
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
import {
  Home,
  Building2,
  Building,
  Trees,
  Store,
  Factory,
  Warehouse,
  Hotel,
  Phone,
  MapPin,
  Menu,
  ChevronDown,
  Mail,
} from 'lucide-react';
import Image from 'next/image';

const categories = [
  { name: 'Residential', slug: 'residential', icon: Home, description: 'Houses, apartments, and condos' },
  { name: 'Commercial', slug: 'commercial', icon: Building2, description: 'Office spaces and retail' },
  { name: 'Apartments', slug: 'apartments', icon: Building, description: 'Multi-family units' },
 
  { name: 'Retail', slug: 'retail', icon: Store, description: 'Shopping centers and stores' }
];

const PHONE_NUMBER = "+919510774987";
const OFFICE_LOCATION = "https://maps.app.goo.gl/example";
const EMAIL = "infoxoras@gmail.com";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleCategoryClick = (slug: string) => {
    window.location.href = `/properties/${slug}`;
    setIsMobileMenuOpen(false);
  };
  
  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleLocationClick = () => {
    window.open(OFFICE_LOCATION, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-col w-full background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Top Bar */}
        <div className="hidden md:block w-full bg-primary/5 border-b">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-end items-center space-x-6 text-sm">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center space-x-2 hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center space-x-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>{EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16">
            <div className="flex h-full items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                {/* <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <div className="py-4">
                      <h2 className="text-lg font-semibold mb-4">Property Types</h2>
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
                              <div className="flex flex-col items-start">
                                <span>{category.name}</span>
                                <span className="text-xs text-muted-foreground">{category.description}</span>
                              </div>
                            </Button>
                          );
                        })}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet> */}

                <Link
                  href="/"
                  className="items-center text-lg font-bold"
                >
                  <div className="flex items-center justify-between gap-1">
                    <Home className='h-8 w-full'/>
                    <div className="flex-col leading-4">

                    <h2>Property</h2>
                    <h2>Buyrs.com</h2>
                    </div>
                  </div>
                  {/* <Image 
                    src={Logo}
                    alt="Company Logo"
                    className="h-8 w-auto" 
                  /> */}
                </Link>

                <div className="hidden lg:flex items-center space-x-4">
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        Properties
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
                            className="flex items-start gap-2 cursor-pointer p-3"
                          >
                            <Icon className="h-5 w-5 mt-0.5" />
                            <div className="flex flex-col">
                              <span className="font-medium">{category.name}</span>
                              <span className="text-xs text-muted-foreground">{category.description}</span>
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                  <Button variant="ghost">About</Button>
                  <Button variant="ghost">Contact</Button>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <a href={`tel:${PHONE_NUMBER}`}>

                <Button variant="outline" className="hidden md:flex">
                  List Your Property
                </Button>
                </a>
                <a href={`tel:${PHONE_NUMBER}`}>


                <Button className='bg-blue-700 hover:bg-blue-600'>
                  Schedule Viewing
                </Button>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Contact Bar */}
        <div className="md:hidden w-full px-4 py-2 border-b bg-background">
          <div className="flex justify-between gap-2 max-w-md mx-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleCallClick}
            >
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleEmailClick}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleLocationClick}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Visit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;