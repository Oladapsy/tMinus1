import EyeOpen from "@/assets/icons/wallet/eye-open.svg";
import EyeClosed from "@/assets/icons/wallet/eye-slash.svg";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import Paragraph from "@/src/components/common/Paragraph";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import IconAndText from "@/src/components/common/tab/IconAndText";
import Title from "@/src/components/common/Title";
import Deposit from "@/src/components/wallet/Deposit";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const MainWalletScreen = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [mode, setMode] = useState<"deposit" | "withdrawl" | "transfer">(
    "deposit",
  );

  const Balance = "40,059.83";
  const UsdValue = "$468,554.23";
  return (
    <MySafeAreaView style={styles.container}>
      <View style={styles.balance}>
        <Paragraph text="Current Balance" textAlign="left" size={14} />
        <View style={styles.eyeIcon}>
          <IconAndText
            onPress={() => setShowBalance(!showBalance)}
            icon={
              showBalance ? <EyeClosed color={Colors.secondary} /> : <EyeOpen />
            }
          />
        </View>
      </View>

      <View>
        <View style={styles.mainBalance}>
          <Title
            text={showBalance ? Balance : "********"}
            size={32}
            fontFamily={FontFamily.bold}
          />
        </View>

        <Paragraph
          text={showBalance ? UsdValue : "********"}
          textAlign="left"
        />
      </View>

      {/* Tabs|| Deposit || Withdraw || Transfer */}
      <View style={styles.tab}>
        <PrimaryButton
          text="Deposit"
          fullWidth={false}
          style={{ flex: 1 }}
          fontSize={16}
          Bgcolor={mode === "deposit" ? Colors.green : Colors.lightPrimary} // 👈 active styling
          textColor={mode === "deposit" ? Colors.primary : Colors.secondary}
          onPress={() => setMode("deposit")}
        />
        <PrimaryButton
          text="Withdraw"
          fullWidth={false}
          style={{ flex: 1 }}
          fontSize={16}
          Bgcolor={mode === "withdrawl" ? Colors.green : Colors.lightPrimary} // 👈 active styling
          textColor={mode === "withdrawl" ? Colors.primary : Colors.secondary}
          onPress={() => setMode("withdrawl")}
        />
        <PrimaryButton
          text="Transfer"
          fullWidth={false}
          style={{ flex: 1 }}
          Bgcolor={mode === "transfer" ? Colors.green : Colors.lightPrimary} // 👈 active styling
          textColor={mode === "transfer" ? Colors.primary : Colors.secondary}
          fontSize={16}
          onPress={() => setMode("transfer")}
        />
      </View>

      {/* Render tabs */}
      {mode === "deposit" && <Deposit />}
      {mode === "withdrawl" && (
        <Paragraph
          text="Withdraw screen content goes here..."
          textAlign="left"
        />
      )}
      {mode === "transfer" && (
        <Paragraph
          text="Transfer screen content goes here..."
          textAlign="left"
        />
      )}
    </MySafeAreaView>
  );
};

export default MainWalletScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 54,
  },
  mainBalance: {
    marginTop: 2,
  },
  eyeIcon: {
    marginTop: 10,
  },
});
