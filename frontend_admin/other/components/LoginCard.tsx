import React, { useRef, useEffect } from "react";

type LoginCardProps = {
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
};

const LoginCard: React.FC<LoginCardProps> = ({ onClose, onSubmit }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
      <div
        ref={cardRef}
        className="bg-gray-200 rounded-xl shadow-lg w-full max-w-md flex flex-col"
      >
        <div className="bg-[#101c5e] text-white rounded-t-xl px-8 py-4 text-center text-2xl font-bold">
          Login
        </div>
        <form
          className="flex flex-col gap-5 px-8 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(username, password);
          }}
        >
          <label className="font-bold">
            username
            <input
              type="text"
              className="mt-2 w-full rounded-full px-5 py-2 bg-gray-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </label>
          <label className="font-bold">
            password
            <input
              type="password"
              className="mt-2 w-full rounded-full px-5 py-2 bg-gray-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-[#101c5e] text-white font-bold rounded-lg py-3 mt-6 text-xl hover:bg-[#203080] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
