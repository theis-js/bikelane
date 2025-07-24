import React from "react";
import Cookies from "js-cookie";
import { logout, loginUser } from "../utils/userHandler";
type LoginCardProps = {
  onClose: () => void;
  changeAuth?: (isLoggedIn: boolean) => void;
};

const LoginCard: React.FC<LoginCardProps> = ({ onClose, changeAuth }) => {
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
            loginUser(username as string, password as string);
            if (changeAuth) {
              changeAuth(true);
              onClose();
            }
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
        {Cookies.get("token") ? (
          <button
            className="w-full bg-black dark:bg-gray-800 text-white font-semibold py-2 rounded-md hover:bg-green-400 dark:hover:bg-green-600 transition"
            onClick={() => {
              logout();
              if (changeAuth) {
                changeAuth(false);
                onClose();
              }
            }}
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
