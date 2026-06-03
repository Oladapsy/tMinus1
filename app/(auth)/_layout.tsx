import { Stack } from "expo-router";
import { Colors } from "@/src/constants/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Stack.Screen name="signin/index" />
      <Stack.Screen name="signup/setup-profile" />
      <Stack.Screen name="otp/index" />
    </Stack>
  );
}