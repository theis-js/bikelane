import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";
import UserTable from "./components/UserTable";
import { useEffect } from "react";
import { loadTheme } from "./utils/frontendService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const users = useUsers();

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Layout>
      <UserTable users={users} />
      <ToastContainer />
    </Layout>
  );
}

export default App;
