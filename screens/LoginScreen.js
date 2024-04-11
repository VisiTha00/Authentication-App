import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../utils/auth";
import { Alert } from "react-native";
import Spinner from "../components/ui/Spinner";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleLogin({ email, password }) {
    setIsAuthenticating(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Failed", "Check your email and password", [
        { text: "OK" },
      ]);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <Spinner message={"Logging In..."} />;
  }
  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}

export default LoginScreen;
