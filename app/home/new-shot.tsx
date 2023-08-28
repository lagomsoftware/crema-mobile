import Slider from "@react-native-community/slider";
import { selectionAsync } from "expo-haptics";
import { Link } from "expo-router";
import { useFormik } from "formik";
import {
  ChevronDownIcon,
  TimerIcon,
  TimerOff,
  TimerReset,
} from "lucide-react-native";
import { forwardRef, Ref, useRef, useState } from "react";
import {
  InputAccessoryView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useStopwatch } from "react-timer-hook";
import colors from "tailwindcss/colors";

import Button from "../../components/button";
import Card from "../../components/card";
import Divider from "../../components/divider";
import Screen from "../../components/screen";
import classNames from "../../lib/classNames";
import { trpc } from "../../lib/trpc";
import { formatTimer } from "../../lib/utils";

export default function NewShot() {
  const colorScheme = useColorScheme();

  // Refs
  const doseInput = useRef<TextInput>(null);
  const yieldInput = useRef<TextInput>(null);
  const notesInput = useRef<TextInput>(null);
  const durationInput = useRef<TextInput>(null);
  const grindSettingInput = useRef<TextInput>(null);

  // Local state
  const [focusedInput, setFocusedInput] = useState<
    "dose" | "yield" | "duration" | "grindSetting" | "notes"
  >("dose");

  const { totalSeconds, isRunning, start, pause, reset } = useStopwatch();

  // Server state
  trpc.shot.listCoffees.useQuery();

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      dose: "",
      yield: "",
      notes: "",
      coffee: "",
      duration: "",
      grindSetting: "",
    },
    onSubmit: () => {},
  });

  return (
    <>
      <Screen>
        <View className="flex-col space-y-5">
          <Card>
            <Input
              // autoFocus
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
              // editable={!isRunning}
              placeholder="30"
              keyboardType="number-pad"
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
              <View className="flex-row items-center justify-between space-x-4">
                <Text className="flex-1 text-lg dark:text-white max-w-[100]">
                  Coffee
                </Text>

                <Link asChild href="/home/new-shot/coffee">
                  <TouchableOpacity
                    className="flex-row items-center justify-between flex-1 h-10 px-2"
                    onPressIn={() => {
                      selectionAsync();
                    }}
                  >
                    <Text
                      className="w-[80%] text-lg text-gray-600 dark:text-gray-400 -translate-x-2.5"
                      numberOfLines={1}
                    >
                      Mollbergs blandning
                    </Text>

                    <ChevronDownIcon
                      size={24}
                      color={
                        {
                          light: colors.stone[400],
                          dark: colors.stone[500],
                        }[colorScheme]
                      }
                      className="translate-y-px"
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </Card.Content>
          </Card>

          <Card>
            <Input
              label="Notes"
              placeholder="I noticed that..."
              value={values.notes}
              style={{ height: 200 }}
              multiline
              ref={notesInput}
              onChangeText={handleChange("notes")}
              onFocus={() => {
                setFocusedInput("notes");
              }}
            />
          </Card>

          <Card>
            <Card.Content className="p-2.5 px-4">
              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-lg dark:text-white flex-1 max-w-[100px]">
                  Sweetness
                </Text>

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
      </Screen>

      <InputAccessoryView nativeID="next">
        <View className="flex-row justify-between items-center p-3.5 pl-4 bg-white dark:bg-gray-800 space-x-3 shadow-2xl border-t border-gray-200 dark:border-gray-700">
          {focusedInput === "duration" ? (
            <Text
              className="text-xl dark:text-white"
              style={{ fontVariant: ["tabular-nums"] }}
            >
              {isRunning
                ? formatTimer(totalSeconds)
                : totalSeconds
                ? formatTimer(totalSeconds)
                : ""}
            </Text>
          ) : (
            <View />
          )}

          <View className="flex-row items-center space-x-3">
            {focusedInput === "duration" ? (
              <>
                {isRunning ? (
                  <Button
                    size="small"
                    variant="secondary"
                    icon={TimerOff}
                    onPress={() => {
                      pause();
                    }}
                  >
                    Stop timer
                  </Button>
                ) : totalSeconds ? (
                  <Button
                    size="small"
                    variant="secondary"
                    icon={TimerReset}
                    onPress={() => {
                      reset(undefined, false);
                    }}
                  >
                    Reset timer
                  </Button>
                ) : (
                  <Button
                    size="small"
                    variant="secondary"
                    icon={TimerIcon}
                    onPress={() => {
                      start();
                    }}
                  >
                    Start timer
                  </Button>
                )}

                <Button
                  size="small"
                  onPress={() => {
                    if (totalSeconds && !isRunning) {
                      setFieldValue("duration", totalSeconds.toString());
                      reset(undefined, false);
                    }

                    grindSettingInput.current?.focus();
                  }}
                >
                  Next
                </Button>
              </>
            ) : (
              <Button
                size="small"
                onPress={() => {
                  switch (focusedInput) {
                    case "dose":
                      yieldInput.current?.focus();
                      break;
                    case "yield":
                      durationInput.current?.focus();
                      break;
                  }
                }}
              >
                Next
              </Button>
            )}
          </View>
        </View>
      </InputAccessoryView>
    </>
  );
}

interface InputProps extends TextInputProps {
  label: string;
}

const Input = forwardRef(
  ({ label, children, style, ...rest }: InputProps, ref: Ref<TextInput>) => {
    const colorScheme = useColorScheme();

    return (
      <Card.Content
        className={classNames(rest.multiline ? "p-4" : "p-2.5 pl-4")}
      >
        <View
          className={classNames(
            rest.multiline
              ? "flex-col space-y-3"
              : "flex-row items-center justify-between space-x-4"
          )}
        >
          <View className="flex-row items-center justify-between flex-1 max-w-[100]">
            <Text className="text-lg dark:text-white">{label}</Text>

            {children}
          </View>

          <TextInput
            {...rest}
            ref={ref}
            className={classNames(
              "rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white",
              rest.multiline ? "p-3 -mx-1.5 -mb-1.5" : "h-10 px-2 flex-1"
            )}
            placeholderTextColor={
              { light: colors.stone[400], dark: colors.stone[600] }[colorScheme]
            }
            style={{ fontSize: 18, ...style }}
          />
        </View>
      </Card.Content>
    );
  }
);
