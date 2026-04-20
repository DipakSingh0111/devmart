import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSummary = ({ onPriceCalculated }) => { // 👈 Prop add kiya
  const cart = useSelector((state) => state.cart.cart || []);
  const navigate = useNavigate();
  const location = useLocation();

  const isPlaceOrderPage = location.pathname === "/place-order";

  /* Calculations */
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const originalTotal = cart.reduce((sum, item) => sum + Math.floor(item.price * 1.3) * item.qty, 0);
  const saved = originalTotal - subtotal;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + deliveryCharge;

  // Jab bhi price change ho, parent (ConfirmStep) ko batao
  useEffect(() => {
    if (onPriceCalculated) {
      onPriceCalculated(grandTotal);
    }
  }, [grandTotal, onPriceCalculated]);

  return (
    <div className="lg:col-span-1 w-full lg:w-80">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden sticky top-4 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Order Summary</h2>
        </div>

        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({totalQty} items)</span>
            <span className="font-medium text-gray-800">₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>MRP total</span>
            <span className="line-through">₹{originalTotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Discount savings</span>
            <span className="text-emerald-600 font-semibold">− ₹{saved.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery</span>
            <span className={deliveryCharge === 0 ? "text-emerald-600 font-medium" : ""}>
              {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-3 mt-1">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900 text-base">Total</span>
              <span className="font-bold text-gray-900 text-base">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
            {saved > 0 && (
              <p className="text-[11px] text-emerald-600 font-medium mt-1 text-right">You save ₹{saved.toLocaleString("en-IN")} 🎉</p>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <button
            disabled={isPlaceOrderPage}
            onClick={() => navigate("/place-order")}
            className={`w-full font-semibold text-sm py-3 rounded-xl transition-all ${
              isPlaceOrderPage ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-900 text-white"
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
