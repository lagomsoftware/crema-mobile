import { Stack, useRouter } from "expo-router";
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
import colors from "tailwindcss/colors";

import Button from "../../components/button";

export default function NewShot() {
  const [value, setValue] = useState("");
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Dose",
          headerBackTitle: "My shots",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-yellow-400"
      >
        <View className="items-center justify-center flex-1 p-6">
          <View>
            {/* <Text className="text-3xl dark:text-white">Dose</Text> */}

            <View className="flex-row mt-4 space-x-4">
              <TextInput
                className="min-w-[128] font-light text-right dark:text-white"
                placeholderTextColor={colors.yellow[500]}
                selectionColor={colors.yellow[600]}
                inputAccessoryViewID="cta"
                keyboardType="decimal-pad"
                style={{ fontSize: 125 }}
                onChangeText={setValue}
                placeholder="18"
                value={value}
                autoFocus
              />

              <Text className="text-[125px] text-yellow-600 font-extralight dark:text-white">
                g
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <InputAccessoryView nativeID="cta">
        <Button
          disabled={!value}
          onPress={() => {
            router.push(`/(new-shot)/yield-amount?dose=${value}`);
          }}
          icon={ArrowRightIcon}
        >
          Continue
        </Button>
      </InputAccessoryView>
    </>
  );
}
