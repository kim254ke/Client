import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getServices } from "../services/serviceAPI";
import { getStylists } from "../services/stylistAPI";
import { createBooking } from "../services/bookingAPI";
import SlotPreviewModal from "./SlotPreviewModal";
import AddOnSuggest from "./AddOnSuggest";

export default function BookingForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ===============================
  // Preselected service from ServiceCard
  // ===============================
  const preSelectedService = location.state?.selectedService;

  // ===============================
  // States
  // ===============================
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [category, setCategory] = useState("");
  const [serviceId, setServiceId] = useState(preSelectedService?._id || "");
  const [stylistId, setStylistId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Multiple selected services
  const [selectedServices, setSelectedServices] = useState([]);

  // ===============================
  // Fetch services & stylists
  // ===============================
  useEffect(() => {
    (async () => {
      try {
        const fetchedServices = await getServices();
        const fetchedStylists = await getStylists();
        setServices(fetchedServices);
        setStylists(fetchedStylists);
      } catch (err) {
        console.error("Error fetching services or stylists:", err);
      }
    })();
  }, []);

  const serviceObj = services.find(s => s._id === serviceId);
  const stylistObj = stylists.find(s => s._id === stylistId);

  // ===============================
  // Suggested add-ons logic
  // ===============================
  const suggestedAddOns = (() => {
    if (!serviceObj) return [];
    const map = {
      "Manicure": [{ name: "Pedicure", price: 500 }, { name: "Gel top", price: 300 }],
      "Dreadlocks": [{ name: "Maintenance", price: 800 }],
      "Full Body Massage": [{ name: "Aromatherapy", price: 700 }],
    };
    return map[serviceObj.name] || [];
  })();

  // ===============================
  // Handle Add-on selection
  // ===============================
  const handleAddOnSelect = (addon) => {
    setSelectedAddOns(prev => {
      if (prev.find(a => a.name === addon.name)) return prev.filter(a => a.name !== addon.name);
      return [...prev, addon];
    });
  };

  // ===============================
  // Open preview modal
  // ===============================
  const openPreview = (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("You must be logged in to book a service. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    if ((!serviceId && selectedServices.length === 0) || !date || !time) {
      setMessage("Please select at least one service, date, and time");
      return;
    }
    setMessage("");
    setPreviewOpen(true);
  };

  // ===============================
  // Confirm booking (for all services)
  // ===============================
  const handleConfirm = async () => {
    if (!token) return setMessage("You must be logged in");

    try {
      // Include current selection if not added
      const allServices = [...selectedServices];
      if (serviceId) {
        const s = services.find(s => s._id === serviceId);
        allServices.push({ ...s, addOns: selectedAddOns, stylistId, stylistName: stylistObj?.name });
      }

      // Create booking for each service
      for (let s of allServices) {
        await createBooking({
          serviceId: s._id,
          stylistId: s.stylistId || undefined,
          date,
          time,
          addOns: s.addOns,
        }, token);
      }

      setMessage("Booking confirmed! 🎉");

      // Reset form
      setServiceId("");
      setStylistId("");
      setDate("");
      setTime("");
      setCategory("");
      setSelectedAddOns([]);
      setSelectedServices([]);
      setPreviewOpen(false);

    } catch (err) {
      console.error(err);
      setMessage("Booking failed. Check login/token.");
    }
  };

  // ===============================
  // Add current service to selectedServices
  // ===============================
  const handleAddService = () => {
    if (!serviceId) return;

    const serviceToAdd = services.find(s => s._id === serviceId);
    if (!selectedServices.find(s => s._id === serviceToAdd._id)) {
      setSelectedServices(prev => [
        ...prev,
        { ...serviceToAdd, addOns: selectedAddOns, stylistId, stylistName: stylistObj?.name }
      ]);
    }

    // Reset current selection
    setServiceId("");
    setSelectedAddOns([]);
    setStylistId("");
  };

  // ===============================
  // JSX Render
  // ===============================
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded shadow-md transition-colors duration-300">
      <h3 className="text-xl font-bold mb-4">Book a Service</h3>

      <div className="space-y-3">
        {/* Category Filter */}
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setServiceId(""); }}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Filter by category (optional)</option>
          {[...new Set(services.map(s => s.category))].map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Service Select */}
        <select
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Select Service</option>
          {services.filter(s => !category || s.category === category)
            .map(s => <option key={s._id} value={s._id}>{s.name} — KSh {s.price}</option>)}
        </select>

        {/* Stylist Select */}
        <select
          value={stylistId}
          onChange={e => setStylistId(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="">Any stylist (optional)</option>
          {stylists.map(st => <option key={st._id} value={st._id}>{st.name}</option>)}
        </select>

        {/* Date & Time */}
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Add-ons */}
        <AddOnSuggest service={serviceObj} onSelect={handleAddOnSelect} />
        {selectedAddOns.length > 0 && (
          <div className="mt-2">
            <div className="text-sm font-medium">Selected add-ons</div>
            <div className="flex gap-2 mt-2">
              {selectedAddOns.map(a => (
                <span key={a.name} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm text-gray-900 dark:text-gray-100">
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add Service Button */}
        <button
          type="button"
          onClick={handleAddService}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Add Service
        </button>

        {/* List of selected services */}
        {selectedServices.length > 0 && (
          <div className="mt-3">
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">Selected Services:</div>
            <ul className="space-y-1">
              {selectedServices.map((s, idx) => (
                <li key={idx} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                  <span>
                    {s.name} {s.addOns?.length > 0 && `(Add-ons: ${s.addOns.map(a => a.name).join(", ")})`} 
                    {s.stylistName && ` – Stylist: ${s.stylistName}`}
                  </span>
                  <button
                    onClick={() => setSelectedServices(selectedServices.filter((_, i) => i !== idx))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={openPreview}
            className="bg-purple-600 dark:bg-purple-700 text-white dark:text-gray-100 px-4 py-2 rounded hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
          >
            Preview slot
          </button>
          <button
            onClick={() => { setServiceId(""); setCategory(""); setDate(""); setTime(""); setSelectedAddOns([]); setSelectedServices([]); }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>

        {message && <div className="text-sm mt-2 text-green-600 dark:text-green-400">{message}</div>}
      </div>

      <SlotPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        slot={{ date, time }}
        selectedServices={selectedServices}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
