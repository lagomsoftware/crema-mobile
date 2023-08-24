import Slider from "@react-native-community/slider";
import { selectionAsync } from "expo-haptics";
import { Formik } from "formik";
import { ChevronDownIcon } from "lucide-react-native";
import { forwardRef, Ref, useRef, useState } from "react";
import {
  InputAccessoryView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import Button from "../../components/button";
import Card from "../../components/card";
import Divider from "../../components/divider";
import Screen from "../../components/screen";

export default function NewShot() {
  const doseInput = useRef<TextInput>(null);
  const yieldInput = useRef<TextInput>(null);
  const durationInput = useRef<TextInput>(null);
  const grindSettingInput = useRef<TextInput>(null);

  const [focusedInput, setFocusedInput] = useState<
    "dose" | "yield" | "duration" | "grindSetting"
  >("dose");

  return (
    <>
      <Screen>
        <Formik
          initialValues={{
            dose: "",
            yield: "",
            coffee: "",
            duration: "",
            grindSetting: "",
          }}
          onSubmit={() => {}}
        >
          {({ values, handleChange }) => (
            <View className="flex-col space-y-5">
              <Card>
                <Input
                  autoFocus
                  label="Dose"
                  placeholder="18"
                  inputAccessoryViewID="next"
                  keyboardType="decimal-pad"
                  value={values.dose}
                  ref={doseInput}
                  onChangeText={handleChange("dose")}
                  onFocus={() => {
                    setFocusedInput("dose");
                  }}
                />

                <Divider />

                <Input
                  label="Yield"
                  placeholder="36"
                  keyboardType="decimal-pad"
                  value={values.yield}
                  ref={yieldInput}
                  onChangeText={handleChange("yield")}
                  inputAccessoryViewID="next"
                  onFocus={() => {
                    setFocusedInput("yield");
                  }}
                />

                <Divider />

                <Input
                  label="Duration"
                  placeholder="30"
                  keyboardType="decimal-pad"
                  value={values.duration}
                  ref={durationInput}
                  onChangeText={handleChange("duration")}
                  inputAccessoryViewID="next"
                  onFocus={() => {
                    setFocusedInput("duration");
                  }}
                />

                <Divider />

                <Input
                  label="Grind"
                  placeholder="5"
                  keyboardType="decimal-pad"
                  value={values.grindSetting}
                  ref={grindSettingInput}
                  onChangeText={handleChange("grindSetting")}
                  onFocus={() => {
                    setFocusedInput("grindSetting");
                  }}
                />
              </Card>

              <Card>
                <Card.Content className="p-2.5 pl-4">
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 text-lg">Coffee</Text>

                    <TouchableOpacity className="flex-row items-center justify-between flex-1 h-10 px-2">
                      <Text
                        className="w-4/5 text-lg text-gray-600 -translate-x-2"
                        numberOfLines={1}
                      >
                        Mollbergs blandning
                      </Text>

                      <ChevronDownIcon
                        size={24}
                        color={colors.stone[400]}
                        className="translate-y-px"
                      />
                    </TouchableOpacity>
                  </View>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content className="p-2.5 px-4">
                  <View className="flex-row items-center justify-between space-x-5">
                    <Text className="text-lg">Sweetness</Text>

                    <Slider
                      step={1}
                      style={{ flex: 1 }}
                      minimumValue={0}
                      maximumValue={10}
                      minimumTrackTintColor={colors.emerald[600]}
                      thumbTintColor={colors.emerald[600]}
                      tapToSeek
                    />
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}
        </Formik>
      </Screen>

      <InputAccessoryView nativeID="next">
        <View className="flex-row justify-end pb-3.5 pr-3.5">
          <TouchableOpacity
            className="px-6 py-2.5 rounded-full bg-emerald-700"
            onPressIn={selectionAsync}
            onPress={() => {
              switch (focusedInput) {
                case "dose":
                  yieldInput.current?.focus();
                  break;
                case "yield":
                  durationInput.current?.focus();
                  break;
                case "duration":
                  grindSettingInput.current?.focus();
                  break;
              }
            }}
          >
            <Text className="text-base font-medium text-white">Next</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </>
  );
}

interface InputProps extends TextInputProps {
  label: string;
}

const Input = forwardRef(
  ({ label, ...rest }: InputProps, ref: Ref<TextInput>) => {
    return (
      <Card.Content className="p-2.5 pl-4">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-lg">{label}</Text>

          <TextInput
            {...rest}
            ref={ref}
            className="flex-1 h-10 px-2 bg-gray-100 rounded-lg"
            placeholderTextColor={colors.stone[400]}
            style={{ fontSize: 18 }}
          />
        </View>
      </Card.Content>
    );
  }
);
