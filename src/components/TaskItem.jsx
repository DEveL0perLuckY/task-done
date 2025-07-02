import React from "react";
import { Pencil, Trash2, CheckSquare, Square } from "lucide-react";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 mb-4 bg-white rounded-xl shadow ${
        task.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-1 items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="text-indigo-500 mt-1 shrink-0"
        >
          {task.completed ? (
            <CheckSquare size={24} className="text-black" />
          ) : (
            <Square size={24} className="text-black" />
          )}
        </button>
        <div className="flex-1">
          <h3
            className={`text-lg font-medium break-words ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
        </div>
      </div>

      {/* Right: Actions & Timestamp */}
      <div className="flex sm:flex-col sm:items-end justify-between sm:justify-between items-start sm:mt-0 mt-2 gap-1">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-1 sm:mt-2 sm:text-right">
          Created: {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
