import React, { useState } from "react";
import { saveUsername } from "../utils/localStorage";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    saveUsername(username);
    onLogin(username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
