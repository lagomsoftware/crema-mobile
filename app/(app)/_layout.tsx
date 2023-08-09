import { Slot, Stack, Tabs } from "expo-router";
import { HomeIcon, PlusIcon, UserIcon } from "lucide-react-native";
import colors from "tailwindcss/colors";

export default function () {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.neutral[800],
          borderTopColor: colors.neutral[600],
        },
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarActiveTintColor: colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="new-shot"
        options={{
          title: "New shot",
          tabBarIcon: ({ color, size }) => (
            <PlusIcon size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
