import { LogOutIcon } from "lucide-react-native";
import { useContext } from "react";

import Button from "../components/button";
import Screen from "../components/screen";
import AuthContext from "../lib/context/auth";

export default function Profile() {
  const { setToken } = useContext(AuthContext);

  return (
    <Screen contentContainerStyle={{ paddingTop: 20 }}>
      <Button
        variant="danger"
        icon={LogOutIcon}
        onPress={() => {
          setToken(undefined);
        }}
      >
        Log out
      </Button>
    </Screen>
  );
}
