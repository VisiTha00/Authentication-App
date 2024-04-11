import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import { Alert } from "react-native";
import Spinner from "../components/ui/Spinner";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function handleSignUp({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
    } catch (error) {
      Alert.alert("Sign Up Failed", "Check your email and password", [
        { text: "OK" },
      ]);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <Spinner message={"Creating User..."} />;
  }

  return <AuthContent onAuthenticate={handleSignUp} />;
}

export default SignupScreen;
