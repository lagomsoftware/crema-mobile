import { Stack } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Button from "../../components/button";

export default function NewShot() {
  const [value, setValue] = useState("");

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 dark:bg-gray-900"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="justify-center flex-1 p-6">
            <View>
              <Text className="text-3xl dark:text-white">Dose</Text>

              <View className="flex-row mt-4 space-x-4">
                <TextInput
                  style={{ fontSize: 100, letterSpacing: -4 }}
                  className="dark:text-white"
                  inputAccessoryViewID="cta"
                  keyboardType="decimal-pad"
                  onChangeText={setValue}
                  placeholder="18"
                  value={value}
                  // autoFocus
                />

                <Text className="text-[100px] font-light text-gray-500 dark:text-gray-600">
                  g
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <InputAccessoryView nativeID="cta">
        <View className="px-4 pb-4">
          <Button onPress={() => {}} icon={ArrowRightIcon}>
            Continue
          </Button>
        </View>
      </InputAccessoryView>
    </>
  );
}
