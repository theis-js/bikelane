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