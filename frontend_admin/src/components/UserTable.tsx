import { MoreVertical } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { deleteUser, updateUserFunc } from "../utils/functions.ts";

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
  const [userList, setUserList] = useState<User[]>(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleMenuClick = (userId: number) => {
    setOpenMenu(openMenu === userId ? null : userId);
  };

  const handleMenuClose = () => setOpenMenu(null);

  const handleInputChange = (id: number, field: keyof User, value: string) => {
    setUserList((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  return (
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
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {userList.map((user) => (
          <tr key={user.id} className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-20"
                id={`username-${user.id}`}
                value={user.username}
                onChange={(e) =>
                  handleInputChange(user.id, "username", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-20"
                id={`first_name-${user.id}`}
                value={user.first_name}
                onChange={(e) =>
                  handleInputChange(user.id, "first_name", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-20"
                id={`last_name-${user.id}`}
                value={user.last_name}
                onChange={(e) =>
                  handleInputChange(user.id, "last_name", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-60"
                id={`email-${user.id}`}
                value={user.email}
                onChange={(e) =>
                  handleInputChange(user.id, "email", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-25"
                id={`password-${user.id}`}
                value={user.password}
                onChange={(e) =>
                  handleInputChange(user.id, "password", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{user.created}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-15"
                value={user.role}
                onChange={(e) =>
                  handleInputChange(user.id, "role", e.target.value)
                }
              />
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
                  <button
                    onClick={() => updateUserFunc(user.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
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
