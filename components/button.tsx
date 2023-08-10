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
import { SquircleView } from "react-native-figma-squircle";
import colors from "tailwindcss/colors";

import classNames from "../lib/classNames";

interface ButtonProps extends TouchableOpacityProps {
  icon?: LucideIcon;
  loading?: boolean;
}

export default function Button({
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
        impactAsync(ImpactFeedbackStyle.Heavy);

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
    >
      <SquircleView
        className={classNames(
          "flex-row items-center justify-between px-6 py-3.5 space-x-2",
          (loading || rest.disabled) && "opacity-50",
        )}
        squircleParams={{
          fillColor:
            colorScheme === "light" ? colors.neutral[900] : colors.white,
          cornerSmoothing: 0.7,
          cornerRadius: 30,
        }}
      >
        <View className={Icon ? "w-[22]" : loading ? "w-[22]" : undefined} />

        <Text className="text-lg font-medium text-white dark:text-black">
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
      </SquircleView>
    </TouchableOpacity>
  );
}
