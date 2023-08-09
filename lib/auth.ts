import * as SecureStore from "expo-secure-store";

export function getToken(): Promise<string> {
  return SecureStore.getItemAsync("x-token");
}
