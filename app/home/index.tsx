import { format } from "date-fns";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Link, Stack } from "expo-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeanIcon,
  PlusIcon,
  SettingsIcon,
  TimerIcon,
} from "lucide-react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Card from "../../components/card";
import Screen from "../../components/screen";
import ShotDataRow from "../../components/shot-data-row";
import { trpc } from "../../lib/trpc";

export default function Home() {
  const insets = useSafeAreaInsets();

  const { data, isLoading, refetch } = trpc.shot.list.useQuery();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link asChild href="/home/profile">
              <TouchableOpacity className="items-center justify-center w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-800">
                <Text className="text-base dark:text-gray-300">AG</Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Screen
        heading="My shots"
        onRefresh={refetch}
        footer={
          <View
            className="absolute px-5"
            style={{
              bottom: insets.bottom || 20,
              right: insets.right,
              left: insets.left,
            }}
          >
            <Link href="/home/new-shot/dose" asChild>
              <TouchableOpacity
                className="absolute z-10 items-center justify-center bg-green-600 dark:bg-emerald-700 rounded-full w-[72] h-[72] bottom-[22] right-[17] shadow-xl shadow-emerald-600 dark:shadow-gray-950"
                onPressIn={() => {
                  impactAsync(ImpactFeedbackStyle.Medium);
                }}
              >
                <PlusIcon size={40} stroke="white" strokeWidth={1.5} />
              </TouchableOpacity>
            </Link>
          </View>
        }
      >
        {data ? (
          <View className="space-y-[18]">
            {data?.map((shot, i) => (
              <Link key={shot.id} asChild href="/profile">
                <TouchableOpacity>
                  <Card>
                    <View className="flex-row justify-between align-baseline">
                      <Text className="text-2xl font-medium dark:text-white">
                        {format(new Date(shot.createdAt), "MMM dd")}
                      </Text>

                      <View className="flex-row items-center">
                        <Text className="text-base text-gray-500 dark:text-gray-500">
                          Shot #{data.length - i}
                        </Text>

                        <Text className="ml-2 mr-1.5 text-base text-gray-400 dark:text-gray-600">
                          •
                        </Text>

                        <Text className="text-base text-gray-500 dark:text-gray-500">
                          {format(new Date(shot.createdAt), "HH:mm")}
                        </Text>
                      </View>
                    </View>

                    <View className="mt-4 space-y-2.5">
                      <ShotDataRow
                        icon={ArrowRightIcon}
                        label="Dose"
                        value={shot.dose}
                        suffix="g"
                      />

                      <ShotDataRow
                        icon={ArrowLeftIcon}
                        label="Yield"
                        value={shot.yield}
                        suffix="g"
                      />

                      <ShotDataRow
                        icon={TimerIcon}
                        label="Extraction"
                        value={shot.duration}
                        suffix="s"
                      />

                      <ShotDataRow
                        icon={SettingsIcon}
                        label="Grind"
                        value={
                          typeof shot.grindSetting === "number"
                            ? shot.grindSetting
                            : "N/A"
                        }
                      />

                      <ShotDataRow
                        icon={BeanIcon}
                        label="Bean"
                        value={shot.coffee ?? "N/A"}
                      />
                    </View>
                  </Card>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        ) : isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text className="text-base text-red-600 dark:text-rose-400">
            Oh no! We couldn't retrieve your shot history. Try refreshing and
            see if it helps. If the issue continues, please get in touch with
            us.
          </Text>
        )}
      </Screen>
    </>
  );
}
