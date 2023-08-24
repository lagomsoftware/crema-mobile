import { PlusIcon } from "lucide-react-native";
import { Alert, Text, View } from "react-native";

import Button from "../../components/button";
import Card from "../../components/card";
import Screen from "../../components/screen";
import { trpc } from "../../lib/trpc";

export default function Coffee() {
  // Server state
  const { data: beans, refetch: refetchBeans } = trpc.bean.list.useQuery();

  const { mutate: createBean, isLoading: isCreateBeanLoading } =
    trpc.bean.create.useMutation({
      onSuccess: () => {
        refetchBeans();
      },
    });

  // Handlers
  function handleCreateBean() {
    Alert.prompt("Bean name", "Enter the name of the bean", (text) => {
      if (text) {
        createBean({
          name: text,
        });
      }
    });
  }

  return (
    <Screen>
      <View className="space-y-7">
        {beans?.length ? (
          <Card divider className="w-full">
            {beans.map((bean) => (
              <Card.Content
                key={bean.id}
                className="flex-row justify-between px-4 py-3.5"
              >
                <Text className="text-lg dark:text-white">{bean.name}</Text>
              </Card.Content>
            ))}
          </Card>
        ) : null}

        <Button
          loading={isCreateBeanLoading}
          onPress={handleCreateBean}
          variant="secondary"
          icon={PlusIcon}
        >
          Add bean
        </Button>
      </View>
    </Screen>
  );
}
