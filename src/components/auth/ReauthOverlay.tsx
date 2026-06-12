import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Dimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { useLoginCustomerMutation } from "@/src/services/authApi";
import { setCredentials } from "@/src/store/authSlice";
import { RootState } from "@/src/store/store";
import { useToast } from "@/src/context/ToastContext";

// State View Components Keepers
import WelcomeBackState from "./reauth/WelcomeBackState";
import SigningInState from "./reauth/SigningInState";
import SignInFailedState from "./reauth/SignInFailedState";

const { width, height } = Dimensions.get("window");

type MachineState = "WELCOME_BACK" | "SIGNING_IN" | "SIGN_IN_FAILED";

export default function ReauthOverlay() {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  
  // Check active state memory credentials
  const savedUser = useSelector((state: RootState) => state.auth.user);
  const initialEmail = savedUser?.email || "";
  const savedName = savedUser?.fullName || "Authenticated User";

  const [viewState, setViewState] = useState<MachineState>("WELCOME_BACK");
  const [password, setPassword] = useState("");
  const [backendError, setBackendError] = useState("");
  
  // Dynamic email fallback storage handler
  const [typedEmail, setTypedEmail] = useState(initialEmail);

  const [loginCustomer] = useLoginCustomerMutation();

  // Clean formatting matching your real AuthForm component 
  const targetEmail = (initialEmail || typedEmail).trim().toLowerCase();

  // Phase 1: Sign In Credentials Check
  const handlePasswordSubmit = async () => {
    if (!targetEmail) {
      showToast("Please enter a valid email address first.", "warning");
      return;
    }
    if (!password) return;

    setViewState("SIGNING_IN"); // 🌟 Bring back the fullscreen status loader step

    try {
      const result = await loginCustomer({
        loginType: "email",
        identifier: targetEmail,
        password: password,
      }).unwrap();

      const loginData = result?.data as any;

      if (loginData?.accessToken) {
        dispatch(setCredentials(result.data));
        showToast("Welcome back!", "success");
      }
    } catch (err: any) {
      setBackendError(
        err?.data?.error?.message || 
        err?.data?.message || 
        "Check your email, phone number, or password and try again."
      );
      setViewState("SIGN_IN_FAILED");
    }
  };

  return (
    <View style={styles.masterWrapper}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <MySafeAreaView style={styles.safeContainer}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {viewState === "WELCOME_BACK" && (
              <WelcomeBackState
                savedName={savedName}
                hasSavedEmail={!!initialEmail}
                emailValue={typedEmail}
                onEmailChange={setTypedEmail}
                passwordValue={password}
                onPasswordChange={setPassword}
                onSubmit={handlePasswordSubmit}
              />
            )}

            {viewState === "SIGNING_IN" && <SigningInState />}

            {viewState === "SIGN_IN_FAILED" && (
              <SignInFailedState
                savedEmail={targetEmail}
                errorMessage={backendError}
                onTryAgain={() => {
                  setPassword("");
                  setViewState("WELCOME_BACK"); 
                }}
              />
            )}

          </ScrollView>
        </MySafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  masterWrapper: { position: "absolute", top: 0, left: 0, width, height, zIndex: 999999, backgroundColor: "#000" },
  backgroundImage: { width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40, minHeight: "100%", justifyContent: "center" },
});