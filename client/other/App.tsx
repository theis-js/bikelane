import React, { useState } from "react";
import Header from "./components/Header";
import LoginCard from "./components/LoginCard";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLoginSubmit = (username: string, password: string) => {
    // Hier kannst du fetch einbauen
    alert(`Login: ${username} / ${password}`);
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={handleLoginClick} />
      <main className="pt-20 w-full h-full flex flex-col items-center justify-start">
        {/* Hier kommt später der Seiteninhalt */}
        {showLogin && (
          <LoginCard onClose={handleCloseLogin} onSubmit={handleLoginSubmit} />
        )}
      </main>
    </div>
  );
}

export default App;
