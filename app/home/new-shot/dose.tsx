import { useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import {
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import Button from "../../../components/button";

export default function NewShot() {
  const colorScheme = useColorScheme();

  const [value, setValue] = useState("");
  const router = useRouter();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="items-center justify-center flex-1 p-6">
          <View className="flex-row mt-4 space-x-4">
            <TextInput
              className="min-w-[128] font-light text-right dark:text-white"
              placeholderTextColor={
                { light: colors.stone[300], dark: colors.stone[800] }[
                  colorScheme
                ]
              }
              selectionColor={
                { light: colors.green[500], dark: colors.emerald[600] }[
                  colorScheme
                ]
              }
              inputAccessoryViewID="cta"
              keyboardType="decimal-pad"
              style={{ fontSize: 125 }}
              onChangeText={setValue}
              placeholder="18"
              value={value}
              // autoFocus
            />

            <Text className="text-[125px] font-light text-gray-400 dark:text-gray-700">
              g
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>

      <InputAccessoryView nativeID="cta">
        <Button
          disabled={!value}
          onPress={() => {
            router.push(`/home/new-shot/yield-amount?dose=${value}`);
          }}
          icon={ArrowRightIcon}
        >
          Continue
        </Button>
      </InputAccessoryView>
    </>
  );
}
