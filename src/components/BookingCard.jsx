import React, { useState } from "react";
import SlotPreviewModal from "./SlotPreviewModal";
import { cancelBooking, updateBooking } from "../services/bookingAPI";

export default function BookingCard({ booking, token, refreshBookings }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCancel = async () => {
    try {
      await cancelBooking(booking._id, token);
      refreshBookings();
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const handlePostpone = async (newDate, newTime) => {
    try {
      await updateBooking(booking._id, { date: newDate, time: newTime }, token);
      refreshBookings();
    } catch (err) {
      console.error("Postpone failed:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow mb-4 transition-colors">
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{booking.service.name}</h4>
      <p className="text-gray-700 dark:text-gray-200">Stylist: {booking.stylist?.name || "Any"}</p>
      <p className="text-gray-700 dark:text-gray-200">Date: {booking.date}</p>
      <p className="text-gray-700 dark:text-gray-200">Time: {booking.time}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => setPreviewOpen(true)}
          className="px-3 py-1 bg-purple-600 dark:bg-purple-700 text-white rounded hover:bg-purple-700 dark:hover:bg-purple-800"
        >
          Edit / Postpone
        </button>
        <button
          onClick={handleCancel}
          className="px-3 py-1 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-800"
        >
          Cancel
        </button>
      </div>

      <SlotPreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        slot={{ date: booking.date, time: booking.time }}
        service={booking.service}
        stylist={booking.stylist}
        suggestedAddOns={booking.addOns}
        onConfirm={(updated) => {
          handlePostpone(updated.date, updated.time);
          setPreviewOpen(false);
        }}
      />
    </div>
  );
}
