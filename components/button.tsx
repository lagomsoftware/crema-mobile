import { impactAsync } from "expo-haptics";
import { SquircleView } from "react-native-figma-squircle";
import { LucideIcon } from "lucide-react-native";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  icon?: LucideIcon;
}

export default function Button({
  icon: Icon,
  children,
  style,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      {...rest}
      style={style}
      onPressIn={(e) => {
        impactAsync();

        if (rest.onPressIn) {
          rest.onPressIn(e);
        }
      }}
    >
      <SquircleView
        className="flex-row items-center justify-center px-6 py-3.5 space-x-2"
        squircleParams={{
          fillColor: colorScheme === "light" ? "#1c1917" : "white",
          cornerSmoothing: 0.7,
          cornerRadius: 30,
        }}
      >
        <Text className="text-base font-medium text-white dark:text-black">
          {children}
        </Text>

        {Icon && (
          <Icon size={20} color={colorScheme === "light" ? "white" : "black"} />
        )}
      </SquircleView>
    </TouchableOpacity>
  );
}
