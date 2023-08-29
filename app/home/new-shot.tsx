import { selectionAsync } from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  TimerIcon,
  TimerOff,
  TimerReset,
} from "lucide-react-native";
import { forwardRef, Fragment, Ref, useRef, useState } from "react";
import {
  Alert,
  InputAccessoryView,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStopwatch } from "react-timer-hook";
import colors from "tailwindcss/colors";

import Button from "../../components/button";
import Card from "../../components/card";
import Divider from "../../components/divider";
import Screen from "../../components/screen";
import classNames from "../../lib/classNames";
import { trpc } from "../../lib/trpc";
import { formatTimer } from "../../lib/utils";

interface FormValues {
  dose: string;
  notes: string;
  bean: string;
  duration: string;
  yieldAmount: string;
  grindSetting: string;
}

export default function NewShot() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Refs
  const doseInput = useRef<TextInput>(null);
  const notesInput = useRef<TextInput>(null);
  const durationInput = useRef<TextInput>(null);
  const yieldAmountInput = useRef<TextInput>(null);
  const grindSettingInput = useRef<TextInput>(null);

  // Local state
  const [isBeansVisible, setIsBeansVisible] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<
    "dose" | "yieldAmount" | "duration" | "grindSetting" | "notes"
  >("dose");

  const { totalSeconds, isRunning, start, pause, reset } = useStopwatch();

  // Server state
  const { data: beans, refetch: refetchBeans } = trpc.bean.list.useQuery();

  const { isLoading: createShotLoading, mutate: createShot } =
    trpc.shot.create.useMutation({
      onError: () => Alert.alert("Failed to add new shot"),
      onSuccess: () => {
        router.replace("/home");
      },
    });

  const { isLoading: createBeanLoading, mutate: createBean } =
    trpc.bean.create.useMutation({
      onError: () => Alert.alert("Failed to add new bean"),
      onSuccess: () => refetchBeans(),
    });

  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        dose: "",
        notes: "",
        bean: "",
        duration: "",
        yieldAmount: "",
        grindSetting: "",
      },
      onSubmit: handleCreateShot,
    });

  const selectedBean = beans?.find(({ id }) => id === values.bean);

  // Handlers
  function handleCreateShot(values: FormValues) {
    createShot({
      grindSetting: parseFloat(values.grindSetting.replaceAll(",", ".")),
      duration: parseFloat(values.duration.replaceAll(",", ".")),
      yield: parseFloat(values.yieldAmount.replaceAll(",", ".")),
      dose: parseFloat(values.dose.replaceAll(",", ".")),
      beanId: values.bean,
      notes: values.notes,
    });
  }

  function handleCreateBean() {
    Alert.prompt(
      "New bean",
      "Name of the bean",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add bean",
          onPress: (name) => {
            if (name) {
              createBean({ name });
            }
          },
        },
      ],
      "plain-text",
    );
  }

  return (
    <>
      <Screen>
        <View className="flex-col space-y-7">
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
                value={values.yieldAmount}
                ref={yieldAmountInput}
                onChangeText={handleChange("yieldAmount")}
                inputAccessoryViewID="next"
                onFocus={() => {
                  setFocusedInput("yieldAmount");
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
                      className="w-[80%] text-lg -translate-x-2.5 text-gray-600 dark:text-gray-300"
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
          </View>

          {/* <Card> */}
          {/*   <Card.Content className="p-2.5 px-4"> */}
          {/*     <View className="flex-row items-center justify-between space-x-4"> */}
          {/*       <Text className="text-lg dark:text-white flex-1 max-w-[100px]"> */}
          {/*         Sweetness */}
          {/*       </Text> */}
          {/**/}
          {/*       <Slider */}
          {/*         step={1} */}
          {/*         style={{ flex: 1 }} */}
          {/*         minimumValue={0} */}
          {/*         maximumValue={10} */}
          {/*         minimumTrackTintColor={colors.emerald[600]} */}
          {/*         thumbTintColor={colors.emerald[600]} */}
          {/*         tapToSeek */}
          {/*       /> */}
          {/*     </View> */}
          {/*   </Card.Content> */}
          {/* </Card> */}
          <Button
            icon={CheckIcon}
            loading={createShotLoading}
            onPress={() => {
              handleSubmit();
            }}
          >
            Add shot
          </Button>
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
                      yieldAmountInput.current?.focus();
                      break;
                    case "yieldAmount":
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
        <View className="bg-gray-100 border-b border-gray-200/50 dark:bg-gray-950 dark:border-gray-700/50">
          <View className="items-center py-2">
            <View className="w-full h-[4.5] max-w-[60] bg-gray-300 dark:bg-gray-600 rounded-full" />
          </View>

          <View className="px-5 pt-20 pb-5">
            <Text className="mt-5 text-4xl font-semibold dark:text-white">
              Choose a bean
            </Text>
          </View>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className="flex-1 bg-white dark:bg-gray-900"
          contentContainerStyle={{ paddingBottom: 125 }}
        >
          {beans?.map((bean, i) => (
            <Fragment key={bean.id}>
              <TouchableOpacity
                onPress={async () => {
                  selectionAsync();
                  await setFieldValue("bean", bean.id);
                  setIsBeansVisible(false);
                }}
                className="flex-row items-center justify-between px-5 py-4"
              >
                <Text className="text-lg dark:text-white">{bean.name}</Text>

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

              <Divider />
            </Fragment>
          ))}
        </ScrollView>

        <View
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
            paddingLeft: insets.left + 20,
            paddingRight: insets.right + 20,
            paddingBottom: insets.bottom + 20,
          }}
        >
          <Button
            icon={PlusIcon}
            onPress={handleCreateBean}
            loading={createBeanLoading}
            className="shadow-xl shadow-emerald-700/60 dark:shadow-gray-950/50"
          >
            New bean
          </Button>
        </View>

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
    ref: Ref<TextInput>,
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
              : "flex-row items-center justify-between space-x-4",
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
              "bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg",
              rest.multiline ? "p-3 -mx-1.5 -mb-1.5" : "px-2 h-10 flex-1",
            )}
            placeholderTextColor={
              { light: colors.stone[400], dark: colors.stone[600] }[colorScheme]
            }
            style={{ fontSize: 18, ...style }}
          />
        </View>
      </Card.Content>
    );
  },
);
