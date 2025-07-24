import { MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
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
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 shadow rounded-lg overflow-hidden">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            #
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Username
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            First name
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Last name
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Email
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Password
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Created
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Role
          </th>
          <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white text-black dark:bg-gray-900 dark:text-white divide-y divide-gray-100 dark:divide-gray-800">
        {userList.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <input
                type="text"
                className="w-20 bg-transparent border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-300 text-black dark:text-white"
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
                className="w-20 bg-transparent border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-300 text-black dark:text-white"
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
                className="w-20 bg-transparent border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-300 text-black dark:text-white"
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
                className="w-60 bg-transparent border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-300 text-black dark:text-white"
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
                className="w-25 bg-transparent border-b border-gray-200 dark:border-gray-600 focus:outline-none focus:border-blue-400 dark:focus:border-blue-300 text-black dark:text-white"
                id={`password-${user.id}`}
                value={user.password}
                onChange={(e) =>
                  handleInputChange(user.id, "password", e.target.value)
                }
              />
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{user.created}</td>
            <td className="px-4 py-2 whitespace-nowrap">{user.role}</td>
            <td className="px-4 py-2 whitespace-nowrap relative">
              <button
                onClick={() => handleMenuClick(user.id)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Open actions menu"
              >
                <MoreVertical size={18} />
              </button>
              {openMenu === user.id && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-10"
                  onMouseLeave={handleMenuClose}
                >
                  <button
                    onClick={() => updateUserFunc(user.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
