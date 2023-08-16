import { selectionAsync } from "expo-haptics";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { XIcon } from "lucide-react-native";
import { TouchableOpacity, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function NewShotLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === "light" ? colors.black : colors.white,
          },
          contentStyle: {
            backgroundColor:
              colorScheme === "light" ? colors.stone[100] : colors.stone[900],
          },
          headerRight: () => (
            <TouchableOpacity
              className="items-center justify-center w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700"
              hitSlop={50}
              onPress={() => {
                selectionAsync();
                router.push("/home");
              }}
            >
              <XIcon
                stroke={
                  colorScheme === "light"
                    ? colors.stone[600]
                    : colors.stone[400]
                }
                strokeWidth={2.5}
                size={19}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <StatusBar animated style="light" />
    </>
  );
}
