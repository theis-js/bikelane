import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";
import UserTable from "./components/UserTable";
import { useEffect } from "react";
import { loadTheme } from "./utils/frontendService";
import { myToast } from "./utils/frontendService";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const users = useUsers();

  useEffect(() => {
    loadTheme();
    myToast("User list updated", "success");
  }, []);

  return (
    <Layout>
      <UserTable users={users} />
    </Layout>
  );
}

export default App;
