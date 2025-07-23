import Cookies from "js-cookie";

export const greeting = () => {
  return Cookies.get("name") ?? "Login";
};

export const logout = () => {
  Cookies.remove("name");
  Cookies.remove("token");
  localStorage.removeItem("users");
  window.location.reload();
};

export const deleteUser = (id: number) => {
  fetch("http://localhost:5002/api/deleteUser", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        localStorage.removeItem("users");
        document.location.reload();
      } else {
        alert("Failed to delete user");
      }
    })
    .catch((error) => {
      console.log("Error deleting user: ", error);
    });
};

export const fetchUsers = async () => {
  fetch("http://localhost:5002/api/getAllUsers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((res) => res.json())
    .then((users) => {
      localStorage.setItem("users", JSON.stringify(users));
    });
};
