import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import NavigateIconText from "@/src/components/common/NavigateIconText";
import { Colors } from "@/src/constants/colors";
import { StyleSheet } from "react-native";
import Cancel from "@/assets/icons/main/cancel.svg";
import AuthTabs from "@/src/components/auth/AuthTabs";
import { useState } from "react";
import SignInForm from "@/src/components/auth/forms/SignInForm";
import SignUpForm from "@/src/components/auth/forms/SignUpForm";

export default function SignInScreen() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <MySafeAreaView style={style.container}>
      <NavigateIconText icon={<Cancel color={Colors.secondary} />} />

      {/* The tab */}
      <AuthTabs
        tabs={["Sign In", "Sign Up"]}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 0 ? <SignInForm /> : <SignUpForm />}
    </MySafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
});
