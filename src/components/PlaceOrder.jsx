import React, { useState } from "react";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const getTotalCartAmount = () => 876; // demo (context removed)

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT - ADDRESS (RESTORED) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-xl font-semibold mb-6">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" placeholder="First Name" />
              <input className="input" placeholder="Last Name" />
            </div>

            <input className="input mt-4" placeholder="Email Address" />
            <input className="input mt-4" placeholder="Street Address" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input className="input" placeholder="City" />
              <input className="input" placeholder="State" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input className="input" placeholder="Zip Code" />
              <input className="input" placeholder="Country" />
            </div>

            <input className="input mt-4" placeholder="Phone Number" />

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-24">

            <h2 className="text-xl font-semibold mb-6">
              Cart Summary
            </h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalCartAmount()}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Delivery Fee</span>
              <span>${getTotalCartAmount() === 0 ? 0 : 10}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ${getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 10}
              </span>
            </div>

            {/* PAYMENT METHOD (UNDER SUMMARY) */}
            <h3 className="mt-6 font-semibold">Payment Method</h3>

            <div className="flex flex-col gap-3 mt-3">

              <label className="flex gap-2 items-center border p-2 rounded-lg">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className="flex gap-2 items-center border p-2 rounded-lg">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment
              </label>
            </div>

            {/* ONLINE METHODS */}
            {paymentMethod === "online" && (
              <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                <p className="font-medium mb-2">Select Method</p>

                <label className="block">
                  <input type="radio" name="online" /> UPI
                </label>
                <label className="block">
                  <input type="radio" name="online" /> Card
                </label>
                <label className="block">
                  <input type="radio" name="online" /> Net Banking
                </label>
              </div>
            )}

            {/* BUTTON */}
            {paymentMethod === "cod" ? (
              <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800">
                PLACE ORDER
              </button>
            ) : (
              <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
                PROCEED TO PAY
              </button>
            )}

          </div>
        </form>

        {/* INPUT STYLE */}
        <style>
          {`
            .input {
              width: 100%;
              padding: 12px 14px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              outline: none;
            }
            .input:focus {
              border-color: black;
            }
          `}
        </style>

      </div>
    </div>
  );
};

export default PlaceOrder;