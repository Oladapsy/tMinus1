import React from "react";
import ProfileScreen from "@/src/screens/profile/ProfileScreen";
import LiteProfileScreen from "@/src/screens/profile/LiteProfileScreen";

export default function Index() {
  // for the old and new switch
  const isProVersion = false;

  if (isProVersion) {
    return <ProfileScreen />;
  }

  return <LiteProfileScreen />;
}
