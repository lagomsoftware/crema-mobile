import { ViewProps, useColorScheme, View } from "react-native";
import { SquircleView } from "react-native-figma-squircle";
import colors from "tailwindcss/colors";

function Card({ children, ...rest }: ViewProps) {
  const colorScheme = useColorScheme();

  return (
    <SquircleView
      {...rest}
      squircleParams={{
        cornerRadius: 10,
        cornerSmoothing: 0.7,
        fillColor: colorScheme === "light" ? colors.white : colors.stone[900],
      }}
      className="shadow-md shadow-gray-400/20 dark:shadow-none"
    >
      {children}
    </SquircleView>
  );
}

interface CardContentProps extends ViewProps {}

Card.Content = ({ children, ...rest }: CardContentProps) => {
  return (
    <View className="p-[18]" {...rest}>
      {children}
    </View>
  );
};

export default Card;
