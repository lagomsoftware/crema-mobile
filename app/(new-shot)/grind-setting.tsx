import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  InputAccessoryView,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "../../components/button";
import { trpc } from "../../lib/trpc";

export default function NewShot() {
  const [value, setValue] = useState("");
  const router = useRouter();

  // URL state
  const params = useLocalSearchParams();

  const dose = params.dose
    ? +(params.dose as string).replace(/,/g, ".")
    : undefined;

  const yieldAmount = params.yieldAmount
    ? +(params.yieldAmount as string).replace(/,/g, ".")
    : undefined;

  const duration = params.duration
    ? +(params.duration as string).replace(/,/g, ".")
    : undefined;

  const grindSetting = value ? +value.replace(/,/g, ".") : undefined;

  const coffee = params.coffee ? (params.coffee as string) : undefined;

  // Server state
  const context = trpc.useContext();

  const { mutate, isLoading } = trpc.shot.create.useMutation({
    onSuccess: () => {
      context.shot.list.invalidate();
      router.push("/home");
    },
    onError: () => {
      Alert.alert("Failed to register shot");
    },
  });

  // Handlers
  function handleCreateShot() {
    mutate({
      dose,
      duration,
      coffee,
      grindSetting,
      yield: yieldAmount,
    });
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Grind setting" }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="justify-center flex-1 p-6">
          <View>
            <Text className="text-3xl dark:text-white">Grind setting</Text>

            <TextInput
              style={{ fontSize: 100, letterSpacing: -4 }}
              className="mt-4 dark:text-white"
              inputAccessoryViewID="cta"
              keyboardType="decimal-pad"
              onChangeText={setValue}
              placeholder="5"
              value={value}
              autoFocus
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <InputAccessoryView nativeID="cta">
        <View className="px-4 pb-4">
          <Button
            icon={CheckIcon}
            onPress={handleCreateShot}
            loading={isLoading}
          >
            Register shot
          </Button>
        </View>
      </InputAccessoryView>
    </>
  );
}
