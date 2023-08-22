import { useContext } from "react";

import Button from "../../components/button";
import Screen from "../../components/screen";
import AuthContext from "../../lib/context/auth";

export default function Profile() {
  const { setToken } = useContext(AuthContext);

  return (
    <Screen heading="My profile">
      <Button
        shape="pill"
        onPress={() => {
          setToken(undefined);
        }}
      >
        Log out
      </Button>
    </Screen>
  );
}
