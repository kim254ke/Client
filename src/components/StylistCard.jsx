export default function StylistCard({ stylist }) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300 overflow-hidden">
      
      {/* Floating sparkles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <span className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle" style={{ top: '15%', left: '25%' }}></span>
        <span className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full animate-sparkle" style={{ top: '50%', left: '70%' }}></span>
        <span className="absolute w-1 h-1 bg-purple-400 rounded-full animate-sparkle" style={{ top: '75%', left: '40%' }}></span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-purple-600 dark:text-pink-400 font-bold text-lg">
            {stylist.name?.split(" ").map(n => n[0]).slice(0,2).join("")}
          </div>
          <div>
            <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 animate-gradient-slow">
              {stylist.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">{(stylist.specialties || []).join(" · ")}</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="font-medium">Availability</div>
          <div className="mt-2 text-xs">
            {(stylist.availability || []).slice(0,2).map(a => (
              <div key={a.day} className="flex items-center justify-between">
                <span>{a.day}</span>
                <span className="text-gray-500 dark:text-gray-400">{(a.slots || []).slice(0,3).join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-5px) scale(1.2); }
        }
        .animate-sparkle {
          animation: sparkle 2s infinite ease-in-out;
        }

        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
