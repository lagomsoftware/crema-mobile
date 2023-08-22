import { useFocusEffect } from "@react-navigation/native";

export function useRefetchOnFocus(refetch: () => void) {
  useFocusEffect(() => {
    refetch();
  });
}
