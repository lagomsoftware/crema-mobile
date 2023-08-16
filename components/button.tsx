import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { LucideIcon } from "lucide-react-native";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  useColorScheme,
} from "react-native";

import classNames from "../lib/classNames";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "default" | "secondary";
  icon?: LucideIcon;
  loading?: boolean;
}

export default function Button({
  variant = "default",
  icon: Icon,
  children,
  loading,
  style,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      {...rest}
      style={style}
      onPress={(e) => {
        impactAsync(ImpactFeedbackStyle.Medium);

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
      className={classNames(
        "flex-row items-center justify-between px-6 py-4 rounded-full space-x-2",
        { default: "bg-gray-900 dark:bg-white", secondary: "" }[variant],
      )}
    >
      <View className={Icon ? "w-[22]" : loading ? "w-[22]" : undefined} />

      <Text
        className={classNames(
          "text-lg font-medium",
          {
            default: "text-white dark:text-black",
            secondary: "dark:text-white",
          }[variant],
        )}
      >
        {children}
      </Text>

      {loading ? (
        <ActivityIndicator
          color={colorScheme === "light" ? "white" : "black"}
        />
      ) : Icon ? (
        <Icon size={22} color={colorScheme === "light" ? "white" : "black"} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}
