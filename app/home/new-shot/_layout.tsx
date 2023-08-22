import { Link, Stack } from "expo-router";
import { ChevronLeftIcon } from "lucide-react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function Layout() {
  const colorScheme = useColorScheme();

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
        name="dose"
        options={{
          title: "Dose",
          ...newShotScreen,
          headerLeft: () => (
            <Link href="/home" asChild>
              <TouchableOpacity>
                <ChevronLeftIcon size={34} color={colors.white} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="yield-amount"
        options={{ title: "Yield", ...newShotScreen }}
      />

      <Stack.Screen
        name="duration"
        options={{ title: "Duration", ...newShotScreen }}
      />

      <Stack.Screen
        name="grind-setting"
        options={{ title: "Grind setting", ...newShotScreen }}
      />

      <Stack.Screen
        name="coffee"
        options={{ title: "Coffee", ...newShotScreen }}
      />
    </Stack>
  );
}
