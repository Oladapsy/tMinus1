import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import ProfileOptionRow from "@/src/components/profile/ProfileOptionRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React, { useState } from "react";
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function PriceAlertsScreen() {
  // Static dataset mirroring the middle screen of Screenshot 2026-06-08 at 1.47.11 AM.png
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      title: "BTC above $72,000",
      subtitle: "Active · push notification on",
      badgeText: "On",
    },
    {
      id: "2",
      title: "ETH below $2,900",
      subtitle: "Paused",
      badgeText: "Off", // Will handle red/off state styling safely
    },
    {
      id: "3",
      title: "SOL above $170",
      subtitle: "Triggered today",
      badgeText: "Read",
    },
  ]);

  // Handle showing the inline delete confirmation dialog shown in the mockup
  const [showDeleteModal, setShowDeleteModal] = useState(true);

  const handleCreateAlert = () => {
    console.log("Navigate to or open create alert modal flow");
  };

  const handleDeleteAlert = () => {
    // Simulates deleting the target alert
    setAlerts((prev) => prev.filter((a) => a.id !== "1"));
    setShowDeleteModal(false);
  };

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
          {/* Header sector matching configuration */}
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Price alerts"
              paragraph="Create, edit, pause, or delete market alerts."
            />
          </View>

          {/* Primary Action Button Positioned at Top */}
          <View style={styles.actionBtnWrapper}>
            <PrimaryButton
              text="Create alert"
              Bgcolor={Colors.green}
              textColor={Colors.newDark}
              onPress={handleCreateAlert}
              fontSize={17}
              style={{ fontfamily: FontFamily.bold }}
            />
          </View>

          {/* Alert Configuration Stack Row List */}
          <View style={styles.listWrapper}>
            {alerts.map((alert) => (
              <ProfileOptionRow
                key={alert.id}
                title={alert.title}
                subtitle={alert.subtitle}
                badgeText={alert.badgeText}
                onPress={() =>
                  console.log("Edit or toggle alert configurations", alert.id)
                }
              />
            ))}
          </View>

          {/* Inline Target Confirmation Dialog Overlay Panel Box */}
          {showDeleteModal && (
            <View style={styles.deleteDialogBox}>
              <Title
                text="Delete alert?"
                color={Colors.newWhite}
                size={15}
                fontFamily={FontFamily.bold}
              />
              <View style={styles.dialogDescMargin}>
                <Paragraph
                  text="This removes the BTC above $72,000 alert from your list."
                  color={Colors.newSecondary}
                  size={12.5}
                  lineHeight={17}
                  textAlign="left"
                />
              </View>

              <View style={styles.dialogActionsRow}>
                <Pressable
                  style={styles.cancelActionBtn}
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteActionBtn}
                  onPress={handleDeleteAlert}
                >
                  <Text style={styles.deleteBtnText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
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
    marginBottom: 20,
  },
  actionBtnWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  listWrapper: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
  },
  deleteDialogBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
    marginTop: 48,
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
  },
  dialogDescMargin: {
    width: "100%",
    marginTop: 8,
    marginBottom: 20,
  },
  dialogActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  cancelActionBtn: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  deleteActionBtn: {
    flex: 1,
    backgroundColor: "#FF4D4D", // Soft red/coral button color from design mockup
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnText: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
});
