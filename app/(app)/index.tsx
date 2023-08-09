import Screen from "../../components/screen";
import { Text, View } from "react-native";
import { format } from "date-fns";
import { trpc } from "../../lib/trpc";

export default function Home() {
  const { data, loading, error, refetch } = trpc.shot.list.useQuery();

  return (
    <Screen heading="Shots" onRefresh={refetch}>
      <View className="space-y-4">
        {data?.map((shot, i) => (
          <View key={shot.id} className="p-3.5 dark:bg-gray-800 rounded-md">
            <Text className="text-xl font-medium dark:text-white">
              {format(new Date(shot.createdAt), "MMM dd")}
            </Text>

            <View className="flex-row items-center mt-1.5">
              <Text className="text-base text-gray-500 dark:text-neutral-400">
                Shot #{+1}
              </Text>

              <Text className="ml-2 mr-1.5 text-base text-gray-400 dark:text-neutral-500">
                •
              </Text>

              <Text className="text-base text-gray-500 dark:text-neutral-400">
                {format(new Date(shot.createdAt), "HH:mm")}
              </Text>
            </View>

            <View className="mt-4 space-y-3">
              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-gray-500 dark:text-gray-400">Dose</Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="dark:text-white">
                  {shot.dose}{" "}
                  <Text className="text-gray-500 dark:text-gray-400">g</Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-gray-500 dark:text-gray-400">Yield</Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="dark:text-white">
                  {shot.yield}{" "}
                  <Text className="text-gray-500 dark:text-gray-400">g</Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-gray-500 dark:text-gray-400">
                  Duration
                </Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="dark:text-white">
                  {shot.duration}{" "}
                  <Text className="text-gray-500 dark:text-gray-400">sec</Text>
                </Text>
              </View>

              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-gray-500 dark:text-gray-400">
                  Grind setting
                </Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="dark:text-white">
                  {typeof shot.grindSetting === "number"
                    ? shot.grindSetting
                    : "N/A"}
                </Text>
              </View>

              <View className="flex-row items-center justify-between space-x-4">
                <Text className="text-gray-500 dark:text-gray-400">Coffee</Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="text-right dark:text-white">
                  {shot.coffee ?? "N/A"}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}
