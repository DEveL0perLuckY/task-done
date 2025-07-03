import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editingTask, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority || "medium");
      setDueDate(editingTask.dueDate || "");
      setTags(editingTask.tags?.join(", ") || "");
    }
  }, [editingTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;
    onSubmit({
      title,
      description,
      priority,
      dueDate,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setTags("");
  }

  const inputStyles = `flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
    darkMode
      ? "bg-gray-800 text-white border-white placeholder-gray-400"
      : "bg-white text-black border-gray-300 placeholder-gray-500"
  }`;

  const labelStyles = `text-sm font-medium mb-1 ${
    darkMode ? "text-white" : "text-gray-800"
  }`;

  const buttonStyles = `flex items-center gap-2 mt-4 md:mt-0 px-4 py-2 rounded-lg border transition ${
    darkMode
      ? "bg-gray-800 text-white border-white hover:bg-gray-700"
      : "bg-white text-black border-black hover:bg-gray-100"
  }`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-4 flex">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputStyles}
          />
        </div>
        <div className="col-span-5 col-start-1 row-start-2 flex">
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div className="col-start-5 row-start-1 flex">
          <button type="submit" className={buttonStyles}>
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label className={labelStyles}>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={inputStyles}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label className={labelStyles}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputStyles}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label className={labelStyles}>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. Work, Urgent"
            className={inputStyles}
          />
        </div>
      </div>
    </form>
  );
}
