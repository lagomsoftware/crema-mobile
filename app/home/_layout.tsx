import { Tabs } from "expo-router";
import {
  BeanIcon,
  PlusSquareIcon,
  TableProperties,
  UserIcon,
} from "lucide-react-native";
import React from "react";
import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  const largeHeader = {
    headerTintColor: { light: "black", dark: "white" }[colorScheme],
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor: { light: colors.stone[100], dark: colors.stone[950] }[
        colorScheme
      ],
    },
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: {
            light: colors.white,
            dark: colors.stone[800],
          }[colorScheme],
          borderTopColor: {
            light: colors.stone[400],
            dark: colors.stone[500],
          }[colorScheme],
          paddingTop: 5,
          height: 85,
        },
        tabBarActiveTintColor: { light: colors.black, dark: colors.white }[
          colorScheme
        ],
        tabBarInactiveTintColor: {
          light: colors.stone[500],
          dark: colors.stone[400],
        }[colorScheme],
        // tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My shots",
          ...largeHeader,
          tabBarIcon: (props) => <TableProperties {...props} />,
        }}
      />

      <Tabs.Screen
        name="new-shot"
        options={{
          title: "New shot",
          ...largeHeader,
          tabBarIcon: (props) => <PlusSquareIcon {...props} />,
        }}
      />

      <Tabs.Screen
        name="beans"
        options={{
          title: "Beans",
          ...largeHeader,
          tabBarIcon: (props) => <BeanIcon {...props} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "My profile",
          ...largeHeader,
          tabBarIcon: (props) => <UserIcon {...props} />,
        }}
      />
    </Tabs>
  );
}
