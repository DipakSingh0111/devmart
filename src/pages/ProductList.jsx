import React from "react";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = ({ data }) => {
  const { title, thumbnail, price, rating, description, id } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const checkItemInCart = cart.find((obj) => obj.id === id);

  // ✅ slug
  const createSlug = (text) => {
    return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  };

  const handleProductClick = () => {
    const slug = createSlug(title);
    navigate(`/product/${id}/${slug}`);
  };

  // 👉 Add to cart
  const addToCartHandler = () => {
    const cartObj = {
      price,
      title,
      image: thumbnail,
      qty: 1,
      description,
      id,
    };
    dispatch(addToCart({ cartObj }));
  };

  // 👉 Buy now (direct checkout page pe bhej sakta hai future me)
  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCartHandler();
    navigate("/cart");
  };

  // 👉 Fake discount logic (UI ke liye)
  const originalPrice = Math.floor(price * 1.3); // 30% higher
  const discount = Math.floor(
    ((originalPrice - price) / originalPrice) * 100
  );

  return (
    <div
      onClick={handleProductClick}
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-xl transition duration-300 hover:scale-105 relative"
    >
      {/* 🔥 Discount Badge */}
      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
        {discount}% OFF
      </span>

      {/* Image */}
      <div className="w-full h-48">
        <img
          className="mx-auto h-full w-full object-contain"
          src={thumbnail}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-500">
              {i < Math.floor(rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-2 text-gray-500 text-sm">
            ({rating})
          </span>
        </div>

        {/* 🔥 Price Section */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-black">
            ₹{price}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ₹{originalPrice}
          </span>
        </div>

        {/* Offer text */}
        <p className="text-green-600 text-sm font-medium mt-1">
          Limited time deal 🔥
        </p>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCartHandler();
            }}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Buy
          </button>
        </div>

        {/* Optional Remove */}
        {checkItemInCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFromCart({ id }));
            }}
            className="mt-2 w-full text-sm text-red-500"
          >
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;