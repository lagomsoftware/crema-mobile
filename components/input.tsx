import { View, TextInput, TextInputProps, Text } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

export default function Input({ style, label, ...rest }: InputProps) {
  return (
    <View style={style}>
      <Text className="text-base text-gray-500 dark:text-gray-400">
        {label}
      </Text>

      <TextInput
        {...rest}
        className="pt-1 pb-3 text-xl border-b border-gray-300 dark:border-gray-800 dark:text-white"
      />
    </View>
  );
}
