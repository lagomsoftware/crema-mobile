import { format } from "date-fns";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Link } from "expo-router";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeanIcon,
  PlusIcon,
  SettingsIcon,
  TimerIcon,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import Card from "../../components/card";
import ShotDataRow from "../../components/shot-data-row";
import { trpc } from "../../lib/trpc";
import { useRefetchOnFocus } from "../../lib/utils";

const SHOT_HEIGHT = 266;

export default function Home() {
  const { data, isLoading, refetch } = trpc.shot.list.useQuery();
  const colorScheme = useColorScheme();

  useRefetchOnFocus(refetch);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Handlers
  async function handleRefresh() {
    setRefreshing(true);

    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });

    await refetch();

    setRefreshing(false);
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor:
          colorScheme === "light" ? colors.stone[100] : colors.stone[950],
      }}
    >
      <Link href="/home/new-shot" asChild>
        <TouchableOpacity
          onPress={() => {
            impactAsync(ImpactFeedbackStyle.Light);
          }}
          className="absolute z-10 items-center justify-center bg-emerald-700 dark:bg-emerald-700 rounded-full w-[72] h-[72] bottom-[22] right-[17] shadow-xl shadow-emerald-600/50 dark:shadow-gray-950"
        >
          <PlusIcon size={40} stroke="white" strokeWidth={1.5} />
        </TouchableOpacity>
      </Link>

      {data ? (
        <FlatList
          data={data}
          keyExtractor={(shot) => shot.id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          renderItem={({ item: shot, index: i }) => (
            <Link asChild href="/profile" className="mb-5">
              <TouchableOpacity>
                <Card>
                  <Card.Content>
                    <View className="flex-row justify-between align-baseline">
                      <Text className="text-2xl font-medium dark:text-white">
                        {format(new Date(shot.createdAt), "MMM dd")}
                      </Text>

                      <View className="flex-row items-center">
                        <Text className="text-base text-gray-500 dark:text-gray-500">
                          Shot #{data?.length - i}
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
                        value={shot.bean?.name ?? "N/A"}
                      />
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Link>
          )}
          getItemLayout={(_, index) => ({
            offset: SHOT_HEIGHT * index,
            length: SHOT_HEIGHT,
            index,
          })}
        />
      ) : isLoading ? (
        <View className="p-5">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View className="p-5">
          <Text className="text-base text-red-600 dark:text-rose-400">
            Oh no! We couldn't retrieve your shot history. Try refreshing and
            see if it helps. If the issue continues, please get in touch with
            us.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
