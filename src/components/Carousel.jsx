import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const images = [
      {
        title: "Summer Collection 2026",
        desc: "Upgrade your style with trending outfits.",
        img: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Streetwear Vibes",
        desc: "Comfort meets fashion in every step.",
        img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Minimal Lifestyle",
        desc: "Clean, modern and powerful look.",
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
      },
      {
        title: "Premium Accessories",
        desc: "Small details that make big impact.",
        img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
      },
    ];

    setSlides(images);
  }, []);

  // Auto Slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [slides, current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] overflow-hidden">
      {/* IMAGE */}
      <img
        src={slides[current].img}
        alt="slider"
        className="w-full h-full object-cover transition-all duration-700 scale-105"
      />

      {/* DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16">
        <div className="text-white max-w-xl space-y-5 animate-fadeIn">
          <span
            className="inline-block px-4 py-1 text-xs rounded-full 
          bg-gradient-to-r from-pink-500 to-purple-500"
          >
            Trending
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {slides[current].title}
          </h1>

          <p className="text-gray-300 text-sm md:text-lg">
            {slides[current].desc}
          </p>

          <div className="flex gap-4 pt-2">
            <button
              className="px-6 py-3 rounded-full text-sm font-semibold 
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Shop Now
            </button>

            <button
              className="px-6 py-3 rounded-full text-sm border border-white/40 
            hover:bg-white/10 transition"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition"
      >
        <FaArrowLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition"
      >
        <FaArrowRight className="text-white" />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 
            ${
              current === index
                ? "w-6 bg-gradient-to-r from-pink-500 to-purple-500"
                : "w-2 bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
