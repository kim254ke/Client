import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../services/serviceAPI";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      {/* Gradient shimmer text intro */}
      <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text animate-gradient-slow bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        Hi Girly! ✨ Pick your perfect pampering service
      </h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300 opacity-90">
        From luscious locks to glowing nails and soothing massages, we’ve got you covered. Choose a service and let the pampering begin!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={service._id}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 animate-pop"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <ServiceCard service={service} />
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
      `}</style>
    </div>
  );
}
