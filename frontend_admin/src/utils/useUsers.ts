import { useState, type Dispatch, type SetStateAction } from "react";
import Cookies from "js-cookie";
import { myToast } from "./frontendService";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created: string;
  role: string;
}

export type UserReturn = {
  users: User[];
  refresh: () => void;
  setUsers: Dispatch<SetStateAction<User[]>>;
  deleteUser: (id: number) => void;
  updateUser: (id: number) => void;
};

export function useUsers(): UserReturn {
  const [users, setUsers] = useState<User[]>([]);

  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://45.133.75.67:5002/api/getAllUsers", {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.result);
        myToast("Users fetched successfully", "success");
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = (id: number) => {
    fetch("http://45.133.75.67:5002/api/deleteUser", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          myToast("User deleted successfully", "success");
        } else {
          alert("Failed to delete user");
        }
      })
      .catch((error) => {
        console.log("Error deleting user: ", error);
      });
  };

  const updateUserFunc = async (userID: number) => {
    console.log("UpdateFunc" + userID);

    // Validate that required DOM elements exist
    const usernameEl = document.getElementById(
      `username-${userID}`
    ) as HTMLInputElement;
    const firstNameEl = document.getElementById(
      `first_name-${userID}`
    ) as HTMLInputElement;
    const lastNameEl = document.getElementById(
      `last_name-${userID}`
    ) as HTMLInputElement;
    const emailEl = document.getElementById(
      `email-${userID}`
    ) as HTMLInputElement;
    const passwordEl = document.getElementById(
      `password-${userID}`
    ) as HTMLInputElement;

    if (!usernameEl || !firstNameEl || !lastNameEl || !emailEl) {
      console.error("Required form elements not found");
      alert("Form elements not found");
      return;
    }

    const userData = {
      id: userID,
      username: usernameEl.value,
      first_name: firstNameEl.value,
      last_name: lastNameEl.value,
      email: emailEl.value,
      password: passwordEl?.value || "", // password might be optional
    };

    console.log("Sending user data:", userData);

    try {
      const response = await fetch("http://45.133.75.67:5002/api/updateUser", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        console.log("User updated successfully");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userID ? { ...user, ...userData } : user
          )
        );

        myToast("User updated successfully", "success");
      } else {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        alert(`Failed to update user: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Network error updating user:", error);
      alert("Network error occurred while updating user");
    }
  };

  return {
    users: users,
    setUsers: setUsers,
    refresh: () => fetchUsers(),
    deleteUser: (id: number) => deleteUser(id),
    updateUser: (id: number) => updateUserFunc(id),
  };
}
