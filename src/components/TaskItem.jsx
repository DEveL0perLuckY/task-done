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
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-start gap-3">
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
                  ? "line-through text-gray-500"
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

        {/* Tags */}
        {task.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 ml-7">
            {task.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* New Column: Priority + Due Date */}
      <div className="flex flex-col items-start sm:items-center gap-2 min-w-[120px] mt-2 sm:mt-0">
        {task.priority && (
          <span
            className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
              task.priority === "high"
                ? "bg-red-200 text-red-700"
                : task.priority === "low"
                ? "bg-green-200 text-green-700"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {task.priority}
          </span>
        )}

        {task.dueDate && (
          <span className="text-xs text-gray-500">
            📅 Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Right: Actions + Timestamp */}
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
