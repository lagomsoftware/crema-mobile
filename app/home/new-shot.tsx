import Slider from "@react-native-community/slider";
import { selectionAsync } from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import {
  BeanIcon,
  CheckIcon,
  ChevronDownIcon,
  TimerIcon,
  TimerOff,
  TimerReset,
} from "lucide-react-native";
import { forwardRef, Fragment, Ref, useRef, useState } from "react";
import {
  Alert,
  InputAccessoryView,
  Modal,
  SafeAreaView,
  ScrollView,
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
  const [isBeansVisible, setIsBeansVisible] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<
    "dose" | "yield" | "duration" | "grindSetting" | "notes"
  >("dose");

  const { totalSeconds, isRunning, start, pause, reset } = useStopwatch();

  // Server state
  const { data: beans, refetch: refetchBeans } = trpc.bean.list.useQuery();
  const { isLoading: createBeanLoading, mutate } = trpc.bean.create.useMutation(
    {
      onError: () => Alert.alert("Failed to add new bean"),
      onSuccess: () => refetchBeans(),
    }
  );

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      dose: "",
      yield: "",
      notes: "",
      bean: "",
      duration: "",
      grindSetting: "",
    },
    onSubmit: () => {},
  });

  const selectedBean = beans?.find(({ id }) => id === values.bean);

  // Handlers
  async function handleCreateBean() {
    Alert.prompt(
      "New bean",
      "Name of the bean",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add bean",
          onPress: (name) => {
            if (name) {
              mutate({ name });
            }
          },
        },
      ],
      "plain-text"
    );
  }

  return (
    <>
      <Screen>
        <View className="flex-col space-y-5">
          <Card>
            <Input
              // autoFocus
              suffix="gram"
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
              suffix="gram"
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
              suffix="sec"
              label="Duration"
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
                  Bean
                </Text>

                <TouchableOpacity
                  className="flex-row items-center justify-between flex-1 h-10 px-2"
                  hitSlop={20}
                  onPress={() => {
                    setIsBeansVisible(true);
                    selectionAsync();
                  }}
                >
                  <Text
                    className="w-[80%] text-lg dark:text-white -translate-x-2.5"
                    numberOfLines={1}
                  >
                    {selectedBean?.name || "Choose a bean"}
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

      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={isBeansVisible}
        onRequestClose={() => {
          setIsBeansVisible(false);
        }}
      >
        <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-950">
          <View className="bg-white dark:bg-gray-900">
            <View className="items-center py-2">
              <View className="w-full h-[4.5] max-w-[60] bg-gray-300 dark:bg-gray-600 rounded-full" />
            </View>

            <View className="items-center p-6">
              <View className="items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                <BeanIcon
                  size={36}
                  color={
                    { light: colors.emerald[600], dark: colors.emerald[500] }[
                      colorScheme
                    ]
                  }
                />
              </View>

              <Text className="mt-5 text-4xl font-medium text-center dark:text-white">
                Beans
              </Text>

              <Text className="mt-3 text-lg text-center dark:text-white">
                Use an existing bean or add a new one.
              </Text>
            </View>
          </View>

          <View className="flex-1 p-6 pt-7 space-y-6">
            <Card className="flex-1 overflow-hidden">
              <ScrollView className="flex-1">
                {beans?.map((bean, i) => (
                  <Fragment key={bean.id}>
                    {i ? <Divider /> : null}

                    <TouchableOpacity
                      onPress={async () => {
                        selectionAsync();
                        await setFieldValue("bean", bean.id);
                        setIsBeansVisible(false);
                      }}
                      className="flex-row items-center justify-between p-4"
                    >
                      <Text className="text-lg dark:text-white">
                        {bean.name}
                      </Text>

                      {bean.id === values.bean && (
                        <CheckIcon
                          size={22}
                          color={
                            {
                              light: colors.emerald[700],
                              dark: colors.emerald[500],
                            }[colorScheme]
                          }
                        />
                      )}
                    </TouchableOpacity>
                  </Fragment>
                ))}
              </ScrollView>
            </Card>

            <Button onPress={handleCreateBean} loading={createBeanLoading}>
              New bean
            </Button>
          </View>
        </SafeAreaView>

        <StatusBar style="light" />
      </Modal>
    </>
  );
}

interface InputProps extends TextInputProps {
  suffix?: string;
  label: string;
}

const Input = forwardRef(
  (
    { label, children, style, suffix, ...rest }: InputProps,
    ref: Ref<TextInput>
  ) => {
    const colorScheme = useColorScheme();

    return (
      <Card.Content
        className={classNames(rest.multiline ? "p-4" : "p-2.5 pl-4")}
      >
        <View
          className={classNames(
            rest.multiline
              ? "flex-col space-y-2.5"
              : "flex-row items-center justify-between space-x-4"
          )}
        >
          <View className="flex-row items-center justify-between flex-1 max-w-[100]">
            <Text className="text-lg dark:text-white">{label}</Text>

            {children}
          </View>

          <View
            className={classNames(
              "relative rounded-lg",
              rest.multiline ? "-mx-1.5 -mb-1.5" : "h-10 flex-1",
              suffix && "rounded-lg overflow-hidden"
            )}
          >
            <TextInput
              {...rest}
              ref={ref}
              className={classNames(
                "w-full h-full bg-gray-100 dark:bg-gray-800 dark:text-white",
                rest.multiline ? "p-3" : "px-2",
                !suffix && "rounded-lg"
              )}
              placeholderTextColor={
                { light: colors.stone[400], dark: colors.stone[600] }[
                  colorScheme
                ]
              }
              style={{ fontSize: 18, ...style }}
            />

            {suffix && (
              <View className="absolute right-0 items-center justify-center w-16 h-full px-3 bg-gray-200/50 dark:bg-gray-700/50">
                <Text className="text-base text-center text-gray-500 dark:text-gray-400 -translate-y-px">
                  {suffix}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Card.Content>
    );
  }
);
