import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";
import UserTable from "./components/UserTable";
import { useEffect } from "react";
import { loadTheme } from "./utils/functions";
import { replaceUsers } from "./utils/functions";

function App() {
  const users = useUsers();

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Layout>
      <UserTable users={users} />
    </Layout>
  );
}

export default App;
