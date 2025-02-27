"use client"
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import PropertyCard from './Card';
// import PropertyCard from './components/Card';

const locations = ['Raysan', 'Randesan', 'Koba', 'Kudasan', 'Sargasan', 'Por', 'GIFT City'];
const propertyTypes = ['2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Penthouse', 'Villa & Bungalow'];
const priceRanges = [
  { label: 'Below 50 Lac', min: 0, max: 5000000 },
  { label: '50 - 70 Lac', min: 5000000, max: 7000000 },
  { label: '70 - 90 Lac', min: 7000000, max: 9000000 },
  { label: '90 Lac - 1.2 Cr', min: 9000000, max: 12000000 },
  { label: '1.2 - 1.5 Cr', min: 12000000, max: 15000000 },
  { label: '1.5 - 2 Cr', min: 15000000, max: 20000000 },
  { label: 'Above 2 Cr', min: 20000000, max: Infinity }
];
const possessionTimes = ['Ready Possession', 'In 1 Year', 'In 2 Years', 'In 3 Years', '3 Years+'];

function App() {
  const [properties, setProperties] = useState<{ 
    slug: string; 
    name: string; 
    images: { asset: { url: string } }[]; 
    price: number; 
    bedrooms: number; 
    bathrooms: number; 
    area: number; 
    possession: string; 
    address: string; 
    category: string; 
  }[]>([]);
  
  // const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [] as string[],
    propertyTypes: [] as string[],
    priceRange: '',
    possession: ''
  });

  const toggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleLocationChange = (location: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handlePropertyTypeChange = (type: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handlePriceChange = (price: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === price ? '' : price
    }));
  };

  const handlePossessionChange = (possession: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      possession: prev.possession === possession ? '' : possession
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      locations: [],
      propertyTypes: [],
      priceRange: '',
      possession: ''
    });
    setSearchTerm('');
  };

  useEffect(() => {
    const fetchProperties = async () => {
        setLoading(true);
        try {
            let query = groq`*[_type == "product"`;

            const filters = [];

            // Location Filter
            if (selectedFilters.locations.length > 0) {
                filters.push(`location in [${selectedFilters.locations.map(l => `"${l}"`).join(', ')}]`);

            }

            // Property Type Filter (Fixing bedroom number extraction)
            if (selectedFilters.propertyTypes.length > 0) {
                const numericBHKs = selectedFilters.propertyTypes
                    .map(type => parseInt(type.split(' ')[0]))
                    .filter(num => !isNaN(num));

                const otherTypes = selectedFilters.propertyTypes.filter(type => isNaN(parseInt(type.split(' ')[0])));

                if (numericBHKs.length > 0) {
                    filters.push(`bedrooms in [${numericBHKs.join(', ')}]`);
                }
                if (otherTypes.length > 0) {
                    filters.push(`category in [${otherTypes.map(t => `"${t}"`).join(', ')}]`);
                }
            }

            // Possession Filter
            if (selectedFilters.possession) {
                filters.push(`possession == "${selectedFilters.possession}"`);
            }

            // Price Range Filter
            if (selectedFilters.priceRange) {
                const priceRange = priceRanges.find(range => range.label === selectedFilters.priceRange);
                if (priceRange) {
                    filters.push(`price >= ${priceRange.min} && price <= ${priceRange.max}`);
                }
            }

            // Search Filter (Fix for partial matches)
            if (searchTerm) {
                filters.push(`name match "*${searchTerm}*" || address match "*${searchTerm}*"`);
            }

            if (filters.length > 0) {
                query += ` && ${filters.join(' && ')}`;
            }

            query += `] {
              "slug": slug.current,
              name,
              "images": images[] {
                  "asset": {
                      "url": asset->url
                  }
              },
              price,
              bedrooms,
              bathrooms,
              area,
              possession,
              address,
              category
          } | order(price asc)`;
          

            const result = await client.fetch(query);
            setProperties(result);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    fetchProperties();
}, [searchTerm, selectedFilters]);


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 ">
        <div className="container mx-auto">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg pr-10"
                placeholder="Search by property name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Location Filter */}
            <div className="relative">
              <button 
                onClick={() => toggleFilter('location')} 
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 ${
                  selectedFilters.locations.length > 0 ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                Location ({selectedFilters.locations.length})
                <ChevronDown size={16} />
              </button>
              {activeFilter === 'location' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <ul className="space-y-2">
                    {locations.map(location => (
                      <li key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={selectedFilters.locations.includes(location)}
                          onChange={() => handleLocationChange(location)}
                          className="mr-2"
                        />
                        <label htmlFor={`location-${location}`}>{location}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Property Type Filter */}
            <div className="relative">
              <button 
                onClick={() => toggleFilter('propertyType')} 
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 ${
                  selectedFilters.propertyTypes.length > 0 ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                Property Type ({selectedFilters.propertyTypes.length})
                <ChevronDown size={16} />
              </button>
              {activeFilter === 'propertyType' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <ul className="space-y-2">
                    {propertyTypes.map(type => (
                      <li key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          checked={selectedFilters.propertyTypes.includes(type)}
                          onChange={() => handlePropertyTypeChange(type)}
                          className="mr-2"
                        />
                        <label htmlFor={`type-${type}`}>{type}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <button 
                onClick={() => toggleFilter('price')} 
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 ${
                  selectedFilters.priceRange ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                Price Range
                <ChevronDown size={16} />
              </button>
              {activeFilter === 'price' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <ul className="space-y-2">
                    {priceRanges.map(price => (
                      <li key={price.label} className="flex items-center">
                        <input
                          type="radio"
                          id={`price-${price.label}`}
                          name="price"
                          checked={selectedFilters.priceRange === price.label}
                          onChange={() => handlePriceChange(price.label)}
                          className="mr-2"
                        />
                        <label htmlFor={`price-${price.label}`}>{price.label}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Possession Filter */}
            <div className="relative">
              <button 
                onClick={() => toggleFilter('possession')} 
                className={`px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50 ${
                  selectedFilters.possession ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                Possession
                <ChevronDown size={16} />
              </button>
              {activeFilter === 'possession' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <ul className="space-y-2">
                    {possessionTimes.map(time => (
                      <li key={time} className="flex items-center">
                        <input
                          type="radio"
                          id={`possession-${time}`}
                          name="possession"
                          checked={selectedFilters.possession === time}
                          onChange={() => handlePossessionChange(time)}
                          className="mr-2"
                        />
                        <label htmlFor={`possession-${time}`}>{time}</label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-8 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading properties...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map(property => (
  <PropertyCard key={property.slug} property={property} />
))}

            </div>
            {properties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;