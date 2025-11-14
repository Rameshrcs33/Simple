import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to Tabs -> Home
  return <Redirect href="/login" />;
}
