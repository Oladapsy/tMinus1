import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow"; // Reusing your beautiful custom row component!
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function RegisteredDevicesScreen() {
  // Pure static configurations clean mapped from the screen design mockup
  const devicesData = [
    {
      id: "1",
      title: "iPhone 15 Pro",
      subtitle: "iOS · Push enabled",
      badgeText: "Current",
    },
    {
      id: "2",
      title: "Chrome browser",
      subtitle: "Web · Last seen today",
      badgeText: "Active",
    },
    {
      id: "3",
      title: "Expo Go",
      subtitle: "Android · Last seen yesterday",
      badgeText: "", // Empty string means no badge shows up on the right flank, matching item 3!
    },
  ];

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header configuration matching screen image exactly */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Devices"
              paragraph="Registered devices for push notification and session awareness."
            />
          </View>

          {/* Core Device Component List Stack utilizing your shared row blueprint */}
          <View style={styles.deviceListWrapper}>
            {devicesData.map((device) => (
              <ProfileOptionRow
                key={device.id}
                title={device.title}
                subtitle={device.subtitle}
                badgeText={device.badgeText}
              />
            ))}
          </View>

          {/* Bottom Calm State Message Box Panel matching the screenshot mockups */}
          <View style={styles.unknownAlertBox}>
            <Text style={styles.alertBoxTitleText}>No unknown devices</Text>
            <Text style={styles.alertBoxDescText}>
              New device alerts appear here after sign in from another device.
            </Text>
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  pageTitle: { marginTop: 24, marginBottom: 28 },
  deviceListWrapper: { width: "100%", flexDirection: "column", gap: 12 },
  unknownAlertBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 24,
    marginTop: 32,
    width: "100%",
    minHeight: 120,
    justifyContent: "center",
    gap: 8,
  },
  alertBoxTitleText: {
    color: Colors.newWhite,
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  alertBoxDescText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontFamily: FontFamily.regular,
    lineHeight: 18,
  },
});
