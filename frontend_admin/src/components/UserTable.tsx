import { MoreVertical } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { deleteUser } from "../utils/functions.ts";

const selectedUsers: Record<number, boolean> = {};

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created: string;
  role: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const handleMenuClick = (userId: number) => {
    setOpenMenu(openMenu === userId ? null : userId);
  };

  const handleMenuClose = () => setOpenMenu(null);

  return (
    <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <input type="checkbox" name="checkAll" id="checkAll" />
          </th>
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
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {users.map((user, idx) => (
          <tr key={user.id} className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="checkbox"
                name="checkUser"
                id={`checkUser-${user.id}`}
                checked={!!selectedUsers[user.id]}
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-25" value={user.username} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-20" value={user.first_name} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-20" value={user.last_name} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-50" value={user.email} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-25" value={user.password} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{user.created}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input type="text" className="w-15" value={user.role} />
            </td>
            <td className="px-4 py-2 whitespace-nowrap relative">
              <button
                onClick={() => handleMenuClick(user.id)}
                className="p-1 rounded hover:bg-gray-200"
                aria-label="Open actions menu"
              >
                <MoreVertical size={18} />
              </button>
              {openMenu === user.id && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                  onMouseLeave={handleMenuClose}
                >
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Edit
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
