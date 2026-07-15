import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ToastProvider } from "@/src/context/ToastContext";
import { store, RootState } from "@/src/store/store";
import ReauthOverlay from "@/src/features/auth/components/auth/ReauthOverlay";

// Prevent splash screen from auto-hiding until assets and flags are fully verified
SplashScreen.preventAutoHideAsync();

function RootNavigationContent({ isAppReady }: { isAppReady: boolean }) {
  const router = useRouter();
  const segments = useSegments();

  // 🌟 Grab your high-fidelity session states perfectly aligned with authSlice.ts!
  const isSessionExpired = useSelector(
    (state: RootState) => state.auth.isSessionExpired,
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    if (!isAppReady) return;

    // Determine current route stack layout location
    const inTabsGroup = segments[0] === "(tabs)";
    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";
    const inProfileGroup = segments[0] === "profile"; // 🌟 1. Detect if user is in profile section

    AsyncStorage.getItem("HAS_LAUNCHED_BEFORE").then((value) => {
      if (value === null) {
        // 🆕 TRUE FIRST TIME LAUNCH: Force navigation straight to onboarding layout screen
        if (!inOnboardingGroup) {
          router.replace("/(onboarding)");
        }
      } else if (!isAuthenticated) {
        // 🔒 NOT LOGGED IN: Force path backward into sign-in loop
        if (!inAuthGroup) {
          router.replace("/(auth)/signin");
        }
      } else {
        // 🔓 ACCOUNT VERIFIED: Send user straight to their personalized dashboard tab grids
        if (!inTabsGroup && !inProfileGroup) {
          router.replace("/(tabs)/home");
        }
      }
    });
  }, [isAppReady, isAuthenticated, segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* GLOBAL SECURITY LAYER */}
      {isSessionExpired && <ReauthOverlay />}
    </>
  );
}

export default function RootLayout() {
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "NeueMontreal-Regular": require("@/assets/fonts/NeueMontreal-Regular.otf"),
    "NeueMontreal-Medium": require("@/assets/fonts/NeueMontreal-Medium.otf"),
    "NeueMontreal-Bold": require("@/assets/fonts/NeueMontreal-Bold.otf"),
    "NeueMontreal-Light": require("@/assets/fonts/NeueMontreal-Light.otf"),
    "NeueMontreal-Italic": require("@/assets/fonts/NeueMontreal-Italic.otf"),
    "NeueMontreal-MediumItalic": require("@/assets/fonts/NeueMontreal-MediumItalic.otf"),
    "NeueMontreal-BoldItalic": require("@/assets/fonts/NeueMontreal-BoldItalic.otf"),
    "NeueMontreal-LightItalic": require("@/assets/fonts/NeueMontreal-LightItalic.otf"),
  });

  // Verify storage states are safely loaded before hiding native splash views
  useEffect(() => {
    async function prepareApp() {
      try {
        await AsyncStorage.getItem("HAS_LAUNCHED_BEFORE");
      } catch (e) {
        console.warn(e);
      } finally {
        setIsStorageReady(true);
      }
    }
    prepareApp();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && isStorageReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isStorageReady]);

  if (!fontsLoaded && !fontError) return null;
  if (!isStorageReady) return null;

  return (
    <Provider store={store}>
      <ToastProvider>
        <RootNavigationContent isAppReady={fontsLoaded && isStorageReady} />
      </ToastProvider>
    </Provider>
  );
}
