import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "../../components/button";

export default function NewShot() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const { dose } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Yield" }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="justify-center flex-1 p-6">
          <View>
            <Text className="text-3xl dark:text-white">Yield</Text>

            <View className="flex-row mt-4 space-x-4">
              <TextInput
                style={{ fontSize: 100, letterSpacing: -4 }}
                className="dark:text-white"
                inputAccessoryViewID="cta"
                keyboardType="decimal-pad"
                onChangeText={setValue}
                placeholder="36"
                value={value}
                autoFocus
              />

              <Text className="text-[100px] font-light text-gray-500 dark:text-gray-600">
                g
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <InputAccessoryView nativeID="cta">
        <View className="px-4 pb-4">
          <Button
            disabled={!value}
            onPress={() => {
              router.push(`/(new-shot)/duration?dose=${dose}&yield=${value}`);
            }}
            icon={ArrowRightIcon}
          >
            Continue
          </Button>
        </View>
      </InputAccessoryView>
    </>
  );
}
