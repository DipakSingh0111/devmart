import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/orderSlice";
import { toast } from "react-hot-toast";

const ConfirmStep = ({ form, paymentMethod, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cart || []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const delivery = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + delivery;

  const handleFinalPlaceOrder = () => {
    const orderData = {
      customer: form,
      paymentMethod,
      items: cartItems,
      total: grandTotal,
    };

    dispatch(placeOrder(orderData));

    toast.custom(
      (t) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#ffffff",
            border: "1px solid #bbf7d0",
            borderRadius: "16px",
            padding: "14px 20px",
            boxShadow: "0 8px 24px rgba(34,197,94,0.12)",
            minWidth: "280px",
            transition: "all 0.3s ease",
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Animated Circle + Checkmark */}
          <div style={{ width: 44, height: 44, flexShrink: 0 }}>
            <svg viewBox="0 0 40 40" width="44" height="44" overflow="visible">
              {/* Green filled background circle */}
              <circle cx="20" cy="20" r="18" fill="#dcfce7" />

              {/* Animated border circle */}
              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeDasharray="113"
                strokeDashoffset={t.visible ? "0" : "113"}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                  transition:
                    "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s",
                }}
              />

              {/* Animated checkmark */}
              <polyline
                points="11,20 17.5,27 29,13"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                strokeDashoffset={t.visible ? "0" : "30"}
                style={{
                  transition: "stroke-dashoffset 0.35s ease 0.65s",
                }}
              />
            </svg>
          </div>

          {/* Text */}
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              Order placed successfully!
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              We'll ship your items soon 🚚
            </p>
          </div>
        </div>
      ),
      { duration: 3500 },
    );

    navigate("/my-orders");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          Review Order
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Final step before we ship your items
        </p>
      </div>

      <div className="space-y-6">
        {/* Delivery Box */}
        <div className="group bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-100 border border-transparent rounded-3xl p-6 transition-all duration-300 relative">
          <button
            onClick={() => onBack(0)}
            className="absolute top-6 right-6 text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:scale-105 transition-transform"
          >
            Edit
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-lg">
              📍
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Shipping To
              </p>
              <p className="text-base font-bold text-gray-800">
                {form.firstName} {form.lastName}
              </p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-[280px]">
                {form.street}, {form.city}, {form.state} — {form.zip}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs bg-white px-2 py-1 rounded-lg border text-gray-500 font-medium">
                  📞 {form.phone}
                </span>
                <span className="text-xs bg-white px-2 py-1 rounded-lg border text-gray-500 font-medium truncate max-w-[150px]">
                  ✉️ {form.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Box */}
        <div className="group bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-100 border border-transparent rounded-3xl p-6 transition-all duration-300 relative">
          <button
            onClick={() => onBack(1)}
            className="absolute top-6 right-6 text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:scale-105 transition-transform"
          >
            Edit
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-lg">
              💳
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Payment Method
              </p>
              <p className="text-base font-bold text-gray-800">
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
              <p className="text-xs text-emerald-500 font-bold mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Securely handled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-50">
        <button
          onClick={() => onBack(1)}
          className="flex-1 order-2 sm:order-1 py-4 font-bold text-gray-500 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleFinalPlaceOrder}
          className="flex-[2] order-1 sm:order-2 py-4 font-bold text-white bg-gray-900 rounded-2xl shadow-xl shadow-gray-200 hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>Confirm & Place Order</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
