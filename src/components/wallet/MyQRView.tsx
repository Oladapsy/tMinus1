import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { QrCodeSvg, plainRenderer } from "react-native-qr-svg";
import Paragraph from "../common/Paragraph";
import Title from "../common/Title";
import PrimaryButton from "../common/PrimaryButton";
import SmallCameraIcon from "@/assets/icons/qr/smallCamera.svg";
import CopyIcon from "@/assets/icons/qr/copy2.svg";
import { Colors } from "@/src/constants/colors";
import * as Clipboard from "expo-clipboard";
import { FontFamily } from "@/src/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  btcAddress: string;
  usdAddress: string;
  usdBalance: string;
  btcBalance: string;
  onScanQR: () => void;
}
export const MyQRView = ({
  btcAddress = "btc5dirgMNYdQskfiP5zj39VYemXareK4C",
  usdAddress = "usdt5dirgMNYdQskfiP5zj39VYemXareK4C",
  usdBalance,
  btcBalance,
  onScanQR,
}: Props) => {
  const [unit, setUnit] = useState<"USD" | "BTC">("USD");
  // success copy message
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const address = unit === "USD" ? usdAddress : btcAddress;
    await Clipboard.setStringAsync(address);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const currentAddress = unit === "USD" ? usdAddress : btcAddress;
  const currentBalance = unit === "USD" ? usdBalance : btcBalance;

  return (
    <View style={style.container}>
      {copied && (
        <View style={style.toast}>
          <Paragraph text="Copied!" size={14} color={Colors.green}/>
        </View>
      )}
      {/* Head */}
      <View style={style.headWrapper}>
        <LinearGradient
          colors={["rgba(94, 213, 168, 0.08)", "rgba(27, 35, 42, 0)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={style.gradient}
          pointerEvents="none"
        />
        {/* onclick should switch the qr-code and adress and on select have another color*/}
        <View style={style.toggleRow}>
          <TouchableOpacity onPress={() => setUnit("USD")}>
            <Paragraph
              text="USD"
              color={unit === "USD" ? Colors.green : Colors.secondary}
              fontFamily={unit === "USD" ? FontFamily.bold : FontFamily.medium}
              size={14}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUnit("BTC")}>
            <Paragraph
              text="BTC"
              color={unit === "BTC" ? Colors.green : Colors.secondary}
              fontFamily={unit === "BTC" ? FontFamily.bold : FontFamily.medium}
              size={14}
            />
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <Title
          text={`${unit} ${currentBalance}`}
          size={28}
          fontFamily={FontFamily.bold}
        />
      </View>

      {/* QR CODE */}
      {/* text */}
      <View style={style.body}>
        <View style={style.myQRTest}>
          <Title
            text="My QR code"
            textAlign="center"
            size={18}
            fontFamily={FontFamily.bold}
          />
        </View>

        <View style={style.qrWrapper}>
          <QrCodeSvg
            style={style.qr}
            renderer={plainRenderer}
            value={currentAddress}
            frameSize={190}
          />
        </View>

        {/* Footer */}
        <View style={style.addressLabel}>
          <Paragraph text="ADDRESS" size={14} textAlign="center" />
        </View>

        {/* Adress and a copy at the end */}
        <View style={style.addressRow}>
          <Paragraph text={currentAddress} size={14} textAlign="left" />

          <TouchableOpacity onPress={copyToClipboard} style={style.addressCopy}>
            <CopyIcon />
          </TouchableOpacity>
        </View>

        {/* the copy Address with copy icon */}
        <View style={style.warningText}>
          <Paragraph
            text="Carefull to use the right address we will not be responsible for any loss"
            size={14}
          />
        </View>

        <PrimaryButton
          text="Scan QR code"
          icon={<SmallCameraIcon />}
          onPress={onScanQR}
          textColor={Colors.green}
          Bgcolor="transparent"
          borderColor={Colors.green}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  body: {
    paddingHorizontal: 24,
  },
  headWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 54,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 20,
    paddingBottom: 14,
  },
  qrWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  addressRow: {
    flexDirection: "row",
    backgroundColor: Colors.tertiary,
    paddingLeft: 12,
    height: 33,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tab: {},
  qr: {
    padding: 15,
    width: 220,
    height: 220,
    borderRadius: 16,
    backgroundColor: "white",
  },
  addressCopy: {
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    width: 39,
    height: 33,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: 146,
  },
  myQRTest: {
    marginBottom: 20,
  },
  addressLabel: {
    marginTop: 20,
    marginBottom: 4,
  },
  warningText: {
    marginBottom: 20,
  },
  toast: {
    position: "absolute",
    // bottom: 0,
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 20,
    // zIndex: 10,
  },
});
