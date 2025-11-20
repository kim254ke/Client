import { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../services/bookingAPI";

export default function Calendar({ userId, userToken }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings(userId, userToken);
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (userId) fetch(); }, [userId, userToken]);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await cancelBooking(id, userToken);
      fetch();
    } catch (err) {
      alert("Failed to cancel");
    }
  };

  if (loading) return <div className="p-4">Loading bookings...</div>;
  if (!bookings || bookings.length === 0) return <div className="p-4">You have no bookings yet.</div>;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded shadow-md transition-colors duration-300">
    <h3 className="text-xl font-bold mb-4">Your Bookings</h3>
    <ul className="space-y-3">
      {bookings.map(b => (
        <li key={b._id} className="flex items-center justify-between border border-gray-300 dark:border-gray-600 p-3 rounded transition-colors duration-300">
          <div>
            <div className="font-medium">{b.service?.name} • {b.date} at {b.time}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stylist: {b.stylist?.name || "Any"}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Status: {b.status}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <button className="text-red-600 dark:text-red-400 hover:underline" onClick={() => handleCancel(b._id)}>Cancel</button>
          </div>
        </li>
      ))}
    </ul>
  </div>  
  );
}
