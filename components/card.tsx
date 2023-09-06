import { ViewProps, View } from "react-native";

interface CardProps extends ViewProps {
  divider?: boolean;
}

function Card({ children, divider, ...rest }: CardProps) {
  return (
    <View
      {...rest}
      className="bg-white dark:bg-gray-900 rounded-[10px] shadow-md"
    >
      {children}
    </View>
  );
}

interface CardContentProps extends ViewProps {}

function CardContent({ children, ...rest }: CardContentProps) {
  return (
    <View className="p-[18]" {...rest}>
      {children}
    </View>
  );
}

Card.Content = CardContent;

export default Card;
