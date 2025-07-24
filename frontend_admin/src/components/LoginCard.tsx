import React from "react";
import Cookies from "js-cookie";
import { logout } from "../utils/functions";
type LoginCardProps = {
  onClose: () => void;
};

const LoginCard: React.FC<LoginCardProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/35">
      <div className="max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 relative">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-black dark:text-white text-2xl font-bold mb-6 text-center">
          Login
        </h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const username = formData.get("username");
            const password = formData.get("password");
            // Example: send login request
            await fetch("http://localhost:5002/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
            })
              .then(async (response) => {
                if (response.ok) {
                  const data = await response.json();
                  Cookies.set("token", data.token, { expires: 7 });
                  onClose();
                  Cookies.set("name", data.user.first_name, { expires: 7 });
                  await fetch("http://localhost:5002/api/getAllUsers", {
                    method: "GET",
                    headers: {
                      Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((users) => {
                      localStorage.setItem("users", JSON.stringify(users));
                    });
                  document.location.reload();
                } else if (response.status === 401) {
                  alert("Invalid credentials");
                } else if (response.status === 403) {
                  alert("You are not an Admin!");
                }
              })
              .catch((error) => {
                console.log("Login failed: ", error);
              });
          }}
          className="space-y-4 text-black dark:text-white"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              id="username"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              id="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {Cookies.get("name") ? (
            <p></p>
          ) : (
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            />
          )}
        </form>
        {Cookies.get("name") ? (
          <button
            className="w-full bg-black dark:bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-green-400 dark:hover:bg-green-600 transition"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginCard;
