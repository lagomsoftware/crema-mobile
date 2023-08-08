import { Link, Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ gestureEnabled: false }} />

      <Text>Home</Text>

      <Link href="/">Log out</Link>
    </SafeAreaView>
  );
}
