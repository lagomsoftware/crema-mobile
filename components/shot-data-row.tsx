import { Icon } from "lucide-react-native";
import { ViewProps, Text, View } from "react-native";

interface ShotDataRowProps extends ViewProps {
  value: string | number;
  suffix?: string;
  label: string;
  icon: Icon;
}

export default function ShotDataRow({
  icon: Icon,
  suffix,
  label,
  value,
  ...rest
}: ShotDataRowProps) {
  return (
    <View {...rest} className="flex-row items-center justify-between space-x-4">
      <View className="flex-row items-center space-x-2">
        <Text className="text-base text-gray-500 dark:text-gray-400">
          {label}
        </Text>
      </View>

      <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />

      <Text
        className="text-base dark:text-white max-w-[60%]"
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {value}
        {suffix && (
          <Text className="text-gray-500 dark:text-gray-400"> {suffix}</Text>
        )}
      </Text>
    </View>
  );
}
