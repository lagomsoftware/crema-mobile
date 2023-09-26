import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  TableProperties,
  PlusSquareIcon,
  BeanIcon,
  UserIcon,
} from "lucide-react-native";
import { useContext } from "react";
import { useColorScheme } from "react-native";
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
        headerTintColor: { light: "black", dark: "white" }[colorScheme],
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: { light: "#eeeeec", dark: colors.stone[950] }[
            colorScheme
          ],
        },
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
        name="NewShot"
        component={NewShot}
        options={{
          title: "New shot",
          tabBarIcon: (props) => <PlusSquareIcon {...props} />,
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
  const { token, loading } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="Authed" component={AuthedNavigation} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      )}
    </Stack.Navigator>
  );
}
