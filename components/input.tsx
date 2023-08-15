import { forwardRef, Ref } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  useColorScheme,
} from "react-native";
import colors from "tailwindcss/colors";

import Label from "./label";

interface InputProps extends TextInputProps {
  suffix?: string;
  label: string;
}

const Input = (
  { suffix, style, label, ...rest }: InputProps,
  ref: Ref<TextInput>
) => {
  const colorScheme = useColorScheme();

  return (
    <View style={style}>
      <Label>{label}</Label>

      <View className="relative">
        <TextInput
          {...rest}
          ref={ref}
          className="pt-2 pb-3 text-xl border-b border-gray-300 dark:border-gray-800 dark:text-white"
          placeholderTextColor={
            colorScheme === "light" ? colors.stone[400] : colors.stone[600]
          }
          style={{
            lineHeight: 25,
          }}
        />

        {suffix && (
          <Text className="absolute right-0 text-xl text-gray-500 top-1.5">
            {suffix}
          </Text>
        )}
      </View>
    </View>
  );
};

export default forwardRef(Input);
