import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import PriceAlertRow from "@/src/components/profile/PriceAlertRow";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useToast } from "@/src/context/ToastContext";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PriceAlertItem {
  id: string;
  title: string;
  subtitle: string;
  badgeText: "On" | "Off" | "Read";
}

export default function PriceAlertsScreen() {
  const { showToast } = useToast();

  const [alerts, setAlerts] = useState<PriceAlertItem[]>([
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
      badgeText: "Off",
    },
    {
      id: "3",
      title: "SOL above $170",
      subtitle: "Triggered today",
      badgeText: "Read",
    },
  ]);

  // Track state targets for interactive deletions safely
  const [activeDeleteTarget, setActiveDeleteTarget] =
    useState<PriceAlertItem | null>(null);

  const handleCreateAlert = () => {
    // showToast("Opening alert creation panel...");
    console.log("Opening alert creation panel...");
  };

  // 1. Tapping an item switches its active states or prompts modal deletion
  const handleRowInteraction = (item: PriceAlertItem) => {
    // If it's already triggered (Read), prompt the user to delete it
    if (item.badgeText === "Read") {
      setActiveDeleteTarget(item);
    } else {
      // Otherwise, toggle its state between active (On) and paused (Off)
      setAlerts((prev) =>
        prev.map((alert) => {
          if (alert.id === item.id) {
            const nextState = alert.badgeText === "On" ? "Off" : "On";
            showToast(
              `Alert set to ${nextState === "On" ? "Active" : "Paused"}`,
            );
            return {
              ...alert,
              badgeText: nextState,
              subtitle:
                nextState === "On" ? "Active · push notification on" : "Paused",
            };
          }
          return alert;
        }),
      );
    }
  };

  const executeDeleteAction = () => {
    if (!activeDeleteTarget) return;

    setAlerts((prev) => prev.filter((a) => a.id !== activeDeleteTarget.id));
    showToast(`Removed "${activeDeleteTarget.title}" alert.`);
    setActiveDeleteTarget(null);
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
          <View style={styles.pageTitle}>
            <TitleAndParagraph
              title="Price alerts"
              paragraph="Create, edit, pause, or delete market alerts."
            />
          </View>

          <View style={styles.actionBtnWrapper}>
            <PrimaryButton
              text="Create alert"
              Bgcolor={Colors.green}
              textColor={Colors.newDark}
              onPress={handleCreateAlert}
              fontSize={15}
              style={{ fontFamily: FontFamily.bold }}
            />
          </View>

          {/* Interactive Stack Row mapping */}
          <View style={styles.listWrapper}>
            {alerts.map((alert) => (
              <PriceAlertRow
                key={alert.id}
                item={alert}
                onPress={() => handleRowInteraction(alert)} // Toggles On / Off on simple tap
                onDeleteTrigger={() => setActiveDeleteTarget(alert)} // Opens the modal when the trash can is tapped!
              />
            ))}
          </View>

          {/* 3. DYNAMIC DELETE DIALOG: Only appears when a deletion target is active */}
          {activeDeleteTarget && (
            <View style={styles.deleteDialogBox}>
              <Title
                text="Delete alert?"
                color={Colors.newWhite}
                size={17}
                fontFamily={FontFamily.bold}
              />
              <View style={styles.dialogDescMargin}>
                <Paragraph
                  text={`This removes the ${activeDeleteTarget.title} alert from your tracking dashboard.`}
                  color={Colors.newSecondary}
                  size={12.5}
                  lineHeight={17}
                  textAlign="left"
                />
              </View>

              <View style={styles.dialogActionsRow}>
                <Pressable
                  style={styles.cancelActionBtn}
                  onPress={() => setActiveDeleteTarget(null)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteActionBtn}
                  onPress={executeDeleteAction}
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
    marginTop: 42,
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
    backgroundColor: Colors.newRed,
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
