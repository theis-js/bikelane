import Cookies from "js-cookie";

export const greeting = () => {
  return Cookies.get("name") ?? "Login";
};

export const logout = () => {
  Cookies.remove("name");
  window.location.reload();
};
