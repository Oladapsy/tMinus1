
import LiteProfileScreen from "@/src/features/profile/screens/LiteProfileScreen";
import ProfileScreen from "@/src/features/profile/screens/ProfileScreen";
import React from "react";

export default function Index() {
  // for the old and new switch
  const isProVersion = false;

  if (isProVersion) {
    return <ProfileScreen />;
  }

  return <LiteProfileScreen />;
}
