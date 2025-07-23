import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";
import UserTable from "./components/UserTable";

function App() {
  const users = useUsers();

  return (
    <Layout>
      <UserTable users={users} />
    </Layout>
  );
}

export default App;
