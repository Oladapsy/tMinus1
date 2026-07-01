import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import * as z from "zod";
import KycStepTab from "@/src/components/kyc/KycStepTab";
import MediaDropzone from "@/src/components/kyc/MediaDropzone";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import PrimaryButton from "../../common/PrimaryButton";

const uploadSchema = z.object({
  frontUri: z.string().min(1, "The front image of your document is required"),
  backUri: z.string().optional(),
  selfieUri: z.string().min(1, "A clear selfie photo is required"),
});

type UploadFormData = z.infer<typeof uploadSchema>;
type TabType = "front" | "back" | "selfie";

interface KycScreen4Props {
  onNext: (uris: {
    frontUri: string;
    backUri?: string;
    selfieUri: string;
  }) => void;
}

export default function KycScreen4({ onNext }: KycScreen4Props) {
  const [activeTab, setActiveTab] = useState<TabType>("front");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { frontUri: "", backUri: "", selfieUri: "" },
  });

  const frontUri = watch("frontUri") || "";
  const backUri = watch("backUri") || "";
  const selfieUri = watch("selfieUri") || "";

  const getCurrentTabDetails = () => {
    switch (activeTab) {
      case "front":
        return {
          field: "frontUri" as const,
          label: "document front",
          currentUri: frontUri,
          mode: "gallery" as const,
        };
      case "back":
        return {
          field: "backUri" as const,
          label: "document back",
          currentUri: backUri,
          mode: "gallery" as const,
        };
      case "selfie":
        return {
          field: "selfieUri" as const,
          label: "selfie photo",
          currentUri: selfieUri,
          mode: "camera" as const,
        };
    }
  };

  const currentTab = getCurrentTabDetails();
  const currentTabHasError =
    (activeTab === "front" && !!errors.frontUri) ||
    (activeTab === "selfie" && !!errors.selfieUri);

  const handlePickFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission to access camera roll is required!",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // 🌟 Fixed deprecation
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setValue(currentTab.field, result.assets[0].uri, {
        shouldValidate: true,
      });
      autoAdvanceTabs();
    }
  };

  const handleTakeSelfie = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission to access the camera is required!",
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setValue(currentTab.field, result.assets[0].uri, {
          shouldValidate: true,
        });
        autoAdvanceTabs();
      }
    } catch (cameraError) {
      console.warn(
        "Camera unavailable on simulator. Launching gallery picker fallback...",
      );

      // 🌟 FALLBACK ENGINE: Triggers local system folder gallery if camera hardware fails
      const galleryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!galleryPermission.granted) {
        Alert.alert(
          "Permission Denied",
          "Permission to access gallery is required!",
        );
        return;
      }

      const fallbackResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.8,
      });

      if (
        !fallbackResult.canceled &&
        fallbackResult.assets &&
        fallbackResult.assets.length > 0
      ) {
        setValue(currentTab.field, fallbackResult.assets[0].uri, {
          shouldValidate: true,
        });
        autoAdvanceTabs();
      }
    }
  };

  const handleMediaCaptureAction = () => {
    if (currentTab.mode === "camera") handleTakeSelfie();
    else handlePickFromGallery();
  };

  const autoAdvanceTabs = () => {
    if (activeTab === "front") setActiveTab("back");
    else if (activeTab === "back") setActiveTab("selfie");
  };

  const onSubmitForm = (data: UploadFormData) => {
    onNext({
      frontUri: data.frontUri,
      backUri: data.backUri || undefined,
      selfieUri: data.selfieUri,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <KycStepTab
          label="Front required"
          isActive={activeTab === "front"}
          isFilled={!!frontUri}
          hasError={!!errors.frontUri}
          onPress={() => setActiveTab("front")}
        />
        <KycStepTab
          label="Back optional"
          isActive={activeTab === "back"}
          isFilled={!!backUri}
          hasError={false}
          onPress={() => setActiveTab("back")}
        />
        <KycStepTab
          label="Selfie camera"
          isActive={activeTab === "selfie"}
          isFilled={!!selfieUri}
          hasError={!!errors.selfieUri}
          onPress={() => setActiveTab("selfie")}
        />
      </View>

      <MediaDropzone
        control={control}
        fieldName={currentTab.field}
        currentUri={currentTab.currentUri}
        label={currentTab.label}
        mode={currentTab.mode}
        hasError={currentTabHasError}
        onPress={handleMediaCaptureAction}
      />

      {activeTab === "front" && errors.frontUri && (
        <Text style={styles.errorLabel}>{errors.frontUri.message}</Text>
      )}
      {activeTab === "selfie" && errors.selfieUri && (
        <Text style={styles.errorLabel}>{errors.selfieUri.message}</Text>
      )}

      <View style={styles.acceptedFilesBar}>
        <Text style={styles.acceptedTextLeft}>Accepted files</Text>
        <Text style={styles.acceptedTextRight}>JPG · PNG</Text>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          text="Upload and continue"
          onPress={handleSubmit(onSubmitForm)}
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
  container: { flex: 1 },
  tabsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    width: "100%",
  },
  errorLabel: {
    color: Colors.newRed,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    marginTop: -6,
    marginBottom: 16,
    marginLeft: 4,
  },
  acceptedFilesBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.newDark,
    height: 54,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  acceptedTextLeft: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.regular,
  },
  acceptedTextRight: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  buttonContainer: { paddingBottom: 24, marginTop: 48 },
});
