import React from "react";

export default function AddOnSuggest({ service, onSelect }) {
  // Example logic: for certain services suggest add-ons. In a real app, this comes from API.
  const suggestions = {
    "Manicure": [{ name: "Pedicure", price: 500 }, { name: "Gel top", price: 300 }],
    "Dreadlocks": [{ name: "Maintenance", price: 800 }],
    "Full Body Massage": [{ name: "Aromatherapy", price: 700 }]
  };

  const list = suggestions[service?.name] || [];

  if (list.length === 0) return null;

  return (
    <div className="mt-3">
      <div className="text-sm font-medium">Suggested add-ons</div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {list.map(a => (
          <button key={a.name} onClick={() => onSelect(a)} className="text-sm bg-gray-100 px-3 py-1 rounded">
            {a.name} (+KSh {a.price})
          </button>
        ))}
      </div>
    </div>
  );
}
