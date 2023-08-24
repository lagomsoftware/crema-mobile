import { useFocusEffect } from "@react-navigation/native";

export function useRefetchOnFocus(refetch: () => void) {
  useFocusEffect(() => {
    refetch();
  });
}

export function formatTimer(seconds: number) {
  const min = parseInt((seconds / 60).toString(), 10);
  const sec = Math.abs(seconds - min * 60);

  const displayMins = min >= 10 ? min : "0" + min;
  const displaySeconds = sec >= 10 ? sec : "0" + sec;

  return displayMins + ":" + displaySeconds;
}
