import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TableProperties, BeanIcon, UserIcon } from "lucide-react-native";
import { useContext } from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

import AuthContext from "../lib/context/auth";
import Beans from "../screens/beans";
import Home from "../screens/home";
import Login from "../screens/login";
import NewShot from "../screens/new-shot";
import Profile from "../screens/profile";
import Signup from "../screens/signup";
import { AuthedParamList, RootParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator<AuthedParamList>();

const transparentHeader = (colorScheme: ColorSchemeName) => ({
  headerTintColor: { light: "black", dark: "white" }[colorScheme],
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: { light: "#eeeeec", dark: colors.stone[950] }[colorScheme],
  },
});

function AuthedNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: {
            dark: colors.stone[950],
            light: "#eeeeec",
          }[colorScheme],
          borderTopWidth: 0,
          paddingTop: 5,
          height: 85,
          paddingHorizontal: 20,
        },
        tabBarActiveTintColor: { light: colors.black, dark: colors.white }[
          colorScheme
        ],
        tabBarInactiveTintColor: {
          light: colors.stone[500],
          dark: colors.stone[400],
        }[colorScheme],
        tabBarShowLabel: false,
        ...transparentHeader(colorScheme),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: (props) => <TableProperties {...props} />,
        }}
      />

      <Tab.Screen
        name="Beans"
        component={Beans}
        options={{
          title: "Beans",
          tabBarIcon: (props) => <BeanIcon {...props} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: (props) => <UserIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { token } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen
            name="Authed"
            component={AuthedNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewShot"
            component={NewShot}
            options={{
              title: "New shot",
              presentation: "modal",
              ...transparentHeader(colorScheme),
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
