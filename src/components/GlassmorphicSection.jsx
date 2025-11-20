// src/components/GlassmorphicSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { HandThumbUpIcon, FaceSmileIcon, ScissorsIcon } from "@heroicons/react/24/solid";

const servicesData = [
  { icon: HandThumbUpIcon, name: "Manicure", desc: "Hi girly! Want your nails glowing like never before?" },
  { icon: FaceSmileIcon, name: "Massage", desc: "Relax & unwind – pamper your body and soul." },
  { icon: ScissorsIcon, name: "Dreadlocks", desc: "Flaunt your unique style with perfect dreadlocks." },
];

const GlassmorphicSection = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  const handleExploreStylists = () => {
    navigate("/stylists");
  };

  const handleServiceCardClick = (service) => {
    navigate("/booking", { state: { selectedService: service } });
  };

  return (
    <section className="relative flex justify-center items-center py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-5xl text-black dark:text-white transition-colors duration-500 flex flex-col md:flex-row gap-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 via-pink-400 to-blue-400 opacity-20 animate-gradient-slow rounded-3xl pointer-events-none"></div>

        {/* Left side */}
        <div className="flex flex-col justify-center gap-4 relative z-10">
          <h2 className="text-4xl font-extrabold tracking-tight">Discover Your Next Style</h2>
          <p className="text-gray-800 dark:text-gray-200 max-w-md">
            Book your favorite services, meet top stylists, and enjoy a premium beauty experience. Everything adapts seamlessly to dark mode.
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleBookNow}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Book Now
            </button>
            <button
              onClick={handleExploreStylists}
              className="px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-xl shadow transition-all duration-300"
            >
              Explore Stylists
            </button>
          </div>
        </div>

        {/* Right side: service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                onClick={() => handleServiceCardClick(service)}
                className="cursor-pointer bg-white/30 dark:bg-gray-700/30 backdrop-blur-md rounded-xl p-5 text-center text-gray-900 dark:text-gray-100 shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300"
              >
                <Icon className="w-10 h-10 mx-auto text-purple-600 mb-2" />
                <div className="mt-2 font-semibold">{service.name}</div>
                <p className="mt-1 text-xs">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

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
      `}</style>
    </section>
  );
};

export default GlassmorphicSection;
