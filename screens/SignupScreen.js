import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import { Alert } from "react-native";
import Spinner from "../components/ui/Spinner";
import { useAuthentication } from "../Contexts/authContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { authenticate } = useAuthentication();

  async function handleSignUp({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
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
