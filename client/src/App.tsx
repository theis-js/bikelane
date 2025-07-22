import "./App.css";
import Layout from "./layout/Layout";
import { useUsers } from "./utils/useUsers";

function App() {
  const users = useUsers();

  return (
    <Layout>
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              #
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              First name
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Last name
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Password
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Created
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {users.map((user: any, idx: number) => (
            <tr key={user.id} className="hover:bg-blue-50 transition">
              <td className="px-4 py-2 whitespace-nowrap">{idx + 1}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.username}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.first_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.last_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.password}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.created}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default App;
