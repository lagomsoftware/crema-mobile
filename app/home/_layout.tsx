import { Tabs } from "expo-router";
import {
  AreaChartIcon,
  BeanIcon,
  TableProperties,
  UserIcon,
} from "lucide-react-native";
import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function () {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light" ? colors.white : colors.stone[900],
          borderTopColor:
            colorScheme === "light" ? colors.stone[300] : colors.stone[700],
        },
        tabBarInactiveTintColor:
          colorScheme === "light" ? colors.stone[500] : colors.stone[500],
        tabBarActiveTintColor:
          colorScheme === "light" ? colors.black : colors.white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My shots",
          tabBarIcon: ({ color, size }) => (
            <TableProperties strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="beans"
        options={{
          title: "Beans",
          tabBarIcon: ({ color, size }) => (
            <BeanIcon strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <AreaChartIcon strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <UserIcon strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
