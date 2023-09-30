import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { LucideIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

interface IconButtonProps extends TouchableOpacityProps {
  icon: LucideIcon;
}

export default function IconButton({ icon: Icon, ...rest }: IconButtonProps) {
  const { colorScheme } = useColorScheme();

  return (
    <TouchableOpacity
      {...rest}
      className="bg-gray-300 dark:bg-gray-800 h-8 w-8 rounded-full items-center justify-center"
      onPress={(e) => {
        impactAsync(ImpactFeedbackStyle.Light);

        if (rest.onPress) {
          rest.onPress(e);
        }
      }}
    >
      <Icon
        size={20}
        strokeWidth={2.5}
        color={
          { light: colors.stone[500], dark: colors.stone[400] }[colorScheme]
        }
      />
    </TouchableOpacity>
  );
}
