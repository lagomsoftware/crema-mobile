import { Tabs } from "expo-router";
import { HomeIcon, PlusIcon } from "lucide-react-native";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import colors from "tailwindcss/colors";

import classNames from "../../lib/classNames";

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
          paddingBottom: 22,
          height: 85,
        },
        tabBarActiveTintColor: { light: colors.black, dark: colors.white }[
          colorScheme
        ],
        tabBarInactiveTintColor: {
          light: colors.stone[500],
          dark: colors.stone[400],
        }[colorScheme],
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My shots",
          ...largeHeader,
          tabBarIcon: (props) => <HomeIcon {...props} size={28} />,
        }}
      />

      <Tabs.Screen
        name="new-shot"
        options={{
          title: "New shot",
          headerShown: false,
          tabBarIcon: (props) => <PlusIcon {...props} size={28} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "My profile",
          ...largeHeader,
          tabBarIcon: ({ focused, color }) => (
            <View
              className={classNames(
                "items-center justify-center rounded-full w-9 h-9",
                focused
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-gray-200 dark:bg-gray-700"
              )}
            >
              <Text
                className="text-lg font-medium dark:text-white"
                style={{ color }}
              >
                A
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
