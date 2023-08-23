import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { LucideIcon } from "lucide-react-native";
import { forwardRef, Ref } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import classNames from "../lib/classNames";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "secondary";
  shape?: "square" | "pill";
  icon?: LucideIcon;
  loading?: boolean;
}

function Button(
  {
    variant = "default",
    shape = "square",
    icon: Icon,
    children,
    loading,
    style,
    ...rest
  }: ButtonProps,
  ref: Ref<TouchableOpacity>,
) {
  return (
    <TouchableOpacity
      {...rest}
      ref={ref}
      style={style}
      onPress={(e) => {
        impactAsync(ImpactFeedbackStyle.Medium);

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
      className={classNames(
        "flex-row items-center justify-between px-6 py-4 space-x-2",
        {
          default: "bg-emerald-700 dark:bg-emerald-700",
          secondary: "dark:bg-gray-800",
        }[variant],
        { square: "rounded-none", pill: "rounded-full" }[shape],
      )}
    >
      <View className={Icon ? "w-[22]" : loading ? "w-[22]" : undefined} />

      <Text
        className={classNames(
          "flex-1 text-lg font-medium text-center",
          {
            default: "text-white",
            secondary: "dark:text-white",
          }[variant],
        )}
      >
        {children}
      </Text>

      {loading ? (
        <ActivityIndicator color="white" />
      ) : Icon ? (
        <Icon size={24} color="white" />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}

export default forwardRef(Button);
