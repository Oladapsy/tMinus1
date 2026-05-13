import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { QrCodeSvg, plainRenderer } from "react-native-qr-svg";
import Paragraph from "../common/Paragraph";
import Title from "../common/Title";
import PrimaryButton from "../common/PrimaryButton";
import CameraIcon from "@/assets/icons/qr/qr-code1.svg";
import CopyIcon from "@/assets/icons/qr/copy2.svg";
import { Colors } from "@/src/constants/colors";
import * as Clipboard from "expo-clipboard";

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
  const copyToClipboard = async () => {
    const address = unit === "USD" ? usdAddress : btcAddress;
    await Clipboard.setStringAsync(address);
  };

  const currentAddress = unit === "USD" ? usdAddress : btcAddress;
  const currentBalance = unit === "USD" ? usdBalance : btcBalance;

  return (
    <View style={style.container}>
      {/* Head */}

      <View style={style.toggleRow}>
        {/* onclick should switch the qr-code and adress and on select have another color*/}
        <View>
          <TouchableOpacity onPress={() => setUnit("USD")}>
            <Paragraph
              text="USD"
              color={unit === "USD" ? Colors.green : Colors.secondary}
              size={14}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setUnit("BTC")}>
            <Paragraph
              text="BTC"
              color={unit === "BTC" ? Colors.green : Colors.secondary}
              size={14}
            />
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <Title text={`${unit} ${currentBalance}`} size={28} />
      </View>

      {/* QR CODE */}
      <View style={style.qrWrapper}>
        <QrCodeSvg
          style={style.qr}
          renderer={plainRenderer}
          value={currentAddress}
          frameSize={100}
        />
      </View>

      {/* Footer */}
      <Paragraph text="address" size={14} />

      {/* Adress and a copy at the end */}
      <View style={style.addressRow}>
        <Paragraph text={currentAddress} size={14} textAlign="left" />

        <TouchableOpacity onPress={copyToClipboard}>
          <CopyIcon />
        </TouchableOpacity>
      </View>

      {/* the copy Address with copy icon */}
      <Paragraph
        text="Carefull to use the right address we will not be responsible for any loss"
        size={14}
      />
      <PrimaryButton
        text="Scan QR code"
        icon={<CameraIcon />}
        onPress={onScanQR}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  toggleRow: {},
  qrWrapper: {},
  addressRow: {},
  tab: {},
  qr: {
    padding: 15,
  },
  adressCopy: {
    backgroundColor: Colors.tertiary,
  },
  //   container: {
  //     paddingHorizontal: 24,
  //     paddingTop: 20,
  //     gap: 20,
  //   },
  //   toggleRow: {
  //     flexDirection: "row",
  //     gap: 20,
  //   },
  //   qrWrapper: {
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginVertical: 20,
  //   },
  //   qr: {
  //     padding: 15,
  //     backgroundColor: "white",
  //     borderRadius: 12,
  //   },
  //   addressRow: {
  //     backgroundColor: Colors.tertiary,
  //     padding: 12,
  //     borderRadius: 10,
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //   },
});
