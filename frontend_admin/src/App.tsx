import "./App.css";
import Layout from "./layout/Layout";
import UserTable from "./components/UserTable";
import LoginCard from "./components/LoginCard";
import { useEffect, useState } from "react";
import { loadTheme } from "./utils/frontendService";
import { myToast } from "./utils/frontendService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    loadTheme();
    if (Cookies.get("token")) {
      myToast("User list updated", "success");
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );
  const [showLogin, setShowLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Layout>
        {isAuthenticated ? (
          <UserTable isAuthenticated={isAuthenticated} />
        ) : (
          <>
            <LoginCard
              onClose={() => setShowLogin(false)}
              changeAuth={(loggedIn) => setIsAuthenticated(loggedIn)}
            />
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                Please log in to view the user table.
              </h2>
            </div>
          </>
        )}
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
