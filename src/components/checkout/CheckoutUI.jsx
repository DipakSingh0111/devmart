import React from "react";

// Reusable Input Field
export const Field = ({ label, icon, error, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full ${icon ? "pl-9" : "pl-4"} pr-4 py-3 rounded-xl border text-sm font-medium text-gray-800 bg-white outline-none transition-all duration-200
          ${error
            ? "border-red-300 focus:border-red-500 bg-red-50"
            : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          }`}
      />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Payment Option Card
export const PayOption = ({ value, selected, onChange, icon, title, subtitle }) => (
  <label
    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
      ${selected === value
        ? "border-indigo-500 bg-indigo-50"
        : "border-gray-100 bg-white hover:border-gray-300"
      }`}
  >
    <input
      type="radio"
      name="payment"
      value={value}
      checked={selected === value}
      onChange={(e) => onChange(e.target.value)}
      className="hidden"
    />
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${selected === value ? "bg-indigo-100" : "bg-gray-50"}`}>
      {icon}
    </div>
    <div className="flex-1">
      <p className={`text-sm font-bold ${selected === value ? "text-indigo-700" : "text-gray-700"}`}>
        {title}
      </p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
    </div>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${selected === value ? "border-indigo-600" : "border-gray-300"}`}>
      {selected === value && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
    </div>
  </label>
);
