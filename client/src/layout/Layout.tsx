import React from "react";
import Header from "../components/Header";
import userIcon from "../assets/circle-user-solid-full.svg";
import logoIcon from "../assets/bicycle-solid-full.svg";
import Cookies from "js-cookie"; // Add this import
import Sidebar from "../components/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isLoggedIn = !!Cookies.get("name"); // Check login status

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <Header />
      <div className="flex flex-1">
        {isLoggedIn && (
          <>
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <main className="flex-1 p-10 bg-white/80 rounded-l-3xl shadow-2xl m-6 overflow-auto">
              {children}
            </main>
          </>
        )}
      </div>
      <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-blue-100 py-6 px-5 text-center rounded-t-3xl shadow-xl mt-8 tracking-wide border-t border-blue-700">
        <div className="flex flex-col items-center gap-2">
          <span className="font-bold text-lg tracking-widest drop-shadow">
            Bikelane Web
          </span>
          <span className="text-xs text-blue-200">
            &copy; {new Date().getFullYear()} —
            <a
              href="https://git.the1s.de/theis.gaedigk/bikelane"
              className="underline hover:text-blue-300 transition"
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
