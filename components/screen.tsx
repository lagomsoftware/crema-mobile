import { View } from "react-native";
import { ScrollView, ScrollViewProps, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ScrollViewProps {
  heading: string;
}

export default function Screen({ heading, children, ...rest }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      {...rest}
      className="dark:bg-gray-900"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 50,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-4xl font-medium dark:text-white">{heading}</Text>

      <View className="mt-6">{children}</View>
    </ScrollView>
  );
}
