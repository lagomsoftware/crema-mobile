import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function NewShotLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.stone[900] : colors.white,
        },
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? colors.stone[900] : colors.white,
        },
        headerTintColor: colorScheme === "dark" ? colors.white : undefined,
      }}
    >
      <Stack.Screen name="dose" options={{ title: "New shot" }} />
    </Stack>
  );
}
