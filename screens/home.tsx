import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BeanIcon,
  PlusIcon,
  SettingsIcon,
  TablePropertiesIcon,
  TimerIcon,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

import Button from "../components/button";
import Card from "../components/card";
import Screen from "../components/screen";
import ShotDataRow from "../components/shot-data-row";
import { trpc } from "../lib/trpc";
import { useRefetchOnFocus } from "../lib/utils";
import { HomeNavigationProp } from "../types/navigation";

const { width } = Dimensions.get("window");

const SHOT_WIDTH = width - 15 - 40;

const SHOT_GAP = 40;

const HALF_SHOT_GAP = SHOT_GAP / 2;

export default function Home() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<HomeNavigationProp>();

  // Server state
  const { data, isLoading, refetch } = trpc.shot.list.useQuery();

  // Side-effects
  useRefetchOnFocus(refetch);

  // Helpers
  const renderShot = useCallback(
    ({ item: shot, index: i, ...rest }) => (
      <TouchableOpacity
        onPress={() => {
          impactAsync(ImpactFeedbackStyle.Light);
          Alert.alert("Coming soon");
        }}
        style={{
          width: SHOT_WIDTH,
          marginLeft: i === 0 ? HALF_SHOT_GAP : 0,
          marginRight: HALF_SHOT_GAP,
        }}
      >
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

              <ShotDataRow
                value={shot.strength ? `${shot.strength}/10` : "N/A"}
                style={{ fontVariant: ["tabular-nums"] }}
                label="Strength"
                icon={BeanIcon}
              />

              <ShotDataRow
                value={shot.acidity ? `${shot.acidity}/10` : "N/A"}
                style={{ fontVariant: ["tabular-nums"] }}
                icon={BeanIcon}
                label="Acidity"
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ),
    [data],
  );

  return (
    <Screen
      onRefresh={refetch}
      contentContainerStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      {data ? (
        <View className="space-y-4">
          {data.length ? (
            <FlatList
              horizontal
              data={data}
              decelerationRate="fast"
              initialNumToRender={2}
              maxToRenderPerBatch={3}
              keyExtractor={(shot) => shot.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20 }}
              snapToOffsets={data.map((_, i) => {
                return SHOT_WIDTH * i + HALF_SHOT_GAP * i;
              })}
              renderItem={renderShot}
              getItemLayout={(_, i) => {
                return {
                  index: i,
                  length: SHOT_WIDTH,
                  offset: SHOT_WIDTH * i,
                };
              }}
            />
          ) : (
            <View className="p-5">
              <View className="items-center justify-center px-5 border-2 border-gray-300 border-dashed dark:border-gray-800 rounded-lg py-7">
                <View className="items-center justify-center w-16 h-16 rounded-full bg-emerald-200 dark:bg-emerald-950">
                  <TablePropertiesIcon
                    size={30}
                    color={
                      { light: colors.emerald[500], dark: colors.emerald[500] }[
                        colorScheme
                      ]
                    }
                  />
                </View>

                <Text className="mt-4 text-xl font-semibold text-center text-gray-700 dark:text-white">
                  No shots
                </Text>

                <Text className="max-w-sm mt-2 text-base text-center text-gray-500 dark:text-gray-400">
                  You don't seem to have{"\n "}added any shots yet.
                </Text>
              </View>
            </View>
          )}

          <View className="px-5">
            <Button
              icon={PlusIcon}
              onPress={() => {
                navigation.navigate("NewShot");
              }}
            >
              New shot
            </Button>
          </View>
        </View>
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
    </Screen>
  );
}
