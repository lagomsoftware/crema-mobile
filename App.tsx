import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme as _useColorScheme } from "nativewind";
import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";

import Navigation from "./components/navigation";
import { AuthProvider } from "./lib/context/auth";
import { trpc, trpcClient } from "./lib/trpc";

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  const colorScheme = useColorScheme();
  const { setColorScheme } = _useColorScheme();

  useEffect(() => {
    setColorScheme(colorScheme);
  }, [colorScheme]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <Navigation />

            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
