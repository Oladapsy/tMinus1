import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import KycFormInput from "@/src/components/kyc/KycFormInput";
import KycNoteCard from "../KycNoteCard";
import PrimaryButton from "../../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

export default function KycScreen3({ onNext }: { onNext: () => void }) {
  const [legalName, setLegalName] = useState("");
    const [country, setCountry] = useState("Nigeria");
  const [docType, setDocType] = useState("Passport");
const [docNumber, setDocNumber] = useState("");


  return (
    <View style={styles.container}>
      {/* Form */}
      <View style={styles.formWrapper}>
        <KycFormInput
          placeholder="Legal name"
          value={legalName}
          onChangeText={setLegalName}
        />

        <KycFormInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />

        <KycFormInput
          placeholder="Document type"
          value={docType}
          onChangeText={setDocType}
        />

        <KycFormInput
          placeholder="Document number"
          value={docNumber}
          onChangeText={setDocNumber}
        />
       
      </View>

      <KycNoteCard
        showIcon={true}
        text="Mismatched details can delay approval or require resubmission."
      />

      <View style={styles.button}>
        <PrimaryButton
          text="Continue"
          onPress={onNext}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    marginTop: 34,
    marginBottom: 56,
    gap: 10,
  },
  button: {
    marginTop: 94,
  },
});
