import React from 'react';
import { useSelector } from 'react-redux';

const MyOrders = () => {
  const orders = useSelector((state) => state.orders?.orderHistory || []);
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];

  return (
    <div className="max-w-6xl mx-auto p-4 py-12 min-h-screen bg-[#F8FAFC] mt-10">
      {/* Header Section */}
      <div className="mb-10 px-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your shipments and track delivery status.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
              
              {/* Order Header: ID, Date & Total */}
              <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[11px] font-bold tracking-wider">#{order.id}</span>
                  <span className="text-sm font-semibold text-slate-500">{order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-400 italic">Total Amount:</span>
                  <span className="text-lg font-black text-slate-900">₹{order.total?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 lg:p-10">
                {/* CLEAN TRACKING SYSTEM */}
                <div className="mb-14 relative px-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative flex justify-between items-center">
                      <div className="absolute h-1 bg-slate-100 w-full top-1/2 -translate-y-1/2 z-0 rounded-full"></div>
                      <div 
                        className="absolute h-1 bg-indigo-600 top-1/2 -translate-y-1/2 z-0 rounded-full transition-all duration-700"
                        style={{ width: `${(steps.indexOf(order.status || "Placed") / (steps.length - 1)) * 100}%` }}
                      ></div>

                      {steps.map((step, idx) => {
                        const currentIdx = steps.indexOf(order.status || "Placed");
                        const isActive = idx <= currentIdx;
                        return (
                          <div key={step} className="relative z-10 flex flex-col items-center">
                            <div className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ${
                              isActive ? "bg-indigo-600 border-indigo-100 scale-110" : "bg-white border-slate-200"
                            }`}></div>
                            <p className={`absolute -bottom-7 text-[10px] font-bold uppercase tracking-tight whitespace-nowrap ${isActive ? "text-indigo-600" : "text-slate-400"}`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* UPDATED CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
                  
                  {/* Left: Product List (Improved) */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Shipment Items</h4>
                    <div className="space-y-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all group">
                          <img src={item.image} className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200" alt="" />
                          <div className="flex-1">
                            <h5 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.name}</h5>
                            <p className="text-xs text-slate-400 font-medium mt-1">Quantity: {item.qty || item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-extrabold text-slate-900">₹{(item.price * (item.qty || item.quantity)).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Improved Shipping Details UI */}
                  <div className="lg:col-span-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Delivery Information</h4>
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg">🏠</div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Shipping Address</p>
                          <h5 className="text-base font-bold text-slate-900 mt-1">{order.customer?.firstName} {order.customer?.lastName}</h5>
                          <p className="text-sm text-slate-500 leading-relaxed mt-1">
                            {order.customer?.street}, {order.customer?.city},<br/>
                            {order.customer?.state} - {order.customer?.zip}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Contact</p>
                          <p className="text-xs font-bold text-slate-700 mt-1">📞 {order.customer?.phone}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Payment</p>
                          <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-tighter">● {order.paymentMethod}</p>
                        </div>
                      </div>

                      <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                         <span>Download Invoice</span>
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
