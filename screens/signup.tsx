import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { ArrowRight } from "lucide-react-native";
import { useContext } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/button";
import Input from "../components/input";
import AuthContext from "../lib/context/auth";
import { trpc } from "../lib/trpc";
import { SignupNavigationProp } from "../types/navigation";

export default function Signup() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SignupNavigationProp>();

  // Global state
  const { setToken } = useContext(AuthContext);

  // Server state
  const { mutateAsync, isLoading } = trpc.auth.signup.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: () => {
      Alert.alert("Failed to sign up");
    },
    retry: false,
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 dark:bg-gray-950"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            mutateAsync(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View className="p-5 pt-16">
              <Text className="mt-8 text-4xl font-semibold dark:text-white">
                Sign up to Crema
              </Text>

              <View className="mt-6">
                <Input
                  onChangeText={handleChange("email")}
                  placeholder="johanna.doe@email.com"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={values.email}
                  label="Email"
                />

                <Input
                  onChangeText={handleChange("name")}
                  clearButtonMode="while-editing"
                  placeholder="Johanna Doe"
                  autoCapitalize="words"
                  value={values.name}
                  className="mt-7"
                  label="Name"
                />

                <Input
                  onChangeText={handleChange("password")}
                  clearButtonMode="while-editing"
                  placeholder="••••••••••••••"
                  autoComplete="new-password"
                  value={values.password}
                  autoCapitalize="none"
                  label="Password"
                  className="mt-7"
                  secureTextEntry
                />

                <Input
                  onChangeText={handleChange("confirmPassword")}
                  clearButtonMode="while-editing"
                  placeholder="••••••••••••••"
                  value={values.confirmPassword}
                  label="Confirm password"
                  autoCapitalize="none"
                  className="mt-7"
                  secureTextEntry
                />
              </View>

              <View className="flex-row items-center gap-2 flex-wrap mt-8">
                <Text className="mt-8 text-base dark:text-white">
                  Already have a profile?
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text className="text-base text-indigo-400 dark:text-indigo-300">
                    Log in here
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                onPress={() => handleSubmit()}
                isLoading={isLoading}
                className="mt-10"
                icon={ArrowRight}
              >
                Sign up
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
