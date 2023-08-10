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

interface TextareaProps extends TextInputProps {
  suffix?: string;
  label: string;
}

const Textarea = (
  { suffix, style, label, ...rest }: TextareaProps,
  ref: Ref<TextInput>,
) => {
  const colorScheme = useColorScheme();

  return (
    <View style={style}>
      <Label>{label}</Label>

      <View className="relative">
        <TextInput
          {...rest}
          ref={ref}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          className="h-64 p-4 text-xl dark:text-white mt-2.5 border dark:border-gray-700 rounded-md"
          placeholderTextColor={
            colorScheme === "light" ? colors.neutral[400] : colors.neutral[600]
          }
          style={{
            lineHeight: 25,
          }}
        />

        {suffix && (
          <Text className="absolute right-0 text-xl text-gray-500 top-1.5 dark:text-gray-400">
            {suffix}
          </Text>
        )}
      </View>
    </View>
  );
};

export default forwardRef(Textarea);
