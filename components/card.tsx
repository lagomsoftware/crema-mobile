import { ViewProps, View } from "react-native";

import classNames from "../lib/classNames";

interface CardProps extends ViewProps {
  divider?: boolean;
}

function Card({ children, divider, ...rest }: CardProps) {
  return (
    <View
      {...rest}
      className={classNames(
        "shadow-md shadow-gray-400/20 dark:shadow-none bg-white dark:bg-gray-900 rounded-[10px]",
        divider && "divide-y divide-gray-100 dark:divide-gray-800"
      )}
    >
      {children}
    </View>
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
