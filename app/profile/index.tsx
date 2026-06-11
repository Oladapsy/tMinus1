import LiteProfileScreen from "@/src/screens/profile/LiteProfileScreen";
import ProfileScreen from "@/src/screens/profile/ProfileScreen";
import React from "react";

export default function Index() {
  // for the old and new switch
  const isProVersion = false;

  if (isProVersion) {
    return <ProfileScreen />;
  }

  return <LiteProfileScreen />;
}
