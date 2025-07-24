import Cookies from "js-cookie";
import { toast, type ToastOptions } from "react-toastify";

export const greeting = () => {
  return Cookies.get("name") ?? "Login";
};

export const loadTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // Switch to dark theme
    console.log("dark");
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    Cookies.set("theme", "dark", { expires: 365 });
  } else {
    // Switch to light theme
    console.log("light");
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    Cookies.set("theme", "light", { expires: 365 });
  }
};

export const changeTheme = () => {
  if (Cookies.get("theme") === "dark") {
    // Switch to light theme
    console.log("light");
    removeDarkTheme();
  } else if (Cookies.get("theme") === "light") {
    // Switch to dark theme
    console.log("dark");
    setDarkTheme();
  } else {
    console.error("Theme not set or recognized");
  }
};

export const removeDarkTheme = () => {
  console.log("Removing dark theme");
  document.documentElement.classList.remove("dark");
  document.body.classList.remove("dark");
  Cookies.set("theme", "light", { expires: 365 });
};

export const setDarkTheme = () => {
  console.log("Setting dark theme");
  document.documentElement.classList.add("dark");
  document.body.classList.add("dark");
  Cookies.set("theme", "dark", { expires: 365 });
};

export type ToastType = "success" | "error" | "info" | "warning";

export const myToast = (message: string, msgType: ToastType) => {
  let config: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  toast[msgType](message, config);
};
