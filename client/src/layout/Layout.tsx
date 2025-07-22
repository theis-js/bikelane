import React from "react";
import Header from "../components/Header";
import userIcon from "../assets/circle-user-solid-full.svg";
import logoIcon from "../assets/bicycle-solid-full.svg";
import Cookies from "js-cookie"; // Add this import

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
            <aside className="w-72 bg-white/90 shadow-2xl rounded-r-3xl p-8 flex flex-col gap-10 border-r border-blue-100">
              <div className="flex items-center gap-4 mb-10">
                <img
                  src={logoIcon}
                  alt="Bikelane Logo"
                  className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                />
                <span className="font-extrabold text-2xl text-blue-700 tracking-wide drop-shadow">
                  Bikelanes
                </span>
              </div>
              <nav>
                <ul className="space-y-6">
                  <li>
                    <a
                      href="/#"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-blue-700 font-medium bg-blue-50 hover:bg-blue-200 hover:text-blue-900 transition-all shadow-sm"
                    >
                      <img src={userIcon} alt="Users" className="w-6 h-6" />
                      <span className="text-lg">Users</span>
                    </a>
                  </li>
                  {/* Add more links as needed */}
                </ul>
              </nav>
              <div className="mt-auto text-xs text-blue-300 text-center pt-6 border-t border-blue-100">
                <span>Bikelane pre-0.1</span>
              </div>
            </aside>
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
              GitHub Repository
            </a>
            <span className="ml-1">| Fork me please 🚲</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
