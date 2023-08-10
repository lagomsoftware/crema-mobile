import AuthContext from "../../lib/context/auth";
import Button from "../../components/button";
import Screen from "../../components/screen";
import { useContext } from "react";

export default function Profile() {
  const { setToken } = useContext(AuthContext);

  return (
    <Screen heading="My profile">
      <Button
        onPress={() => {
          setToken(undefined);
        }}
      >
        Log out
      </Button>
    </Screen>
  );
}
