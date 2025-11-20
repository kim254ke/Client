export default function Testimonials() {
    const items = [
      { name: "Faith", text: "Best mani ever — simple booking and lovely staff!" },
      { name: "Asha", text: "Booked a dreadlocks appointment — fast and professional." },
      { name: "Grace", text: "Love the real-time availability. No double-booking!" },
    ];
  
    return (
      <section className="mt-12 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-md py-8 rounded-lg border border-white/30 dark:border-gray-700/30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">What people say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((t, i) => (
              <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-4 rounded-lg shadow border border-white/30 dark:border-gray-700/30
                                      hover:bg-white/60 dark:hover:bg-gray-800/60 hover:border-white/40 dark:hover:border-gray-600/40
                                      transition-all duration-300 text-gray-900 dark:text-gray-100">
                <p className="text-sm text-gray-700 dark:text-gray-300">“{t.text}”</p>
                <div className="mt-3 font-semibold text-sm">{`— ${t.name}`}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  