import { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  function authenticate(token) {
    setToken(token);
  }

  function logout() {
    setToken(null);
  }

  const value = {
    token,
    authenticate,
    logout,
    isAuthenticated: token !== null,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;

export function useAuthentication() {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return auth;
}
