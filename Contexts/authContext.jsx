import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  function authenticate(token) {
    setToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logOut() {
    setToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token,
    setToken,
    authenticate,
    logOut,
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
