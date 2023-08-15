import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";

import { getToken } from "../auth";

const AuthContext = createContext<{
  token?: string;
  setToken: (value?: string) => void;
  loading?: boolean;
}>({
  token: undefined,
  setToken: () => undefined,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const rootSegment = useSegments()[0];
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const _token = await getToken();

      if (_token) {
        setToken(_token);
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!token && rootSegment !== "auth") {
      router.replace("/auth/login");
    } else if (token && rootSegment !== "home") {
      router.replace("/home");
    }
  }, [token, loading, rootSegment]);

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        setToken: (newToken) => {
          setToken(newToken);

          if (newToken) {
            SecureStore.setItemAsync("x-token", newToken);
          } else {
            SecureStore.deleteItemAsync("x-token");
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
