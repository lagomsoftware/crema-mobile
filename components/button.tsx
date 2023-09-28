import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { LucideIcon } from "lucide-react-native";
import { forwardRef, Ref } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import classNames from "../lib/classNames";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "secondary" | "danger";
  size?: "small" | "default";
  shape?: "square" | "pill";
  icon?: LucideIcon;
  isLoading?: boolean;
}

function Button(
  {
    variant = "default",
    size = "default",
    shape = "pill",
    icon: Icon,
    isLoading,
    children,
    style,
    ...rest
  }: ButtonProps,
  ref: Ref<TouchableOpacity>,
) {
  const colorScheme = useColorScheme();

  const disabled = rest.disabled || isLoading;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      ref={ref}
      onPress={(e) => {
        impactAsync(
          {
            small: ImpactFeedbackStyle.Light,
            default: ImpactFeedbackStyle.Heavy,
          }[size],
        );

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
      activeOpacity={0.5}
      className={classNames(
        "flex-row items-center justify-between",
        {
          default: "bg-black dark:bg-white",
          secondary: "bg-gray-100 dark:bg-gray-700",
          danger: "bg-rose-600 dark:bg-rose-600",
        }[variant],
        { square: "rounded-none", pill: "rounded-full" }[shape],
        { default: "px-6 py-4 space-x-2", small: "px-5 py-2.5 space-x-2" }[
          size
        ],
        disabled && "opacity-50",
      )}
      style={style}
    >
      {size === "default" && <View className="w-[22]" />}

      <Text
        className={classNames(
          "text-lg font-medium text-center",
          {
            danger: "text-white",
            default: "text-white dark:text-black",
            secondary: "dark:text-white",
          }[variant],
          { default: "text-lg", small: "text-base" }[size],
        )}
      >
        {children}
      </Text>

      {isLoading ? (
        <ActivityIndicator
          color={
            {
              danger: "white",
              default: { light: "white", dark: "black" }[colorScheme],
              secondary: { light: "black", dark: "white" }[colorScheme],
            }[variant]
          }
        />
      ) : Icon ? (
        <Icon
          size={{ default: 24, small: 20 }[size]}
          color={
            {
              danger: "white",
              default: { light: "white", dark: "black" }[colorScheme],
              secondary: { light: colors.stone[500], dark: colors.stone[300] }[
                colorScheme
              ],
            }[variant]
          }
        />
      ) : (
        size === "default" && <View className="w-[22]" />
      )}
    </TouchableOpacity>
  );
}

export default forwardRef(Button);
