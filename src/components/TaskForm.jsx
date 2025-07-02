import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask, darkMode }) {
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

  const inputStyles = `flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
    darkMode
      ? "bg-gray-800 text-white border-white placeholder-gray-400"
      : "bg-white text-black border-gray-300 placeholder-gray-500"
  }`;

  const buttonStyles = `flex items-center gap-2 mt-4 md:mt-0 px-4 py-2 rounded-lg border transition ${
    darkMode
      ? "bg-gray-800 text-white border-white hover:bg-gray-700"
      : "bg-white text-black border-black hover:bg-gray-100"
  }`;

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
        className={inputStyles}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={inputStyles}
      />
      <button type="submit" className={buttonStyles}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
