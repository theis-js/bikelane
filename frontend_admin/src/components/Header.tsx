import { useState } from "react";
import React from "react";
import LoginCard from "./LoginCard";
import { greeting } from "../utils/frontendService";
import { changeTheme } from "../utils/frontendService";

const Header: React.FC = () => {
  const [loginCardVisible, setLoginCardVisible] = useState(false);

  const closeLoginCard = () => {
    setLoginCardVisible(false);
  };

  let loginBtnVal: string = "Hello, " + greeting() + "!";

  return (
    <header className="bg-blue-600 dark:bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Bikelane <strong>Admin Panel</strong>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a className="hover:underline">
                <button
                  onClick={() => changeTheme()}
                  className="bg-blue-700 dark:bg-gray-800 shadow-md hover:bg-blue-800 dark:hover:bg-gray-700 transition padding px-4 py-2 rounded-md text-white font-semibold"
                >
                  Change Theme
                </button>
                <button
                  onClick={() => setLoginCardVisible(true)}
                  className="bg-blue-700 dark:bg-gray-800 shadow-md hover:bg-blue-800 dark:hover:bg-gray-700 transition padding px-4 py-2 rounded-md text-white font-semibold"
                >
                  {loginBtnVal ?? "Login"}
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>{loginCardVisible && <LoginCard onClose={closeLoginCard} />}</div>
    </header>
  );
};

export default Header;
