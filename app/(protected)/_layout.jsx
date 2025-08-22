import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../ctx";

const ProtectedLayout = () => {
  const authState = useContext(AuthContext);
  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) return <Redirect href={"/sign-in"} />;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pages" />
    </Stack>
  );
};

export default ProtectedLayout;
