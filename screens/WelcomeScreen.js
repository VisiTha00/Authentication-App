import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../Contexts/authContext";

function WelcomeScreen() {
  const [message, setMessage] = useState(null);
  const { token } = useAuthentication();

  useEffect(() => {
    async function getMessage() {
      try {
        const response = await axios.get(
          `https://auth-app-8eff0-default-rtdb.firebaseio.com/message.json?auth=${token}`
        );
        setMessage(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getMessage();
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
