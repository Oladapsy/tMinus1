import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import KycFormInput from "@/src/components/kyc/KycFormInput";
import KycNoteCard from "@/src/components/kyc/KycNoteCard";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

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

interface KycScreen3Props {
  onNext: (formData: {
    name: string;
    country: string;
    docTypeKey: string;
    docTypeLabel: string;
    docNumber: string;
  }) => void;
}

export default function KycScreen3({ onNext }: KycScreen3Props) {
  const [modalVisible, setModalVisible] = useState(false);

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
      docType: undefined,
      docNumber: "",
    },
  });

  const selectedDocType = watch("docType");
  const displayLabel =
    docOptions.find((o) => o.key === selectedDocType)?.label || "";

  const onSubmitForm = (data: KycFormData) => {
    onNext({
      name: data.legalName,
      country: data.country,
      docTypeKey: data.docType, // 🌟 Sends raw value like "national_id"
      docTypeLabel: displayLabel, // 🌟 Sends display label like "National ID"
      docNumber: data.docNumber,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
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
  formWrapper: { marginTop: 34, marginBottom: 24, gap: 10 },
  button: { marginTop: 48 },
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
  optionTextActive: { color: Colors.green, fontFamily: FontFamily.bold },
});
