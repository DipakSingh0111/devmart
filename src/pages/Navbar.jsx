import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 Load user
  const loadUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("authChange", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
    };
  }, []);

  // 🔥 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // 🔥 logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(clearCart());

    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  // 🔥 search
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search/${search}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const displayName =
    user?.newUser?.fullName || user?.user?.fullName || user?.fullName || "User";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
      <div className="max-w-[1300px] mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <span className="text-white">Dev</span>
          <span className="text-pink-500">mart</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-300 text-sm">
          <Link to="/">Home</Link>
          <Link to="/mens">Mens</Link>
          <Link to="/womens">Womens</Link>
          <Link to="/latest">Latest</Link>
          <Link to="/kids">Kids</Link>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5">
          {/* Search */}
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
          </div>

          {/* Wishlist */}
          <Link to="/wishlist">
            <FaHeart className="text-gray-300 hover:text-pink-400" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-gray-300 hover:text-pink-400" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 rounded-full">
              {cart.length}
            </span>
          </Link>

          {/* 🔥 AUTH DROPDOWN */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="cursor-pointer"
              >
                <FaUserCircle className="text-2xl text-white" />
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
                  {/* Name */}
                  <div className="px-4 py-3 border-b text-sm font-semibold">
                    {displayName}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    ❤️ Wishlist
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 text-sm"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/register"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm"
            >
              Register
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4 text-white text-xl">
          <Link to="/cart" className="relative">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 text-xs bg-pink-500 px-1 rounded-full">
              {cart.length}
            </span>
          </Link>

          <div onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black border-t border-gray-800 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-5 gap-4 text-gray-300">
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/mens" onClick={closeMenu}>
            Mens
          </Link>
          <Link to="/womens" onClick={closeMenu}>
            Womens
          </Link>
          <Link to="/latest" onClick={closeMenu}>
            Latest
          </Link>
          <Link to="/kids" onClick={closeMenu}>
            Kids
          </Link>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search..."
            className="bg-gray-900 text-white px-3 py-2 rounded-full"
          />

          {user ? (
            <>
              <p className="text-white text-center">{displayName}</p>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="bg-red-500 text-white py-2 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/register"
              onClick={closeMenu}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-full text-center"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
