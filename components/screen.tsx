import { useState } from "react";
import { RefreshControl, View } from "react-native";
import { ScrollView, ScrollViewProps, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenProps extends ScrollViewProps {
  onRefresh?: () => Promise<any>;
  heading: string;
}

export default function Screen({
  onRefresh,
  heading,
  children,
  ...rest
}: ScreenProps) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Handlers
  async function handleRefresh() {
    setRefreshing(true);

    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });

    await onRefresh();

    setRefreshing(false);
  }

  return (
    <ScrollView
      {...rest}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
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
