import React from "react";
import { Link } from "react-router-dom";

export default function Hero({ onSearchCategory }) {
  return (
    <section className="relative py-16">
      {/* Gradient background with animation */}
      <div className="absolute inset-0 animate-gradient-slow bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>

      {/* Optional floating sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Left text + category select + button */}
        <div className="flex-1 text-white drop-shadow-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            GlamHub — Book your beauty moment in seconds
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Smart service selection, live availability, and friendly stylists — all in one place.
          </p>

          <div className="flex gap-3 items-center">
            <select
              onChange={(e) => onSearchCategory(e.target.value)}
              className="p-3 rounded-md bg-white text-gray-800 flex-1"
              defaultValue=""
            >
              <option value="" disabled>Pick service category</option>
              <option value="Hair">Hair</option>
              <option value="Nails">Nails</option>
              <option value="Massage">Massage</option>
              <option value="Facial">Skin & Makeup</option>
            </select>

            <Link
              to="/booking"
              className="inline-block bg-white text-purple-600 px-5 py-3 rounded-md font-semibold shadow hover:shadow-lg transition"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Right magical card */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Link
            to="/services"
            className="w-72 h-72 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center shadow-2xl animate-float transform transition duration-500 hover:scale-105 hover:shadow-3xl cursor-pointer relative overflow-hidden"
          >
            {/* Shimmer gradient effect on text */}
            <h2 className="text-2xl font-bold mb-2 relative shimmer-text">
              Hi girly! 💖
            </h2>
            <p className="text-sm opacity-90">
              Want your nails glowing, hair flawless, or a relaxing massage? Tap here to explore services and see instant availability!
            </p>
          </Link>
        </div>
      </div>

      {/* Gradient & float animations + shimmer text */}
      <style>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 15s ease infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
          100% { transform: translateY(0px); opacity: 0.3; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Shimmer gradient animation for the text */
        .shimmer-text {
          background: linear-gradient(90deg, #fff 25%, #f3c4f3 50%, #fff 75%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
