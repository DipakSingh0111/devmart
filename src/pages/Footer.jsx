import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 mt-5">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-wide">
            <span className="text-white">Dev</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              mart
            </span>
          </Link>
          <p className="text-sm leading-6">
            Your one-stop destination for trendy fashion and quality products.
            Discover the latest styles at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-500 cursor-pointer">Home</li>
            <li className="hover:text-pink-500 cursor-pointer">Shop</li>
            <li className="hover:text-pink-500 cursor-pointer">New Arrivals</li>
            <li className="hover:text-pink-500 cursor-pointer">Men</li>
            <li className="hover:text-pink-500 cursor-pointer">Women</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-500 cursor-pointer">Contact Us</li>
            <li className="hover:text-pink-500 cursor-pointer">
              Return Policy
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              Shipping Info
            </li>
            <li className="hover:text-pink-500 cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Subscribe</h2>
          <p className="text-sm mb-4">
            Get updates about new products and offers
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-l-md text-black outline-none"
            />
            <button className="bg-pink-500 px-4 rounded-r-md text-white hover:bg-pink-600">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Shopiva. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
