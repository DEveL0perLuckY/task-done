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
} from "./utils/localStorage";
import { LogOut } from "lucide-react";

function App() {
  const [username, setUsername] = useState(loadUsername());
  const [tasks, setTasks] = useState(loadTasks());
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

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
  const visibleTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) =>
          filter === "completed" ? t.completed : !t.completed
        );

  if (!username) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{username}'s Tasks</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-4 md:mt-0 px-4 py-2 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>
      <TaskForm onSubmit={addOrUpdateTask} editingTask={editingTask} />
      <TaskFilter filter={filter} counts={counts} onChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
