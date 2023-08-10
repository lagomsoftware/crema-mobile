import "../global.css";
import { AuthProvider } from "../lib/context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { trpc, trpcClient } from "../lib/trpc";
import { useColorScheme as _useColorScheme } from "nativewind";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";

export default function () {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
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
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
