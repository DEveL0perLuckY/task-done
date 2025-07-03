// Fully Updated Task Tracker App with consistent Dark Mode support
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import {
  loadTasks,
  saveTasks,
  loadUsername,
  saveUsername,
  loadDarkMode,
  saveDarkMode,
} from "./utils/localStorage";
import { LogOut, Sun, Moon } from "lucide-react";

function App() {
  const [username, setUsername] = useState(loadUsername());
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(loadDarkMode());

  useEffect(() => saveTasks(tasks), [tasks]);

  function handleLogin(name) {
    setUsername(name);
  }
  function handleLogout() {
    saveUsername("");
    setUsername("");
  }

  function addOrUpdateTask(data) {
    if (editingTask) {
      setTasks((ts) =>
        ts.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
        tags: data.tags,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((ts) => [newTask, ...ts]);
    }
  }

  function handleToggle(id) {
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleEdit(task) {
    setEditingTask(task);
  }
  function handleDelete(id) {
    if (window.confirm("Delete this task?"))
      setTasks((ts) => ts.filter((t) => t.id !== id));
  }

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const visibleTasks = tasks.filter((t) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? t.completed
        : !t.completed;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!username) return <Login onLogin={handleLogin} darkMode={darkMode} />;

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">
          {username}'s Tasks
        </h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search tasks..."
          className={`w-full md:w-96 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
            darkMode
              ? "bg-gray-800 text-white border-white hover:bg-gray-700"
              : "bg-white text-black border-black hover:bg-gray-100"
          }`}
        />

        <div className="flex gap-3 self-center md:self-auto">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              saveDarkMode(!darkMode);
            }}
            className={`p-2 border rounded-lg transition ${
              darkMode
                ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                : "bg-white text-black border-black hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition ${
              darkMode
                ? "bg-gray-800 text-white border-white hover:bg-gray-700"
                : "bg-white text-black border-black hover:bg-gray-100"
            }`}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <TaskForm
        onSubmit={addOrUpdateTask}
        editingTask={editingTask}
        darkMode={darkMode}
      />
      <TaskFilter
        filter={filter}
        counts={counts}
        onChange={setFilter}
        darkMode={darkMode}
      />
      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
