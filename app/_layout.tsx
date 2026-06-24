import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector } from "react-redux";

import { ToastProvider } from "@/src/context/ToastContext";
import { store, RootState } from "@/src/store/store";
import ReauthOverlay from "@/src/components/auth/ReauthOverlay";


// Prevent splash screen from auto-hiding until assets and flags are fully verified
SplashScreen.preventAutoHideAsync();

// for the onboarding screen
import AsyncStorage from '@react-native-async-storage/async-storage';


// 1. Inner wrapper that sits safely inside the Redux context
function RootNavigationContent() {
  // Listen directly for session expiration flags
  const isSessionExpired = useSelector((state: RootState) => state.auth.isSessionExpired);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* 🌟 THE GLOBAL SECURITY LAYER */}
      {/* Floating independently above all router navigation stacks */}
      {isSessionExpired && <ReauthOverlay />}
    </>
  );
}

// 2. Core Root Layout wrapper running asset preloads
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
        <RootNavigationContent />
      </ToastProvider>
    </Provider>
  );
}