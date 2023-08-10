import { Text, TextProps } from "react-native";

export default function Label({ children, ...rest }: TextProps) {
  return (
    <Text {...rest} className="text-base text-gray-500 dark:text-gray-400">
      {children}
    </Text>
  );
}
