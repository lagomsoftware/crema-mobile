import Slider, { SliderProps } from "@react-native-community/slider";
import { impactAsync, ImpactFeedbackStyle, selectionAsync } from "expo-haptics";
import { ImagePickerAsset } from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import {
  BeanIcon,
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
  ViewProps,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
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
  beanId?: string;
  acidity?: number;
  duration: string;
  strength?: number;
  yieldAmount: string;
  grindSetting: string;
  images: ImagePickerAsset[];
}

export default function NewShot() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Utils
  // const pickImage = usePickImage((images) => {
  //   console.log({
  //     images,
  //   });
  //   setFieldValue("images", images);
  // });

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
        resetForm();
        router.replace("/home");
      },
    });

  const { isLoading: createBeanLoading, mutate: createBean } =
    trpc.bean.create.useMutation({
      onError: () => Alert.alert("Failed to add new bean"),
      onSuccess: () => refetchBeans(),
    });

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormik<FormValues>({
      onSubmit: handleCreateShot,
      initialValues: {
        grindSetting: "",
        yieldAmount: "",
        duration: "",
        strength: 5,
        acidity: 5,
        notes: "",
        dose: "",
        images: [],
      },
    });

  const selectedBean = beans?.find(({ id }) => id === values.beanId);

  // Handlers
  function handleCreateShot(values: FormValues) {
    createShot({
      grindSetting: parseFloat(values.grindSetting.replaceAll(",", ".")),
      duration: parseFloat(values.duration.replaceAll(",", ".")),
      yield: parseFloat(values.yieldAmount.replaceAll(",", ".")),
      images: values.images.map((image) => image.base64),
      dose: parseFloat(values.dose.replaceAll(",", ".")),
      strength: values.strength,
      acidity: values.acidity,
      beanId: values.beanId,
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
        <View className="flex-col space-y-10">
          <View className="flex-col space-y-[25]">
            <View className="space-y-5">
              {/* <Section label="Photos"> */}
              {/*   <Card> */}
              {/*     <Card.Content className="!p-3"> */}
              {/*       {values.images.length ? ( */}
              {/*         <FlatList */}
              {/*           horizontal */}
              {/*           className="rounded-lg" */}
              {/*           data={values.images} */}
              {/*           decelerationRate={0} */}
              {/*           snapToAlignment="start" */}
              {/*           snapToInterval={208 + 12} */}
              {/*           contentContainerStyle={{ gap: 12 }} */}
              {/*           keyExtractor={(image) => image.uri} */}
              {/*           renderItem={({ item: image }) => ( */}
              {/*             <TouchableOpacity */}
              {/*               className="relative w-52 h-52" */}
              {/*               onPress={() => { */}
              {/*                 selectionAsync(); */}
              {/**/}
              {/*                 ActionSheetIOS.showActionSheetWithOptions( */}
              {/*                   { */}
              {/*                     options: ["Cancel", "Delete"], */}
              {/*                     destructiveButtonIndex: 1, */}
              {/*                     cancelButtonIndex: 0, */}
              {/*                   }, */}
              {/*                   (buttonIndex) => { */}
              {/*                     if (buttonIndex === 1) { */}
              {/*                       setFieldValue( */}
              {/*                         "images", */}
              {/*                         values.images.filter( */}
              {/*                           ({ uri }) => uri !== image.uri, */}
              {/*                         ), */}
              {/*                       ); */}
              {/*                     } */}
              {/*                   }, */}
              {/*                 ); */}
              {/*               }} */}
              {/*             > */}
              {/*               <Image */}
              {/*                 source={{ uri: image.uri }} */}
              {/*                 className="w-full h-full rounded-lg" */}
              {/*               /> */}
              {/*             </TouchableOpacity> */}
              {/*           )} */}
              {/*         /> */}
              {/*       ) : ( */}
              {/*         <View className="items-center justify-center border-2 border-gray-200 dark:border-gray-700 border-dashed rounded-[10px] px-4 pt-8 pb-7"> */}
              {/*           <ImageIcon size={32} color={colors.stone[400]} /> */}
              {/**/}
              {/*           <Text className="mt-3 text-xl font-medium text-center dark:text-white"> */}
              {/*             Attach photos */}
              {/*           </Text> */}
              {/**/}
              {/*           <Text className="mt-1 text-base text-center text-gray-500"> */}
              {/*             Add some photos of your{"\n"}choice to your shot. */}
              {/*           </Text> */}
              {/**/}
              {/*           <Button */}
              {/*             size="small" */}
              {/*             variant="secondary" */}
              {/*             className="mt-5" */}
              {/*             onPress={() => { */}
              {/*               ActionSheetIOS.showActionSheetWithOptions( */}
              {/*                 { */}
              {/*                   options: [ */}
              {/*                     "Cancel", */}
              {/*                     "Choose from library", */}
              {/*                     "Take a photo", */}
              {/*                   ], */}
              {/*                   cancelButtonIndex: 0, */}
              {/*                 }, */}
              {/*                 async (buttonIndex) => { */}
              {/*                   if (buttonIndex === 1) { */}
              {/*                     pickImage(); */}
              {/*                   } else if (buttonIndex === 2) { */}
              {/*                     pickImage(true); */}
              {/*                   } */}
              {/*                 }, */}
              {/*               ); */}
              {/*             }} */}
              {/*           > */}
              {/*             Add photos */}
              {/*           </Button> */}
              {/*         </View> */}
              {/*       )} */}
              {/*     </Card.Content> */}
              {/*   </Card> */}
              {/* </Section> */}

              <Section label="Metrics">
                <Card>
                  <InputWithLabel
                    autoFocus
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

                  <InputWithLabel
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

                  <InputWithLabel
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

                  <InputWithLabel
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
              </Section>

              <Card>
                <Card.Content className="p-2.5 pl-4">
                  <View className="flex-row items-center justify-between space-x-4">
                    <Text className="text-lg text-gray-500 dark:text-gray-400 flex-1 max-w-[100px]">
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
            </View>

            <Section label="Flavour">
              <Card>
                <SliderWithLabel
                  step={1}
                  tapToSeek
                  label="Strength"
                  defaultValue={5}
                  minimumValue={1}
                  maximumValue={10}
                  value={values.strength}
                  onValueChange={(newStrength) => {
                    setFieldValue("strength", newStrength);
                  }}
                />

                <Divider />

                <SliderWithLabel
                  step={1}
                  tapToSeek
                  label="Acidity"
                  defaultValue={5}
                  minimumValue={1}
                  maximumValue={10}
                  value={values.acidity}
                  onValueChange={(newAcidity) => {
                    setFieldValue("acidity", newAcidity);
                  }}
                />
              </Card>
            </Section>

            <Section label="Notes">
              <Card>
                <InputWithLabel
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
            </Section>
          </View>

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

          <View className="flex-row items-center space-x-2.5">
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
        visible={isBeansVisible}
        presentationStyle="formSheet"
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
          {beans?.length ? (
            beans.map((bean) => {
              const isSelected = bean.id === values.beanId;

              return (
                <Fragment key={bean.id}>
                  <TouchableOpacity
                    onPress={async () => {
                      selectionAsync();
                      await setFieldValue(
                        "beanId",
                        isSelected ? undefined : bean.id,
                      );

                      if (beans.length === 1) {
                        setIsBeansVisible(false);
                      } else if (beans.length > 1 && !isSelected) {
                        setIsBeansVisible(false);
                      }

                      // if (!isSelected || beans.length === 1) {
                      //   setIsBeansVisible(false);
                      // }
                    }}
                    className="flex-row items-center justify-between px-5 py-4"
                  >
                    <Text className="text-lg dark:text-white">{bean.name}</Text>

                    {isSelected && (
                      <CheckIcon
                        size={22}
                        color={
                          {
                            light: colors.black,
                            dark: colors.white,
                          }[colorScheme]
                        }
                      />
                    )}
                  </TouchableOpacity>

                  <Divider />
                </Fragment>
              );
            })
          ) : (
            <View className="p-5">
              <View className="items-center justify-center px-5 border-2 border-gray-200 border-dashed rounded-lg py-7">
                <View className="items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                  <BeanIcon
                    size={30}
                    color={{ light: colors.emerald[500] }[colorScheme]}
                  />
                </View>

                <Text className="mt-4 text-xl font-semibold text-center text-gray-700">
                  No beans
                </Text>

                <Text className="max-w-sm mt-2 text-base text-center text-gray-500">
                  You don't seem to have{"\n "}added any beans yet.
                </Text>
              </View>
            </View>
          )}
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
            className="shadow-xl shadow-gray-700/60 dark:shadow-gray-950/50"
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
  label?: string;
}

const InputWithLabel = forwardRef(
  (
    { label, children, style, suffix, ...rest }: InputProps,
    ref: Ref<TextInput>,
  ) => {
    const colorScheme = useColorScheme();

    return (
      <Card.Content
        className={classNames(rest.multiline ? "p-0" : "p-2.5 pl-4")}
      >
        <View
          className={
            rest.multiline
              ? undefined
              : "flex-row items-center justify-between space-x-4"
          }
        >
          <View className="flex-row items-center justify-between flex-1 max-w-[100]">
            {label && (
              <Text className="text-lg text-gray-500 dark:text-gray-400">
                {label}
              </Text>
            )}

            {children}
          </View>

          <TextInput
            {...rest}
            ref={ref}
            className={classNames(
              "dark:text-white",
              rest.multiline
                ? "pb-4 px-4 pt-3 leading-7"
                : "bg-[#eeeeec] rounded-lg dark:bg-gray-800 px-2 h-10 flex-1",
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

interface SliderWithLabelProps extends SliderProps {
  defaultValue: number;
  label: string;
}

const SliderWithLabel = ({
  onValueChange,
  defaultValue,
  value,
  label,
  ...rest
}: SliderWithLabelProps) => {
  const colorScheme = useColorScheme();

  // Local state
  const [labelTimeout, setLabelTimeout] = useState<NodeJS.Timeout>();
  const [isSliding, setIsSliding] = useState<boolean>(false);

  return (
    <Card.Content className="p-2.5 px-4">
      <View className="flex-row items-center justify-between space-x-4">
        {isSliding && (
          <Animated.Text
            className="text-lg dark:text-white flex-1 max-w-[100px]"
            style={{ fontVariant: ["tabular-nums"] }}
            entering={FadeInDown}
            exiting={FadeOutDown}
          >
            {`${value}/10`}
          </Animated.Text>
        )}

        {!isSliding && (
          <Animated.Text
            className="text-lg text-gray-500 dark:text-gray-400 flex-1 max-w-[100px]"
            entering={FadeInUp}
            exiting={FadeOutUp}
          >
            {label}
          </Animated.Text>
        )}

        <Slider
          {...rest}
          value={defaultValue}
          minimumTrackTintColor={
            { light: colors.black, dark: colors.white }[colorScheme]
          }
          thumbTintColor={colors.white}
          style={{ flex: 1 }}
          onSlidingStart={() => {
            clearTimeout(labelTimeout);

            if (isSliding) {
              setIsSliding(false);
            }

            setIsSliding(true);
          }}
          onSlidingComplete={() => {
            const _ = setTimeout(() => {
              setIsSliding(false);
            }, 200);

            setLabelTimeout(_);
          }}
          onValueChange={(newStrength) => {
            onValueChange(newStrength);

            if (newStrength < 3) {
              selectionAsync();
            } else if (newStrength < 6) {
              impactAsync(ImpactFeedbackStyle.Light);
            } else if (newStrength < 9) {
              impactAsync(ImpactFeedbackStyle.Medium);
            } else if (newStrength <= 10) {
              impactAsync(ImpactFeedbackStyle.Heavy);
            }
          }}
        />
      </View>
    </Card.Content>
  );
};

interface SectionProps extends ViewProps {
  label: string;
}

const Section = ({ label, children, ...rest }: SectionProps) => {
  return (
    <View {...rest}>
      <Text className="pl-4 text-lg font-medium dark:text-gray-100 mb-2.5">
        {label}
      </Text>

      {children}
    </View>
  );
};
