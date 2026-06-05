import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import KycFormInput from "@/src/components/kyc/KycFormInput";
import KycNoteCard from "@/src/components/kyc/KycNoteCard";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// 1. Establish an explicit string enum pattern so Zod scales type matching flawlessly
enum DocTypeEnum {
  national_id = "national_id",
  passport = "passport",
  drivers_license = "drivers_license",
}

const kycSchema = z.object({
  legalName: z
    .string()
    .trim()
    .min(3, "Legal name must be at least 3 characters"),
  country: z.string().trim().min(2, "Please select or type your country"),
  docType: z.nativeEnum(DocTypeEnum, {
    message: "Please select a document type",
  }),
  docNumber: z
    .string()
    .trim()
    .min(4, "Document number must be at least 4 characters"),
});

type KycFormData = z.infer<typeof kycSchema>;

export default function KycScreen3({ onNext }: { onNext: () => void }) {
  const [modalVisible, setModalVisible] = useState(false);

  // Map backend keys to clean, user-friendly UI labels
  const docOptions = [
    { key: DocTypeEnum.national_id, label: "National ID" },
    { key: DocTypeEnum.passport, label: "Passport" },
    { key: DocTypeEnum.drivers_license, label: "Driver's License" },
  ] as const;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      legalName: "",
      country: "Nigeria",
      docType: undefined, // Start unselected so they are forced to choose
      docNumber: "",
    },
  });

  // Watch the real-time value change of docType to display the correct label inside the field box
  const selectedDocType = watch("docType");
  const displayLabel =
    docOptions.find((o) => o.key === selectedDocType)?.label || "";

  const onSubmitForm = (data: KycFormData) => {
    console.log("Validated Payload:", data);
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        {/* LEGAL NAME */}
        <Controller
          control={control}
          name="legalName"
          render={({ field: { onChange, onBlur, value } }) => (
            <KycFormInput
              placeholder="Legal name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.legalName?.message}
            />
          )}
        />

        {/* COUNTRY */}
        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, value } }) => (
            <KycFormInput
              placeholder="Country"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.country?.message}
            />
          )}
        />

        {/* DOCUMENT TYPE SELECTOR TRIGGER */}
        <Pressable onPress={() => setModalVisible(true)}>
          <View pointerEvents="none">
            <KycFormInput
              placeholder="Document type"
              value={displayLabel}
              error={errors.docType?.message}
              editable={false}
            />
          </View>
        </Pressable>

        {/* DOCUMENT NUMBER */}
        <Controller
          control={control}
          name="docNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <KycFormInput
              placeholder="Document number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="characters"
              error={errors.docNumber?.message}
            />
          )}
        />
      </View>

      <KycNoteCard
        showIcon={true}
        text="Mismatched details can delay approval or require resubmission."
      />

      <View style={styles.button}>
        <PrimaryButton
          text="Continue"
          onPress={handleSubmit(onSubmitForm)}
          Bgcolor={Colors.green}
          textColor={Colors.newBlack}
          fontSize={13}
          style={{ fontFamily: FontFamily.bold }}
        />
      </View>

      {/* SELECTION MODAL SHEET */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Document Type</Text>

            {docOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.optionButton,
                  selectedDocType === option.key && styles.optionButtonActive,
                ]}
                onPress={() => {
                  // Using hook-form's native setValue instead of the missing onChange variable
                  setValue("docType", option.key, { shouldValidate: true });
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedDocType === option.key && styles.optionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formWrapper: {
    marginTop: 34,
    marginBottom: 56,
    gap: 10,
  },
  button: {
    marginTop: 94,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.newDark,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Colors.newWhite,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  optionButtonActive: {
    borderColor: Colors.green,
    backgroundColor: "rgba(34, 197, 94, 0.05)",
  },
  optionText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.newSecondary,
  },
  optionTextActive: {
    color: Colors.green,
    fontFamily: FontFamily.bold,
  },
});
