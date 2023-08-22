import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import Button from "../../../components/button";
import { trpc } from "../../../lib/trpc";

export default function NewShot() {
  const [value, setValue] = useState("");
  const router = useRouter();

  // URL state
  const { dose, yieldAmount, duration } = useLocalSearchParams();

  // Server state
  const { data: coffees } = trpc.shot.listCoffees.useQuery();

  // Side-effects
  useEffect(() => {
    if (coffees?.length) {
      setValue(coffees[0]);
    }
  }, [coffees]);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 px-6">
      <View className="justify-center flex-1">
        <Text className="text-3xl dark:text-white">Coffee</Text>

        <Picker
          style={{
            borderWidth: 1,
            borderColor: colors.stone[300],
            borderRadius: 8,
            marginTop: 20,
          }}
          selectedValue={value}
          onValueChange={setValue}
        >
          {coffees?.map((coffee) => (
            <Picker.Item label={coffee} value={coffee} key={coffee} />
          ))}
        </Picker>
      </View>

      <Button
        shape="pill"
        onPress={() => {
          router.push(
            `/home/new-shot/grind-setting?dose=${dose}&yieldAmount=${yieldAmount}&duration=${duration}&coffee=${value}`,
          );
        }}
        style={{ marginBottom: insets.bottom }}
        icon={ArrowRightIcon}
      >
        Continue
      </Button>
    </View>
  );
}
