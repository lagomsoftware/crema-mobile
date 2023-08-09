import { Link } from "expo-router";
import Screen from "../../components/screen";

export default function Home() {
  return (
    <Screen heading="Shots">
      <Link href="/profile">Profile</Link>
    </Screen>
  );
}
