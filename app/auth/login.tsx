import { Link } from "expo-router";
import { Formik } from "formik";
import { ArrowRight } from "lucide-react-native";
import { useContext } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../components/button";
import Input from "../../components/input";
import AuthContext from "../../lib/context/auth";
import { trpc } from "../../lib/trpc";

export default function Login() {
  const insets = useSafeAreaInsets();

  // Global state
  const { setToken } = useContext(AuthContext);

  // Server state
  const { mutateAsync, isLoading } = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: () => {
      Alert.alert("Failed to log in");
    },
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
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            mutateAsync(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View className="p-5 pt-16">
              <Text className="mt-8 text-4xl font-semibold dark:text-white">
                Welcome to Crema
              </Text>

              <View className="mt-6">
                <Input
                  onChangeText={handleChange("email")}
                  placeholder="johanna.doe@email.com"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  value={values.email}
                  label="Email"
                />

                <Input
                  onChangeText={handleChange("password")}
                  clearButtonMode="while-editing"
                  placeholder="••••••••••••••"
                  value={values.password}
                  autoComplete="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="Password"
                  className="mt-7"
                  secureTextEntry
                />
              </View>

              <Text className="mt-8 text-base dark:text-white">
                Don't have a profile yet?{" "}
                <Link
                  href="/auth/signup"
                  className="text-indigo-400 dark:text-indigo-300"
                >
                  Sign up here
                </Link>
              </Text>

              <Button
                onPress={() => handleSubmit()}
                isLoading={isLoading}
                className="mt-10"
                icon={ArrowRight}
              >
                Log in
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
