import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootParamList = {
  Login: undefined;
  Signup: undefined;
  Authed: undefined;
  NewShot: undefined;
};

export type AuthedParamList = {
  NewShot: undefined;
  Profile: undefined;
  Beans: undefined;
  Home: undefined;
};

export type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList, "Home">,
  NativeStackNavigationProp<RootParamList>
>;

export type ProfileNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList, "Profile">,
  NativeStackNavigationProp<RootParamList>
>;

export type BeansNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList, "Beans">,
  NativeStackNavigationProp<RootParamList>
>;

export type NewShotNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList>,
  NativeStackNavigationProp<RootParamList, "NewShot">
>;

export type LoginNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList>,
  NativeStackNavigationProp<RootParamList, "Login">
>;

export type SignupNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AuthedParamList>,
  NativeStackNavigationProp<RootParamList, "Signup">
>;
