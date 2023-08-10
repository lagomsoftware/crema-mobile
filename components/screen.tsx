import { useState } from "react";
import { RefreshControl, ScrollViewProps, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    <KeyboardAwareScrollView
      {...rest}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        ) : undefined
      }
      className="dark:bg-gray-900"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: 50,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 50,
      }}
    >
      <Text className="mb-6 text-4xl font-medium dark:text-white">
        {heading}
      </Text>

      {children}
    </KeyboardAwareScrollView>
  );
}
