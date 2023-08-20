import { ViewProps, useColorScheme } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import colors from "tailwindcss/colors";

export default function Card({ children, ...rest }: ViewProps) {
  const colorScheme = useColorScheme();

  return (
    <SquircleView
      {...rest}
      squircleParams={{
        cornerRadius: 10,
        cornerSmoothing: 0.7,
        fillColor: colorScheme === "light" ? colors.white : colors.stone[900],
      }}
      className="p-[18] shadow-md shadow-gray-400/20 dark:shadow-none"
    >
      {children}
    </SquircleView>
  );
}
