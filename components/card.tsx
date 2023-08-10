import { ViewProps, useColorScheme } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import colors from "tailwindcss/colors";

export default function Card({ children, ...rest }: ViewProps) {
  const colorScheme = useColorScheme();

  return (
    <SquircleView
      {...rest}
      squircleParams={{
        cornerRadius: 8,
        cornerSmoothing: 0.7,
        fillColor: colorScheme === "light" ? colors.white : colors.neutral[800],
      }}
      className="p-4"
    >
      {children}
    </SquircleView>
  );
}