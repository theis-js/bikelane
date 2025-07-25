import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Header />
      <ToastContainer />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-10 bg-white/80 dark:bg-gray-900/80 rounded-l-3xl shadow-2xl m-6 overflow-auto text-black dark:text-white">
          {children}
        </main>
      </div>
      <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-blue-100 dark:text-gray-400 py-6 px-5 text-center rounded-t-3xl shadow-xl mt-8 tracking-wide border-t border-blue-700 dark:border-gray-800">
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-lg tracking-widest drop-shadow">
            Bikelane Web
          </span>
          <span className="text-xs text-blue-200 dark:text-gray-500">
            &copy; {new Date().getFullYear()} —
            <a
              href="https://git.the1s.de/theis.gaedigk/bikelane"
              className="underline hover:text-blue-300 dark:hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gitea Repository
            </a>
            <span className="ml-1">| Fork me please 🚲</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
