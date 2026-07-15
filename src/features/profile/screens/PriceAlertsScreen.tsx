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
  ActivityIndicator,
} from "react-native";

import CreatePriceAlert from "@/src/components/market/component/CreatePriceAlert";
import AlertSuccessView from "@/src/components/market/component/AlertSuccessView";
import BackHeader from "@/src/components/common/BackHeader";
import { useRouter } from "expo-router";

// 📡 Real API Connections
import {
  useGetPriceAlertsQuery,
  useUpdatePriceAlertMutation,
  useDeletePriceAlertMutation,
} from "@/src/features/profile/api/profileApi";
import { PriceAlertItem } from "@/src/types/alert";

type LocalWorkflowState = "list" | "create" | "success";

export default function PriceAlertsScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [localStep, setLocalStep] = useState<LocalWorkflowState>("list");

  // 1. Live RTK Query Data Streams
  const { data: apiResponse, isLoading: isQueryLoading } =
    useGetPriceAlertsQuery();
  const [updatePriceAlert] = useUpdatePriceAlertMutation();
  const [deletePriceAlert, { isLoading: isDeleting }] =
    useDeletePriceAlertMutation();

  const alerts = apiResponse?.data || [];

  const [createdAlertInfo, setCreatedAlertInfo] = useState({
    symbol: "BTC",
    direction: "Above" as "Above" | "Below",
    targetPrice: "72,000",
  });

  const [activeDeleteTarget, setActiveDeleteTarget] =
    useState<PriceAlertItem | null>(null);

  // 2. Toggle Active Status Mutation Handler (Stable Data References Execution)
  const handleRowInteraction = async (item: PriceAlertItem) => {
    try {
      const targetId = item.id;
      const currentStatus = !!item.isActive;
      const nextStatus = !currentStatus;

      await updatePriceAlert({
        alertId: targetId,
        isActive: nextStatus,
      }).unwrap();

      showToast(`Alert set to ${nextStatus ? "Active" : "Paused"}`, "success");
    } catch (err) {
      console.error("Failed to update alert state:", err);
      showToast("Failed to modify alert state.", "error");
    }
  };

  // 3. Delete Target Alert Item Entry
  const executeDeleteAction = async () => {
    if (!activeDeleteTarget) return;
    try {
      await deletePriceAlert(activeDeleteTarget.id).unwrap();
      showToast(`Removed alert successfully.`, "success");
      setActiveDeleteTarget(null);
    } catch (err) {
      showToast("Failed to remove active target asset.", "error");
    }
  };

  // 4. Create Alert Local Coordinator (Handled inside CreatePriceAlert component directly)
  const handleAlertCreationSubmit = (payload: {
    symbol: string;
    direction: "Above" | "Below";
    targetPrice: string;
  }) => {
    setCreatedAlertInfo({
      symbol: payload.symbol,
      direction: payload.direction,
      targetPrice: payload.targetPrice,
    });
    setLocalStep("success");
  };

  if (isQueryLoading) {
    return (
      <View style={[styles.centerWrapper, { backgroundColor: Colors.primary }]}>
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
        {/* 📋 STEP 1: RENDER THE LIVE INTERACTIVE ALERTS LIST VIEW */}
        {localStep === "list" && (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.pageTitle}>
              <BackHeader
                title="Price alerts"
                paragraph="Create, edit, pause, or delete market alerts."
                onBack={() => router.back()}
              />
            </View>

            <View style={styles.actionBtnWrapper}>
              <PrimaryButton
                text="Create alert"
                Bgcolor={Colors.green}
                textColor={Colors.newDark}
                onPress={() => setLocalStep("create")}
                fontSize={15}
                style={{ fontFamily: FontFamily.bold }}
              />
            </View>

            <View style={styles.listWrapper}>
              {alerts.map((alert: PriceAlertItem) => {
                const isCurrentlyActive = !!alert.isActive;
                const formattedPrice = alert.targetPriceUsd
                  ? alert.targetPriceUsd.toLocaleString()
                  : "0";

                return (
                  <PriceAlertRow
                    key={alert.id}
                    item={{
                      id: alert.id,
                      title: `${alert.assetSymbol.toUpperCase()} · ${alert.direction.toUpperCase()}`,
                      subtitle: `$${formattedPrice} · ${isCurrentlyActive ? "Notifications on" : "Paused"}`,
                      badgeText: isCurrentlyActive ? "On" : "Off",
                      symbol: alert.assetSymbol.toLowerCase(),
                    }}
                    onPress={() => handleRowInteraction(alert)}
                    onDeleteTrigger={() => setActiveDeleteTarget(alert)}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}

        {/* 🔔 STEP 2: CREATE PRICE ALERT INPUT PANEL */}
        {localStep === "create" && (
          <CreatePriceAlert
            onGoBack={() => setLocalStep("list")}
            onAlertCreated={handleAlertCreationSubmit}
          />
        )}

        {/* 🎉 STEP 3: ALERT SUCCESS CONFIRMATION PANEL */}
        {localStep === "success" && (
          <AlertSuccessView
            symbol={createdAlertInfo.symbol}
            direction={createdAlertInfo.direction}
            targetPrice={createdAlertInfo.targetPrice}
            onClose={() => setLocalStep("list")}
          />
        )}

        {/* 🟢 FLOATING ABSOLUTE BACKDROP OVERLAY FOR CONFIRMATION WINDOW */}
        {localStep === "list" && activeDeleteTarget && (
          <View style={styles.modalBackdrop}>
            <View style={styles.deleteDialogBox}>
              <Title
                text="Delete alert?"
                color={Colors.newWhite}
                size={17}
                fontFamily={FontFamily.bold}
              />
              <View style={styles.dialogDescMargin}>
                <Paragraph
                  text="This removes the alert completely from your tracking dashboard parameters."
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
                  disabled={isDeleting}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.deleteActionBtn}
                  onPress={executeDeleteAction}
                  disabled={isDeleting}
                >
                  <Text style={styles.deleteBtnText}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
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
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 999,
  },
  deleteDialogBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 20,
    padding: 24,
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
  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
