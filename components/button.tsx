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
  variant?: "default" | "secondary";
  size?: "small" | "default";
  shape?: "square" | "pill";
  icon?: LucideIcon;
  loading?: boolean;
}

function Button(
  {
    variant = "default",
    size = "default",
    shape = "pill",
    icon: Icon,
    children,
    loading,
    style,
    ...rest
  }: ButtonProps,
  ref: Ref<TouchableOpacity>,
) {
  const colorScheme = useColorScheme();

  const disabled = rest.disabled || loading;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled}
      ref={ref}
      onPress={(e) => {
        impactAsync(
          {
            small: ImpactFeedbackStyle.Light,
            default: ImpactFeedbackStyle.Medium,
          }[size],
        );

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
      className={classNames(
        "flex-row items-center justify-between",
        {
          default: "bg-emerald-700 dark:bg-emerald-700",
          secondary: "bg-gray-100 dark:bg-gray-700",
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
            default: "text-white",
            secondary: "dark:text-white",
          }[variant],
          { default: "text-lg", small: "text-base" }[size],
        )}
      >
        {children}
      </Text>

      {loading ? (
        <ActivityIndicator
          color={
            {
              default: "white",
              secondary: { light: "black", dark: "white" }[colorScheme],
            }[variant]
          }
        />
      ) : Icon ? (
        <Icon
          size={{ default: 24, small: 20 }[size]}
          color={
            {
              default: "white",
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
