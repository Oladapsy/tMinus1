import { ToastProvider } from "@/src/context/ToastContext";
import { store } from "@/src/store/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "NeueMontreal-Regular": require("@/assets/fonts/NeueMontreal-Regular.otf"),
    "NeueMontreal-Medium": require("@/assets/fonts/NeueMontreal-Medium.otf"),
    "NeueMontreal-Bold": require("@/assets/fonts/NeueMontreal-Bold.otf"),
    "NeueMontreal-Light": require("@/assets/fonts/NeueMontreal-Light.otf"),
    "NeueMontreal-Italic": require("@/assets/fonts/NeueMontreal-Italic.otf"),
    "NeueMontreal-MediumItalic": require("@/assets/fonts/NeueMontreal-MediumItalic.otf"),
    "NeueMontreal-BoldItalic": require("@/assets/fonts/NeueMontreal-BoldItalic.otf"),
    "NeueMontreal-LightItalic": require("@/assets/fonts/NeueMontreal-LightItalic.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        {" "}
        {/* <-- Must go here */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </Provider>
  );
}
