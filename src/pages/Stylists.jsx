import { useEffect, useState } from "react";
import StylistCard from "../components/StylistCard";
import { getStylists } from "../services/stylistAPI";

export default function Stylists() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      const data = await getStylists();
      setStylists(data);
    };
    fetchStylists();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Gradient shimmer text intro */}
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text animate-gradient-slow bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        Meet Our Fabulous Stylists! 💖
      </h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300 opacity-90">
        Hand-picked experts ready to glam you up! Choose your stylist and let the magic happen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stylists.map((stylist, idx) => (
          <div
            key={stylist._id}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 animate-pop"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <StylistCard stylist={stylist} />
            {/* Availability dot */}
            <div className="mt-4 flex items-center gap-2">
              {(stylist.availability || []).length > 0 && (
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" title="Available"></span>
              )}
              <span className="text-sm text-gray-500 dark:text-gray-300">Available today</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 10s ease infinite;
        }

        @keyframes pop {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-pop {
          animation: pop 0.6s ease forwards;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
