
import { Colors } from "@/src/constants/colors";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Cancel from "@/assets/icons/main/cancel.svg";
import { useState } from "react";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import NavigateIconText from "@/src/features/shared/components/NavigateIconText";
import AuthTabs from "@/src/features/auth/components/auth/AuthTabs";
import SignInForm from "@/src/features/auth/components/auth/forms/SignInForm";
import SignUpForm from "@/src/features/auth/components/auth/forms/SignUpForm";


export default function SignInScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MySafeAreaView style={style.container}>
      {/* Keyboard Avoiding View prevents the software keyboard from overlapping inputs */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.flexContainer}
      >
        <View style={style.headerWrapper}>
          <NavigateIconText
            icon={<Cancel color={Colors.secondary} />}
            onClickIcon={() => console.log("Can't go back")}
          />
        </View>

        {/* The tab navigation */}
        <AuthTabs
          tabs={["Sign In", "Sign Up"]}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />

        {/* 🌟 SCROLL VIEW ENGINE: Absorbs dynamic layout expansion gracefully */}
        <ScrollView
          style={style.scrollEngine}
          contentContainerStyle={style.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === 0 ? <SignInForm /> : <SignUpForm />}
        </ScrollView>
      </KeyboardAvoidingView>
    </MySafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  flexContainer: {
    flex: 1,
  },
  headerWrapper: {
    marginTop: 5,
    // marginBottom: 10,
  },
  scrollEngine: {
    flex: 1,
    // marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
});
