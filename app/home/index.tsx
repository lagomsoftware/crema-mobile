import { format } from "date-fns";
import { Link } from "expo-router";
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
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../../components/button";
import Card from "../../components/card";
import Screen from "../../components/screen";
import ShotDataRow from "../../components/shot-data-row";
import { trpc } from "../../lib/trpc";
import { useRefetchOnFocus } from "../../lib/utils";

const { width } = Dimensions.get("window");

const SHOT_WIDTH = width - 15 - 40;

const SHOT_GAP = 40;

const HALF_SHOT_GAP = SHOT_GAP / 2;

export default function Home() {
  const { data, isLoading, refetch } = trpc.shot.list.useQuery();

  useRefetchOnFocus(refetch);

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
          <FlatList
            horizontal
            data={data}
            decelerationRate="fast"
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            keyExtractor={(shot) => shot.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
            snapToOffsets={data.map((_, i) => {
              return SHOT_WIDTH * i + HALF_SHOT_GAP * i;
            })}
            renderItem={({ item: shot, index: i }) => (
              <Link asChild href="/profile">
                <TouchableOpacity
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
              </Link>
            )}
          />

          <View className="px-5">
            <Link href="/home/new-shot" asChild>
              <Button icon={PlusIcon}>New shot</Button>
            </Link>
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
