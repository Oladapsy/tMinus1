import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import { useGetWalletQuery } from "@/src/services/walletApi";
import { useGetProfileQuery } from "@/src/features/profile/api/profileApi";

interface TotalBalanceCardProps {
  onDepositPress?: () => void;
}

export type KycStatus = "NOT_STARTED" | "PENDING" | "APPROVED";

export default function TotalBalanceCard({
  onDepositPress,
}: TotalBalanceCardProps) {
  const { data: walletResponse, isLoading } = useGetWalletQuery();
  const { data: userProfile, isLoading: isUserProfileLoading } =
    useGetProfileQuery();

  const rawBalance = walletResponse?.data?.portfolioValueUsd ?? 0;
  const parsedBalance = isNaN(Number(rawBalance)) ? 0 : Number(rawBalance);

  const kycStatus = (userProfile?.data?.kycStatus?.toUpperCase() ||
    "NOT_STARTED") as KycStatus;

  const isApproved =
    kycStatus === "APPROVED" ||
    walletResponse?.data?.verification?.status === "approved";

  // Fallback label indicator placeholder
  const percentageChange = "+0.0% today";

  if (isLoading || isUserProfileLoading) {
    return (
      <View style={[styles.cardContainer, styles.loaderContainer]}>
        <ActivityIndicator size="small" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.cardContainer}>
      {/* Label context */}
      <Text style={styles.label}>Total balance</Text>

      {/* Dynamic Main Balance Amount formatted safely */}
      <Text style={styles.amount}>
        $
        {parsedBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>

      {/* Subtext info strings mapping real status attributes */}
      <Text style={styles.subtext}>
        <Text style={styles.percentage}>{percentageChange}</Text>
        {isApproved ? " • verified" : " • unverified"}
      </Text>

      {/* Mint Green Deposit Button action anchor */}
      <TouchableOpacity
        style={styles.depositButton}
        onPress={onDepositPress}
        activeOpacity={0.8}
      >
        <Text style={styles.depositButtonText}>Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  loaderContainer: {
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: FontFamily.regular,
    marginBottom: 6,
  },
  amount: {
    color: "white",
    fontSize: 34,
    fontFamily: FontFamily.bold,
  },
  subtext: {
    color: Colors.secondary,
    fontSize: 13,
    fontFamily: FontFamily.regular,
    marginTop: 4,
    marginBottom: 20,
  },
  percentage: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
  },
  depositButton: {
    backgroundColor: Colors.green,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  depositButtonText: {
    color: Colors.newBlack,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
});
