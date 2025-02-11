import React from 'react';
import { Monitor, Cpu, Laptop, HardDrive, Mouse, Keyboard } from 'lucide-react';

const categories = [
  { name: 'Computers', icon: Monitor },
  { name: 'Parts', icon: Cpu },
  { name: 'Laptops', icon: Laptop },
  { name: 'Storage', icon: HardDrive },
  { name: 'Peripherals', icon: Mouse },
  { name: 'Accessories', icon: Keyboard },
];

const Categories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer"
            >
              <category.icon size={40} className="text-gray-900 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;