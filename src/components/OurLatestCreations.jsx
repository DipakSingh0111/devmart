import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OurLatestCreations = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      // 🔥 random skip for changing data
      const random = Math.floor(Math.random() * 50);

      const res = await axios.get(
        `https://dummyjson.com/products?limit=8&skip=${random}`
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts(); // initial load

    // 🔥 har 5 sec me data change
    const interval = setInterval(() => {
      getProducts();
    }, 5000);

    // 🔥 cleanup (important)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mt-5">
        Latest Products
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Discover our newest arrivals – fresh styles, trending picks, and best deals.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 max-w-6xl mx-auto px-3">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.id}`)}
            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
              <h2 className="text-white font-semibold text-sm line-clamp-2">
                {item.title}
              </h2>

              <p className="text-green-400 font-bold mt-1">
                ₹{item.price}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${item.id}`);
                }}
                className="mt-2 bg-white text-black text-xs px-3 py-1 rounded"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurLatestCreations;