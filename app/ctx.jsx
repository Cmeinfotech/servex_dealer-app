import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { clearAsyncStorage, getData } from "../src/hooks/asynStorageHooks";
import { useStore } from "../src/hooks/store";
export const AuthContext = createContext({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }) {
  const router = useRouter();
  const { setAccessToken } = useStore((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logOut = async () => {
    setIsLoggedIn(false);

    await clearAsyncStorage();
    router.replace("/sign-in");
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getData("accessToken");
        if (token !== null) {
          setAccessToken(token);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isReady, isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
