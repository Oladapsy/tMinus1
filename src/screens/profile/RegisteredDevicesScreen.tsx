import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow"; // Reusing your beautiful custom row component!
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { router } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";

export default function RegisteredDevicesScreen() {
  // Pure static configurations use end point later
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
      badgeText: "",
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
            <BackHeader
              title="Devices"
              paragraph="Registered devices for push notification and session awareness."
              onBack={() => {router.back()}}
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
            <Title
              text="No unknown devices"
              color={Colors.newWhite}
              size={14}
              fontFamily={FontFamily.bold}
            />
            <Paragraph
              text="New device alerts appear here after sign in from another device."
              color={Colors.newSecondary}
              size={12}
              lineHeight={16}
              textAlign="left"
            />
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    marginTop: 24,
    marginBottom: 28,
  },
  deviceListWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
  },
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
});
