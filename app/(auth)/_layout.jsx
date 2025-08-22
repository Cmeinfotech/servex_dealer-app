import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../ctx";

export default function AuthRoutesLayout() {
  const router = useRouter();

  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (authState.isLoggedIn) return <Redirect href={"/"} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="location" />
    </Stack>
  );
}
