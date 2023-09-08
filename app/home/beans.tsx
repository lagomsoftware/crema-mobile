import { Text, View } from "react-native";

import Screen from "../../components/screen";

export default function Beans() {
  return (
    <Screen contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center">
        <Text className="dark:text-white text-lg text-center">Coming soon</Text>
      </View>
    </Screen>
  );
}
