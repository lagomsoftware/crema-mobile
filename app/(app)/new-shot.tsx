import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { CheckIcon } from "lucide-react-native";
import { useRef } from "react";
import {
  Alert,
  InputAccessoryView,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import Button from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";
import Screen from "../../components/screen";
import Textarea from "../../components/textarea";
import { trpc } from "../../lib/trpc";

export default function NewShot() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const { mutateAsync } = trpc.shot.create.useMutation({
    onError: () => {
      Alert.alert(
        "Oh no! It seems we could not add your shot for some reason. Please try again. If the issue persists, please get in touch with us."
      );
    },
  });

  const { data } = trpc.shot.listCoffees.useQuery();

  // Refs
  const yieldInput = useRef<TextInput>(null);
  const durationInput = useRef<TextInput>(null);
  const grindSettingInput = useRef<TextInput>(null);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        dose: "",
        yield: "",
        notes: "",
        duration: "",
        grindSetting: "",
        coffee: data?.[0] || "",
      }}
      onSubmit={async (values, actions) => {
        await mutateAsync({
          dose: +values.dose,
          yield: +values.yield,
          notes: values.coffee,
          coffee: values.coffee,
          duration: +values.duration,
          grindSetting: +values.grindSetting,
        });

        actions.resetForm();

        router.push("/");
      }}
    >
      {({ values, handleChange, isSubmitting, handleSubmit }) => (
        <Screen
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          heading="New shot"
        >
          <View className="space-y-7">
            <Input
              onSubmitEditing={() => yieldInput.current?.focus()}
              keyboardType="decimal-pad"
              onChangeText={handleChange("dose")}
              inputAccessoryViewID="cta"
              returnKeyType="next"
              value={values.dose}
              placeholder="18"
              label="Dose"
              suffix="g"
              autoFocus
            />

            <Input
              onSubmitEditing={() => durationInput.current?.focus()}
              keyboardType="decimal-pad"
              onChangeText={handleChange("yield")}
              inputAccessoryViewID="cta"
              value={values.yield}
              returnKeyType="next"
              ref={yieldInput}
              placeholder="36"
              label="Yield"
              suffix="g"
            />

            <Input
              onSubmitEditing={() => grindSettingInput.current?.focus()}
              keyboardType="decimal-pad"
              onChangeText={handleChange("duration")}
              inputAccessoryViewID="cta"
              value={values.duration}
              returnKeyType="next"
              ref={durationInput}
              placeholder="30"
              label="Duration"
              suffix="sec"
            />

            <Input
              onChangeText={handleChange("grindSetting")}
              keyboardType="decimal-pad"
              value={values.grindSetting}
              inputAccessoryViewID="cta"
              ref={grindSettingInput}
              label="Grind setting"
              placeholder="5"
            />

            <View>
              <Label>Coffee</Label>

              <View className="mt-2.5 border border-gray-300 dark:border-gray-700 rounded-md">
                <Picker selectedValue={values.coffee} onValueChange={() => {}}>
                  {data?.map((coffee) => (
                    <Picker.Item
                      key={coffee}
                      color={
                        colorScheme === "light" ? colors.black : colors.white
                      }
                      label={coffee}
                      value={coffee}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <Textarea
              placeholder="One thing I noticed was that..."
              onChangeText={handleChange("notes")}
              value={values.notes}
              inputAccessoryViewID="cta"
              label="Notes"
            />
          </View>

          <InputAccessoryView nativeID="cta">
            <View className="px-5 pb-5">
              <Button
                onPress={() => handleSubmit()}
                loading={isSubmitting}
                icon={CheckIcon}
              >
                Add shot
              </Button>
            </View>
          </InputAccessoryView>
        </Screen>
      )}
    </Formik>
  );
}
