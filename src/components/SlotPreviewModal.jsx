import React from "react";

export default function SlotPreviewModal({ open, onClose, slot, selectedServices = [], onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Preview Your Booking</h2>

        <p className="mb-2 text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Date:</span> {slot.date}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          <span className="font-semibold">Time:</span> {slot.time}
        </p>

        {selectedServices.length > 0 ? (
          <div className="space-y-3">
            {selectedServices.map((s, idx) => (
              <div key={idx} className="border border-gray-300 dark:border-gray-600 p-3 rounded">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{s.name}</p>
                {s.stylistName && (
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Stylist:</span> {s.stylistName}
                  </p>
                )}
                {s.addOns?.length > 0 && (
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-semibold">Add-ons:</span> {s.addOns.map(a => a.name).join(", ")}
                  </p>
                )}
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-semibold">Price:</span> KSh {s.price + (s.addOns?.reduce((sum, a) => sum + a.price, 0) || 0)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-200">No services selected.</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
