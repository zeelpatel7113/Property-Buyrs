import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, X } from 'lucide-react';

const PHONE_NUMBER = "+919510774987";
const SHOP_LOCATION = "https://maps.app.goo.gl/psfZqVaJzJURGxhf9";
const Footer = () => {
  const handleCallClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };
  const handleLocationClick = () => {
    window.open(SHOP_LOCATION, '_blank');
  };
  return (
    <footer className="bg-gray-300 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Infoxoras</h3>
            <p className="text-sm">Your one-stop for all Real Estate needs</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-900">About Us</a></li>
              <li><a href="#" className="hover:text-blue-900">Contact</a></li>
              <li><a href="#" className="hover:text-blue-900">Support</a></li>
              {/* <li><a href="#" className="hover:text-red-900">Track Order</a></li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h4>
            <div className="space-y-2">
              <p className="flex items-center hover:text-blue-900" onClick={handleCallClick}>
                <Phone size={18} className="mr-2" />
                +91 95107 74987
              </p>
              {/* <p className="flex items-center hover:text-blue-900">
                <Mail size={18} className="mr-2" />
                
              </p> */}
              <p className="flex items-center hover:text-blue-900" onClick={handleLocationClick}>
                <MapPin size={18} className="mr-2" />
                Location
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500">
                <Facebook size={24} />
              </a>
              {/* <a href="#" className="hover:text-black-500">
                <Twitter size={24} />
              </a> */}
              <a href="#" className="hover:text-pink-500">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Infoxoras. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;