import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  const largeHeader = {
    headerLargeTitle: true,
    headerLargeTitleStyle: {
      fontSize: 42,
      fontWeight: "500",
    },
    headerTintColor: { light: "black", dark: "white" }[colorScheme],
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: { light: colors.stone[100], dark: colors.stone[950] }[
        colorScheme
      ],
    },
    headerLargeStyle: {
      backgroundColor: { light: colors.stone[100], dark: colors.stone[950] }[
        colorScheme
      ],
    },
  };

  const newShotScreen = {
    headerStyle: {
      backgroundColor: { light: colors.white, dark: colors.stone[950] }[
        colorScheme
      ],
    },
    headerShadowVisible: false,
    headerTintColor: { light: colors.black, dark: colors.white }[colorScheme],
    contentStyle: {
      backgroundColor: { light: colors.white, dark: colors.stone[950] }[
        colorScheme
      ],
    },
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My shots",
          ...largeHeader,
        }}
      />

      <Stack.Screen
        name="profile"
        options={{ title: "My profile", ...largeHeader }}
      />

      <Stack.Screen
        name="new-shot/dose"
        options={{ title: "Dose", ...newShotScreen }}
      />

      <Stack.Screen
        name="new-shot/yield-amount"
        options={{ title: "Yield", ...newShotScreen }}
      />

      <Stack.Screen
        name="new-shot/duration"
        options={{ title: "Duration", ...newShotScreen }}
      />

      <Stack.Screen
        name="new-shot/grind-setting"
        options={{ title: "Grind setting", ...newShotScreen }}
      />

      <Stack.Screen
        name="new-shot/coffee"
        options={{ title: "Coffee", ...newShotScreen }}
      />
    </Stack>
  );
}
