import React from "react";
import bike from "../../src/assets/bicycle-solid.svg";
import user from "../../src/assets/circle-user-solid.svg";

type HeaderProps = {
  onLoginClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => (
  <header className="fixed top-0 left-0 w-full h-20 bg-[#101c5e] flex items-center justify-between px-10 z-50 shadow">
    <div className="flex items-center gap-3">
      <img src={bike} alt="Bike Logo" className="h-10 w-10" />
      <span className="text-white text-2xl font-semibold select-none">
        Bikelane <b>Web</b>
      </span>
    </div>
    <div className="flex items-center gap-4">
      <img src={user} alt="User Icon" className="h-8 w-8" />
      <button
        onClick={onLoginClick}
        className="bg-white text-[#101c5e] font-bold px-5 py-1 rounded-lg text-lg border-2 border-white hover:bg-gray-200 transition"
      >
        Login
      </button>
    </div>
  </header>
);

export default Header;