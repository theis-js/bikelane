import "./App.css";
import Layout from "./layout/Layout";
import UserTable from "./components/UserTable";
import { useContext, useEffect } from "react";
import { loadTheme } from "./utils/frontendService";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./utils/context";

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  const auth = useContext(AuthContext);

  return (
    <Layout>
      {auth ? (
        <UserTable />
      ) : (
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Please log in to view the user table.
          </h2>
        </div>
      )}
    </Layout>
  );
}

export default App;
