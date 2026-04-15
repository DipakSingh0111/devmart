import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  // Search handler
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search/${search}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
      <div className="max-w-[1300px] mx-auto px-6 h-[70px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          <span className="text-white">Dev</span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            mart
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link to="/">Home</Link>
          <Link to="/mens">Mens</Link>
          <Link to="/womens">Womens</Link>
          <Link to="/latest">Latest</Link>
          <Link to="/kids">Kids</Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-5">

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search products..."
              className="bg-gray-900 text-sm text-white px-4 py-2 rounded-full 
              outline-none w-[180px] focus:w-[240px] transition-all duration-300
              border border-gray-700 focus:border-pink-500"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative group">
            <FaHeart className="text-xl text-gray-300 group-hover:text-pink-400" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <FaShoppingCart className="text-xl text-gray-300 group-hover:text-pink-400" />
            <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white px-1.5 rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="px-5 py-2 text-sm rounded-full text-white font-medium
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            hover:scale-105 transition-all duration-300"
          >
            Register
          </Link>
        </div>

        {/* ✅ Mobile Right (Cart + Menu) */}
        <div className="md:hidden flex items-center gap-4 text-white text-2xl">

          {/* Cart always visible */}
          <Link to="/cart" className="relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white px-1.5 rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* Menu toggle */}
          <div onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black border-t border-gray-800 transition-all duration-300 overflow-hidden 
        ${menuOpen ? "max-h-[450px]" : "max-h-0"}`}
      >
        <div className="flex flex-col px-6 py-5 gap-4 text-gray-300">

          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/mens" onClick={closeMenu}>Mens</Link>
          <Link to="/womens" onClick={closeMenu}>Womens</Link>
          <Link to="/latest" onClick={closeMenu}>Latest</Link>
          <Link to="/kids" onClick={closeMenu}>Kids</Link>

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-full outline-none border border-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />

          {/* ✅ Center Icons */}
          <div className="flex justify-center items-center gap-6 mt-2">

            <Link to="/wishlist" onClick={closeMenu} className="relative">
              <FaHeart className="text-xl" />
            </Link>

            <Link to="/cart" onClick={closeMenu} className="relative">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 text-xs bg-pink-500 text-white px-1.5 rounded-full">
                {cart.length}
              </span>
            </Link>

          </div>

          {/* Register */}
          <Link
            to="/register"
            onClick={closeMenu}
            className="mt-3 text-center py-2 rounded-full text-white
            bg-gradient-to-r from-pink-500 to-purple-500"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;