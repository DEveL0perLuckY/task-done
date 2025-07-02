import React from "react";

export default function TaskFilter({ filter, counts, onChange }) {
  const types = ["all", "completed", "pending"];
  return (
    <div className="flex gap-4 mb-6">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-lg font-medium capitalize transition border ${
            filter === type
              ? "bg-white text-black border-black"
              : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300"
          }`}
        >
          {`${type} (${counts[type]})`}
        </button>
      ))}
    </div>
  );
}
