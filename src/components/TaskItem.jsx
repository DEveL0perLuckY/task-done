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
      className={`flex flex-col gap-4 p-4 mb-4 rounded-xl shadow transition ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } ${task.completed ? "opacity-70" : ""}`}
    >
      <div className="flex gap-3 items-start">
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

        <div className="flex-1 min-w-0">
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
              className={`text-sm break-words ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-7">
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


      <div className="flex flex-wrap sm:flex-nowrap justify-between items-start sm:items-center gap-4 mt-2 ml-7 sm:ml-0">
        <div className="flex flex-col sm:items-center gap-1 min-w-[120px]">
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

        <div className="flex flex-col gap-1 sm:items-end sm:text-right text-left">
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
          <span
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Created: {new Date(task.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
