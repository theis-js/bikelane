import React from "react";

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});
