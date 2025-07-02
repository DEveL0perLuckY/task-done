import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="flex items-center gap-2 mt-4 md:mt-0 px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
