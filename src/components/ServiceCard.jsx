import { useNavigate } from "react-router-dom";

export default function ServiceCard({ service }) {
  const navigate = useNavigate();

  const categoryCopy = {
    Hair: "Hi Girly! Want your locks turning heads today? 💁‍♀️",
    Nails: "Glow up! Your nails deserve the spotlight ✨",
    Massage: "Relax, unwind, and feel fabulous 💆‍♀️",
    "Skin & Makeup": "Glow, babe! Your skin deserves some magic ✨",
  };

  const handleSelect = () => {
    navigate("/booking", { state: { selectedService: service } });
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* ...sparkles... */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-gradient-slow">
            {service.name}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">{service.duration}m</div>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {categoryCopy[service.category] || service.category}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xl font-bold text-purple-600 dark:text-pink-400">KSh {service.price}</div>
          <button
            onClick={handleSelect} // 👈 navigate to booking page
            className="text-sm bg-purple-600 dark:bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-purple-700 dark:hover:bg-pink-600 transition-all"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
