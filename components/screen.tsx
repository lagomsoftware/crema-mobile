import { ReactNode, useState } from "react";
import {
  RefreshControl,
  ScrollViewProps,
  useColorScheme,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "tailwindcss/colors";

interface ScreenProps extends ScrollViewProps {
  onRefresh?: () => Promise<any>;
  footer?: ReactNode;
  heading: string;
}

export default function Screen({
  onRefresh,
  heading,
  children,
  footer,
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
    <View className="flex-1">
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
            colorScheme === "light" ? colors.stone[100] : colors.stone[950],
          flex: 1,
        }}
        contentContainerStyle={{
          paddingBottom: 50,
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 20,
        }}
      >
        {children}
      </KeyboardAwareScrollView>

      {footer}
    </View>
  );
}
