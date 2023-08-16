import { useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  Text,
  useColorScheme,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "tailwindcss/colors";

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
  const colorScheme = useColorScheme();

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
      contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor:
          colorScheme === "light" ? colors.stone[200] : colors.stone[950],
      }}
      contentContainerStyle={{
        paddingBottom: 50,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 50,
      }}
    >
      <Text
        className="mb-6 font-medium dark:text-white"
        style={{ fontSize: 46 }}
      >
        {heading}
      </Text>

      {children}
    </KeyboardAwareScrollView>
  );
}
