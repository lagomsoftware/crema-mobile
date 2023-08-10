import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme as _useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { AuthProvider } from "../lib/context/auth";
import { trpc, trpcClient } from "../lib/trpc";

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
