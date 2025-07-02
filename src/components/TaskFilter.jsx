import React from "react";

export default function TaskFilter({ filter, counts, onChange, darkMode }) {
  const types = ["all", "completed", "pending"];

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {types.map((type) => {
        const isActive = filter === type;

        const baseStyles = `px-4 py-2 rounded-lg font-medium capitalize transition border`;

        const lightStyles = isActive
          ? "bg-white text-black border-black"
          : "bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300";

        const darkStyles = isActive
          ? "bg-gray-100 text-black border-white"
          : "bg-gray-700 text-gray-300 border-transparent hover:bg-gray-600";

        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`${baseStyles} ${darkMode ? darkStyles : lightStyles}`}
          >
            {`${type} (${counts[type]})`}
          </button>
        );
      })}
    </div>
  );
}
