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
import { StyleSheet, ImageBackground, View } from "react-native";

import bgImage from "@/assets/images/wallet/WalletBg.png";

const MainWalletScreen = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [mode, setMode] = useState<"deposit" | "withdrawl" | "transfer">(
    "deposit",
  );

  const Balance = "40,059.83";
  const UsdValue = "$468,554.23";

  return (
    <MySafeAreaView style={styles.container} edges={['bottom', 'left', 'right']} >
      {/* Background Section */}
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={styles.headerBg}
      >
        <View style={styles.content}>
          <View style={styles.balance}>
            <Paragraph text="Current Balance" textAlign="left" size={14} />

            <View style={styles.eyeIcon}>
              <IconAndText
                onPress={() => setShowBalance(!showBalance)}
                icon={
                  showBalance ? (
                    <EyeClosed color={Colors.secondary} />
                  ) : (
                    <EyeOpen />
                  )
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

          {/* Tabs */}
          <View style={styles.tab}>
            <PrimaryButton
              text="Deposit"
              fullWidth={false}
              style={{ flex: 1, height: 46 }}
              fontSize={16}
              Bgcolor={mode === "deposit" ? Colors.green : Colors.lightPrimary}
              textColor={mode === "deposit" ? Colors.primary : Colors.secondary}
              onPress={() => setMode("deposit")}
            />

            <PrimaryButton
              text="Withdraw"
              fullWidth={false}
              style={{ flex: 1, height: 46 }}
              fontSize={16}
              Bgcolor={
                mode === "withdrawl" ? Colors.green : Colors.lightPrimary
              }
              textColor={
                mode === "withdrawl" ? Colors.primary : Colors.secondary
              }
              onPress={() => setMode("withdrawl")}
            />

            <PrimaryButton
              text="Transfer"
              fullWidth={false}
              style={{ flex: 1, height: 46 }}
              fontSize={16}
              Bgcolor={mode === "transfer" ? Colors.green : Colors.lightPrimary}
              textColor={
                mode === "transfer" ? Colors.primary : Colors.secondary
              }
              onPress={() => setMode("transfer")}
            />
          </View>
        </View>
      </ImageBackground>

      {/* Content */}
      <View style={styles.body}>
        {mode === "deposit" && <Deposit showBalance={showBalance} />}

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
      </View>
    </MySafeAreaView>
  );
};

export default MainWalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerBg: {
    paddingTop: 70,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  body: {
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
