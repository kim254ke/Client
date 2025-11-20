import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import StylistCard from "../components/StylistCard";
import Testimonials from "../components/Testimonials";
import ChatWidget from "../components/ChatWidget";
import LoadingSpinner from "../components/LoadingSpinner";
import { getServices } from "../services/serviceAPI";
import { getStylists } from "../services/stylistAPI";

export default function Home() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCat, setFilterCat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const s = await getServices();
        setServices(s);
        const st = await getStylists();
        setStylists(st);
      } catch (err) {
        console.error("Home fetch error:", err);
        setError("Could not load content. Backend may be offline.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featured = services.slice(0, 6);
  const showServices = filterCat ? services.filter(s => s.category === filterCat) : featured;

  if (loading) return <LoadingSpinner fullScreen message="Loading your beauty sanctuary..." />;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="space-y-12">
      <Hero onSearchCategory={(cat) => setFilterCat(cat)} />

      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Services</h2>
          <div className="text-sm text-gray-600">Top picks for you</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {showServices.length === 0 ? (
            <p>No services found for "{filterCat}"</p>
          ) : (
            showServices.map(service => <ServiceCard key={service._id} service={service} />)
          )}
        </div>

        {filterCat && (
          <div className="mt-6 text-right">
            <button onClick={() => setFilterCat("")} className="text-purple-600">Clear filter</button>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Our Stylists</h2>
          <div className="text-sm text-gray-600">Book with your favourite</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {stylists.map(stylist => <StylistCard key={stylist._id} stylist={stylist} />)}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <Testimonials />
      </div>

      {/* Chat Widget - only on homepage */}
      <ChatWidget />
    </div>
  );
}