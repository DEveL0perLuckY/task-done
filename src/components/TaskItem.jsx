import React from "react";
import { Pencil, Trash2, CheckSquare, Square } from "lucide-react";

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  darkMode,
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 mb-4 rounded-xl shadow transition ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${task.completed ? "opacity-70" : ""}`}
    >
      <div className="flex flex-1 items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-1 shrink-0 transition ${
            darkMode ? "text-indigo-400" : "text-indigo-500"
          }`}
        >
          {task.completed ? (
            <CheckSquare
              size={24}
              className={darkMode ? "text-white" : "text-black"}
            />
          ) : (
            <Square
              size={24}
              className={darkMode ? "text-white" : "text-black"}
            />
          )}
        </button>

        <div className="flex-1">
          <h3
            className={`text-lg font-medium break-words ${
              task.completed
                ? darkMode
                  ? "line-through text-gray-500"
                  : "line-through text-gray-500"
                : darkMode
                ? "text-white"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Right: Actions & Timestamp */}
      <div className="flex sm:flex-col sm:items-end justify-between sm:justify-between items-start sm:mt-0 mt-2 gap-1">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className={`p-2 rounded-lg border transition ${
              darkMode
                ? "bg-gray-700 text-white border-white hover:bg-gray-600"
                : "bg-white text-black border-black hover:bg-gray-100"
            }`}
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className={`p-2 rounded-lg border transition ${
              darkMode
                ? "bg-gray-700 text-white border-white hover:bg-gray-600"
                : "bg-white text-black border-black hover:bg-gray-100"
            }`}
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div
          className={`text-xs mt-1 sm:mt-2 sm:text-right ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Created: {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
