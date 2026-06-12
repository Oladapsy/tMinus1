import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { useLoginCustomerMutation } from "@/src/services/authApi";
import { setCredentials } from "@/src/store/authSlice";

// Sub-States
import WelcomeBackState from "@/src/components/auth/reauth/WelcomeBackState";
import SigningInState from "@/src/components/auth/reauth/SigningInState";
import SignInFailedState from "@/src/components/auth/reauth/SignInFailedState";

type MachineState = "WELCOME_BACK" | "SIGNING_IN" | "SIGN_IN_FAILED";

interface ReauthScreenProps {
  savedEmail?: string;
  savedName?: string;
  onSuccessCompletion?: () => void;
}

export default function ReauthScreen({
  savedEmail = "student@cryptoclass.test",
  savedName = "Student",
  onSuccessCompletion,
}: ReauthScreenProps) {
  const dispatch = useDispatch();
  const [viewState, setViewState] = useState<MachineState>("WELCOME_BACK");
  const [password, setPassword] = useState("");
  const [backendError, setBackendError] = useState("");

  const [loginCustomer] = useLoginCustomerMutation();

  const handleReauthSubmit = async () => {
    if (!password) return;

    setViewState("SIGNING_IN");
    setBackendError("");

    try {
      const result = await loginCustomer({
        loginType: "email",
        identifier: savedEmail,
        password: password,
      }).unwrap();

      if (result?.data) {
        dispatch(setCredentials(result.data));
        if (onSuccessCompletion) onSuccessCompletion();
      }
    } catch (err: any) {
      setBackendError(err?.data?.error?.message || "Check your verification records and try again.");
      setViewState("SIGN_IN_FAILED");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {viewState === "WELCOME_BACK" && (
            <WelcomeBackState
              savedName={savedName}
              passwordValue={password}
              onPasswordChange={setPassword}
              onSubmit={handleReauthSubmit}
            />
          )}

          {viewState === "SIGNING_IN" && <SigningInState />}

          {viewState === "SIGN_IN_FAILED" && (
            <SignInFailedState
              savedEmail={savedEmail}
              errorMessage={backendError}
              onTryAgain={() => setViewState("WELCOME_BACK")}
            />
          )}

        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
});