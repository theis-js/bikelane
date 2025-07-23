import React from "react";
import userIcon from "../assets/circle-user-solid-full.svg";
import logoIcon from "../assets/bicycle-solid-full.svg";

const Sidebar: React.FC = () => (
  <aside className="w-72 bg-white/90 shadow-2xl rounded-r-3xl p-8 flex flex-col gap-10 border-r border-blue-100">
    <div className="flex items-center gap-4 mb-10">
      <img
        src={logoIcon}
        alt="Bikelane Logo"
        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
      />
      <span className="font-extrabold text-2xl text-blue-700 tracking-wide drop-shadow">
        Web-Panel
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
);

export default Sidebar;