import "./App.css";
import Layout from "./layout/Layout";
import UserTable from "./components/UserTable";
import LoginCard from "./components/LoginCard";
import { useEffect, useState } from "react";
import { loadTheme } from "./utils/frontendService";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Layout>
      {isAuthenticated ? (
        <UserTable isAuthenticated={isAuthenticated} />
      ) : (
        <>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
              Please log in to view the user table.
            </h2>
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
          {showLogin && (
            <LoginCard
              onClose={() => setShowLogin(false)}
              changeAuth={(loggedIn) => setIsAuthenticated(loggedIn)}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default App;
