import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Title from "@/src/components/common/Title";
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

// 🌟 Import your high-fidelity Alert Components directly!
import CreatePriceAlert from "@/src/components/market/component/CreatePriceAlert";
import AlertSuccessView from "@/src/components/market/component/AlertSuccessView";
import BackHeader from "@/src/components/common/BackHeader";
import { router } from "expo-router";

interface PriceAlertItem {
  id: string;
  title: string;
  subtitle: string;
  badgeText: "On" | "Off" | "Read";
}

// Internal navigation tracking view workflow states
type LocalWorkflowState = "list" | "create" | "success";

export default function PriceAlertsScreen() {
  const { showToast } = useToast();

  // Local state flow controller
  const [localStep, setLocalStep] = useState<LocalWorkflowState>("list");

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

  // Alert temporary creation cache state variable
  const [createdAlertInfo, setCreatedAlertInfo] = useState({
    symbol: "BTC",
    direction: "Above" as "Above" | "Below",
    targetPrice: "72,000",
  });

  const [activeDeleteTarget, setActiveDeleteTarget] =
    useState<PriceAlertItem | null>(null);

  // 1. Tapping an item switches its active states or prompts modal deletion
  const handleRowInteraction = (item: PriceAlertItem) => {
    if (item.badgeText === "Read") {
      setActiveDeleteTarget(item);
    } else {
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
        {/* 📋 STEP 1: RENDER THE STANDARD INTERACTIVE ALERTS LIST VIEW */}
        {localStep === "list" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pageTitle}>
              <BackHeader
                title="Price alerts"
                paragraph="Create, edit, pause, or delete market alerts."
                onBack={() => {router.back()}}
              />
            </View>

            <View style={styles.actionBtnWrapper}>
              <PrimaryButton
                text="Create alert"
                Bgcolor={Colors.green}
                textColor={Colors.newDark}
                onPress={() => setLocalStep("create")} // 🌟 Step right into the creation engine!
                fontSize={15}
                style={{ fontFamily: FontFamily.bold }}
              />
            </View>

            <View style={styles.listWrapper}>
              {alerts.map((alert) => (
                <PriceAlertRow
                  key={alert.id}
                  item={alert}
                  onPress={() => handleRowInteraction(alert)}
                  onDeleteTrigger={() => setActiveDeleteTarget(alert)}
                />
              ))}
            </View>

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
        )}

        {/* 🔔 STEP 2: SCREEN 7 - CREATE PRICE ALERT INPUT PANEL */}
        {localStep === "create" && (
          <CreatePriceAlert
            symbol="BTC"
            currentPrice={64200.5}
            onGoBack={() => setLocalStep("list")}
            onAlertCreated={(payload) => {
              // Cache data values safely
              setCreatedAlertInfo({
                symbol: payload.symbol,
                direction: payload.direction,
                targetPrice: payload.targetPrice,
              });

              // Dynamically append the new custom target item array placeholder into list memory state
              const newAlertItem: PriceAlertItem = {
                id: Date.now().toString(),
                title: `${payload.symbol} ${payload.direction.toLowerCase()} $${Number(payload.targetPrice).toLocaleString()}`,
                subtitle: "Active · push notification on",
                badgeText: "On",
              };
              setAlerts((prev) => [newAlertItem, ...prev]);

              // Advance directly forward to the success completion layout screen view
              setLocalStep("success");
            }}
          />
        )}

        {/* 🎉 STEP 3: SCREEN 8 - ALERT SUCCESS CONFIRMATION PANEL */}
        {localStep === "success" && (
          <AlertSuccessView
            symbol={createdAlertInfo.symbol}
            direction={createdAlertInfo.direction}
            targetPrice={createdAlertInfo.targetPrice}
            onClose={() => setLocalStep("list")} // Loops nicely back to updated lists tracking menu
          />
        )}
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
