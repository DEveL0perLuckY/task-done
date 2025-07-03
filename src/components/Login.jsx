import React, { useState } from "react";
import { saveUsername } from "../utils/localStorage";

export default function Login({ onLogin, darkMode }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    saveUsername(username);
    onLogin(username);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`p-8 rounded-2xl shadow-lg w-full max-w-md transition-all ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              darkMode
                ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                : "bg-white border border-gray-300 text-black"
            }`}
          />
          <button
            type="submit"
            className={`w-full py-3 font-medium rounded-lg transition ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
