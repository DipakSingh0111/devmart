import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSummary = ({ onPriceCalculated }) => {
  const cart = useSelector((state) => state.cart.cart || []);
  const navigate = useNavigate();
  const location = useLocation();

  const isPlaceOrderPage = location.pathname === "/place-order";

  /* Calculations */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const originalTotal = cart.reduce(
    (sum, item) => sum + Math.floor(item.price * 1.3) * item.qty,
    0,
  );
  const saved = originalTotal - subtotal;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + deliveryCharge;

  useEffect(() => {
    if (onPriceCalculated) {
      onPriceCalculated(grandTotal);
    }
  }, [grandTotal, onPriceCalculated]);

  return (
    <div className="lg:col-span-1 w-full lg:w-80">
      <div className="bg-white rounded-2xl shadow-md border sticky top-6 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Order Summary</h2>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({totalQty} items)</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>MRP Total</span>
            <span className="line-through">
              ₹{originalTotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="text-green-600 font-semibold">
              − ₹{saved.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
              {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>

            {saved > 0 && (
              <p className="text-xs text-green-600 mt-1">
                You saved ₹{saved.toLocaleString("en-IN")} 🎉
              </p>
            )}
          </div>

          <button
            disabled={isPlaceOrderPage}
            onClick={() => navigate("/place-order")}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              isPlaceOrderPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isPlaceOrderPage ? "Already in Checkout" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
