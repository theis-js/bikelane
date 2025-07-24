import Cookies from "js-cookie";
import { myToast } from "./frontendService";

export const loginUser = (username: string, password: string) => {
  fetch(`http://45.133.75.67:5002/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", data.token, { expires: 7 });
        Cookies.set("name", data.user.first_name, { expires: 7 });
        await fetch("http://45.133.75.67:5002/api/getAllUsers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
          .then((res) => res.json())
          .then((users) => {
            localStorage.setItem("users", JSON.stringify(users));
          });
        myToast("Logged in successfully!", "success");
      } else if (response.status === 401) {
        myToast("Invalid username or password!", "error");
      } else if (response.status === 403) {
        myToast("You are not an Admin!", "error");
      }
    })
    .catch((error) => {
      console.log("Login failed: ", error);
    });
};

export const logout = () => {
  Cookies.remove("name");
  Cookies.remove("token");
  localStorage.removeItem("users");
  myToast("Logged out successfully!", "success");
};

export const deleteUser = (id: number) => {
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
        replaceUsers("User deleted successfully!");
      } else {
        myToast("Failed to delete user", "error");
      }
    })
    .catch((error) => {
      console.log("Error deleting user: ", error);
    });
};

export const replaceUsers = async (alertMessage: string) => {
  localStorage.removeItem("users");
  await fetch("http://45.133.75.67:5002/api/getAllUsers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((res) => res.json())
    .then((users) => {
      localStorage.setItem("users", JSON.stringify(users));
      myToast(alertMessage, "success");
    });
};

export const updateUserFunc = async (userID: number) => {
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
    myToast("Form elements not found", "error");
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
      replaceUsers("User updated successfully!");
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
