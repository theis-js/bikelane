import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";

function App() {
  const users = useUsers();

  return (
    <Layout>
      <table className="table-auto" style={{ tableLayout: "auto" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, idx: number) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default App;
