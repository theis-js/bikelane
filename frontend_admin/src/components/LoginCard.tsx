import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../utils/context";
import { myToast } from "../utils/frontendService";

interface LoginCardProps {
  onClose: () => void;
  changeAuth?: (loggedIn: boolean) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onClose, changeAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://45.133.75.67:5002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        Cookies.set("token", data.token);
        Cookies.set("firstName", data.user.first_name);
        setIsAuthenticated(true);
        if (changeAuth) changeAuth(true);
        onClose();
        myToast("Login successful!", "success");
      } else {
        myToast("Login failed!", "error");
        setError(data.message || "Login fehlgeschlagen");
      }
    } catch (err) {
      setError("Netzwerkfehler");
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-sm pointer-events-auto"></div>
      {/* Card oben am Dashboard */}
      <form
        onSubmit={handleLogin}
        className="absolute left-1/2 -translate-x-1/2 top-10 z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl px-8 py-10 flex flex-col gap-6 min-w-[340px] max-w-[90vw] border border-blue-200 dark:border-gray-800 pointer-events-auto"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-200 mb-2">
          Login
        </h2>
        {error && (
          <div className="text-red-600 text-center font-semibold">{error}</div>
        )}
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-blue-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-blue-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          required
        />
        <div className="flex gap-3 mt-2 justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
