import React, { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../utils/context";
import { myToast } from "../utils/frontendService";

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const firstName = Cookies.get("firstName");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("firstName");
    setIsAuthenticated(false);
    myToast("Logged out successfully!", "info");
  };

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-lg">
      <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-200 tracking-wide">
        🚲 Bikelane Dashboard
      </h1>
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <>
            <span className="text-lg font-semibold text-blue-700 dark:text-blue-200">
              Hello, {firstName || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
