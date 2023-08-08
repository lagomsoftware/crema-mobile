import Button from "../components/button";
import Input from "../components/input";
import { ArrowRight } from "lucide-react-native";
import { Formik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      className="flex-1 dark:bg-gray-900"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={console.log}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View className="p-5 pt-16">
              <Image
                className="h-16"
                source={require("../assets/icon.png")}
                contentFit="contain"
                contentPosition="left"
              />

              <Text className="mt-8 text-3xl font-semibold dark:text-white">
                Welcome to Crema
              </Text>

              <View className="mt-8">
                <Input
                  onChangeText={handleChange("email")}
                  placeholder="johanna.doe@email.com"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  label="Email"
                />

                <Input
                  onChangeText={handleChange("password")}
                  clearButtonMode="while-editing"
                  placeholder="••••••••••••••"
                  value={values.password}
                  label="Password"
                  className="mt-7"
                  secureTextEntry
                />
              </View>

              <Text className="mt-8 text-base dark:text-white">
                Don't have a profile yet?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-400 dark:text-indigo-300"
                >
                  Sign up here
                </Link>
              </Text>

              <Button
                onPress={() => handleSubmit()}
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
