import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        {/* outer gradient circle */}
        <div
          className="w-16 h-16 rounded-full animate-spin 
          bg-gradient-to-tr from-black via-gray-500 to-gray-300"
        ></div>

        {/* inner white circle (cutout effect) */}
        <div className="absolute top-1 left-1 w-14 h-14 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
