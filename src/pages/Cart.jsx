import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  clearItemFromCart,
} from "../redux/cartSlice";
import OrderSummary from "../components/checkout/OrderSummary";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart || []);

  const handleIncrease = (item) => {
    dispatch(addToCart({ cartObj: { ...item, qty: 1 } }));
  };

  const handleDecrease = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleRemove = (id) => {
    dispatch(clearItemFromCart({ id }));
  };

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  /* EMPTY STATE */
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold">Cart is Empty</h2>
        <p className="text-gray-500 mt-2">
          Your cart is currently empty. Start shopping to add items!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-10 mt-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-5 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500 text-sm">
              {totalQty} item{totalQty !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline text-sm"
          >
            ← Continue Shopping
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => {
              const origPrice = Math.floor(item.price * 1.3);
              const discount = Math.floor(
                ((origPrice - item.price) / origPrice) * 100,
              );

              return (
                <div
                  key={item.id}
                  className="
                    bg-white rounded-2xl shadow-sm border 
                    p-4 sm:p-5 
                    flex flex-col sm:flex-row 
                    gap-4 sm:gap-5 
                    hover:shadow-md transition
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                    w-full sm:w-28 
                    h-40 sm:h-28 
                    bg-gray-50 rounded-xl 
                    flex items-center justify-center
                  "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex flex-col flex-1 justify-between">
                    {/* TITLE + REMOVE */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {item.title}
                      </h3>

                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ✕
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-lg font-bold">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm line-through text-gray-400">
                        ₹{(origPrice * item.qty).toLocaleString("en-IN")}
                      </span>

                      <span className="text-xs text-green-600">
                        {discount}% off
                      </span>
                    </div>

                    {/* CONTROLS */}
                    <div
                      className="
                      flex flex-col sm:flex-row 
                      justify-between 
                      items-start sm:items-center 
                      gap-3 mt-3
                    "
                    >
                      {/* QTY */}
                      <div className="flex border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="px-4">{item.qty}</span>

                        <button
                          onClick={() => handleIncrease(item)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
