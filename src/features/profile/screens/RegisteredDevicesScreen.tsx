import BackHeader from "@/src/components/common/BackHeader";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import Title from "@/src/components/common/Title";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import {
  useGetRegisteredDevicesQuery,
  useRemoveDeviceMutation,
  DeviceItem,
} from "@/src/services/profileApi";

export default function RegisteredDevicesScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  const { data: response, isLoading } = useGetRegisteredDevicesQuery();
  const [removeDevice, { isLoading: isDeleting }] = useRemoveDeviceMutation();

  const devicesList = response?.data || [];

  const handleDeviceAction = (device: DeviceItem) => {
    // Prevent deleting the local simulated fallback item
    if (device.id === "current-local") return;

    Alert.alert(
      "Revoke Access",
      `Are you sure you want to unregister this ${device.platform.toUpperCase()} session container?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removeDevice(device.id).unwrap();
              showToast?.("Device cleared successfully.", "success");
            } catch (err: any) {
              showToast?.(
                err?.data?.message || "Failed to remove item.",
                "error",
              );
            }
          },
        },
      ],
    );
  };

  if (isLoading || isDeleting) {
    return (
      <View
        style={[
          styles.centerContainer,
          { backgroundColor: Colors.newBlack || "#000" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

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
          <View style={styles.pageTitle}>
            <BackHeader
              title="Devices"
              paragraph="Registered devices for push notification and session awareness."
              onBack={() => router.back()}
            />
          </View>

          <View style={styles.deviceListWrapper}>
            {/* 🌟 FALLBACK: If API list is empty, show the current active phone session info */}
            {devicesList.length === 0 ? (
              <ProfileOptionRow
                title={
                  Platform.OS === "ios" ? "Apple iPhone" : "Android Device"
                }
                subtitle={`${Platform.OS.toUpperCase()} · Active Now`}
                badgeText="Current"
                onPress={() => {}}
              />
            ) : (
              devicesList.map((device: DeviceItem, index: number) => {
                const dateObj = new Date(device.lastSeenAt);
                const structuredTime = isNaN(dateObj.getTime())
                  ? "Active Session"
                  : `Last seen ${dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;

                const isCurrentDevice = index === 0;

                return (
                  <ProfileOptionRow
                    key={device.id}
                    title={
                      device.platform.toUpperCase() === "IOS"
                        ? "Apple iPhone"
                        : "Android Device"
                    }
                    subtitle={`${device.platform.toUpperCase()} · ${structuredTime}`}
                    badgeText={isCurrentDevice ? "Current" : "Active"}
                    onPress={() => handleDeviceAction(device)}
                  />
                );
              })
            )}
          </View>

          <View style={styles.unknownAlertBox}>
            <Title
              text={
                devicesList.length > 1 ? "Review Devices" : "No unknown devices"
              }
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
    gap: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
