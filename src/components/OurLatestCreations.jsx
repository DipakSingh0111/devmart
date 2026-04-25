import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_MAP } from "../utils/apiData";

const OurLatestCreations = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  // 🔥 API
  const getProducts = async () => {
    try {
      const random = Math.floor(Math.random() * 50);
      const res = await axios.get(`${API_MAP.home}?limit=8&skip=${random}`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Add To Cart + Toast
  const AddToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);

    dispatch(
      addToCart({
        cartObj: {
          price: item.price,
          title: item.title,
          image: item.thumbnail,
          qty: 1,
          description: item.description,
          id: item.id,
        },
      }),
    );

    if (existing) {
      toast(`Increased quantity of ${item.title}`, {
        icon: "➕",
      });
    } else {
      toast.success(`${item.title} added to cart 🛒`);
    }
  };

  // 🔥 Slug
  const createSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  // 🔥 Navigation
  const handleProductClick = (item) => {
    navigate(`/product/${item.id}/${createSlug(item.title)}`);
  };

  useEffect(() => {
    getProducts();

    const interval = setInterval(() => {
      getProducts();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-14 px-6">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Latest Products</h1>
        <p className="text-gray-500 mt-2">Fresh arrivals you’ll love ✨</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((item) => {
          const oldPrice = Math.round(
            item.price / (1 - item.discountPercentage / 100),
          );

          return (
            <div
              key={item.id}
              onClick={() => handleProductClick(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full object-contain group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title */}
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                  {item.title}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-black">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{oldPrice}
                  </span>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                    {Math.round(item.discountPercentage)}% OFF
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      AddToCart(item);
                    }}
                    className="text-sm bg-black text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurLatestCreations;
