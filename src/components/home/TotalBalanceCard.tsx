import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

interface TotalBalanceCardProps {
  balance?: string;
  percentageChange?: string;
  isVerified?: boolean;
  onDepositPress?: () => void;
}

export default function TotalBalanceCard({
  balance = "$4,892.40",
  percentageChange = "+3.8% today",
  isVerified = false,
  onDepositPress,
}: TotalBalanceCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Label context */}
      <Text style={styles.label}>Total balance</Text>
      
      {/* Dynamic Main Balance Amount */}
      <Text style={styles.amount}>{balance}</Text>
      
      {/* Subtext info strings */}
      <Text style={styles.subtext}>
        <Text style={styles.percentage}>{percentageChange}</Text>
        {isVerified && " • verified" || isVerified === false && " • unverified" }
      </Text>

      {/* Mint Green Deposit Button action anchor */}
      <TouchableOpacity style={styles.depositButton} onPress={onDepositPress}>
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