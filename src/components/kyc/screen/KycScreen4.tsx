import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as ImagePicker from "expo-image-picker";

import PrimaryButton from "../../common/PrimaryButton";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";

// 1. Zod schema: frontUri is required (min 1), while backUri and thirdUri remain completely optional
const uploadSchema = z.object({
  frontUri: z.string().min(1, "The front image of your document is required"),
  backUri: z.string().optional(),
  thirdUri: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;
type TabType = "front" | "back" | "third";

export default function KycScreen4({ onNext }: { onNext: () => void }) {
  // Track which card tab is highlighted at the top
  const [activeTab, setActiveTab] = useState<TabType>("front");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      frontUri: "",
      backUri: "",
      thirdUri: "",
    },
  });

  // Watch the real-time upload state paths for image checkmarks & thumbnail loading
  const frontUri = watch("frontUri");
  const backUri = watch("backUri");
  const thirdUri = watch("thirdUri");

  // Determine current context string labels based on user tab navigation
  const getCurrentTabDetails = () => {
    switch (activeTab) {
      case "front":
        return { field: "frontUri" as const, label: "document front", currentUri: frontUri };
      case "back":
        return { field: "backUri" as const, label: "document back", currentUri: backUri };
      case "third":
        return { field: "thirdUri" as const, label: "passport page / selfie", currentUri: thirdUri };
    }
  };

  const currentTab = getCurrentTabDetails();

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Inject image into current active controller frame
      setValue(currentTab.field, result.assets[0].uri, { shouldValidate: true });
      
      // Auto-advance tabs for a smoother workflow
      if (activeTab === "front") {
        setActiveTab("back");
      } else if (activeTab === "back") {
        setActiveTab("third");
      }
    }
  };

  const onSubmitForm = (data: UploadFormData) => {
    console.log("Validated Form Payload Images submitted safely:", data);
    onNext();
  };

  return (
    <View style={styles.container}>
      
      {/* 1. TOP CARDS STEP LAYOUT */}
      <View style={styles.tabsContainer}>
        {/* FRONT CARD */}
        <Pressable 
          style={[styles.tabCard, activeTab === "front" && styles.tabCardActive]} 
          onPress={() => setActiveTab("front")}
        >
          <View style={[styles.statusIndicator, frontUri ? styles.statusIndicatorFilled : null]} />
          <Text style={[styles.tabLabel, activeTab === "front" && styles.tabLabelActive]}>Front required</Text>
        </Pressable>

        {/* BACK CARD */}
        <Pressable 
          style={[styles.tabCard, activeTab === "back" && styles.tabCardActive]} 
          onPress={() => setActiveTab("back")}
        >
          <View style={[styles.statusIndicator, backUri ? styles.statusIndicatorFilled : null]} />
          <Text style={[styles.tabLabel, activeTab === "back" && styles.tabLabelActive]}>Back optional</Text>
        </Pressable>

        {/* PASSPORT PAGE / SELFIE CARD */}
        <Pressable 
          style={[styles.tabCard, activeTab === "third" && styles.tabCardActive]} 
          onPress={() => setActiveTab("third")}
        >
          <View style={[styles.statusIndicator, thirdUri ? styles.statusIndicatorFilled : null]} />
          <Text style={[styles.tabLabel, activeTab === "third" && styles.tabLabelActive]}>Passport page</Text>
        </Pressable>
      </View>

      {/* 2. DYNAMIC DROPZONE CONTAINER */}
      <View style={styles.dropzoneWrapper}>
        <Controller
          control={control}
          name={currentTab.field}
          render={() => (
            <Pressable 
              style={[
                styles.dropzoneBox,
                currentTab.currentUri ? styles.dropzoneBoxUploaded : null,
                errors.frontUri && activeTab === "front" ? styles.dropzoneBoxError : null
              ]} 
              onPress={handlePickImage}
            >
              {currentTab.currentUri ? (
                <View style={styles.previewFrame}>
                  <Image source={{ uri: currentTab.currentUri }} style={styles.imageOverlay} />
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>Image Selected</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.emptyPrompt}>
                  <View style={styles.innerDotIndicator} />
                  <Text style={styles.dropzoneTitle}>Upload {currentTab.label}</Text>
                </View>
              )}
            </Pressable>
          )}
        />
        {/* Front failure notification message box */}
        {errors.frontUri && activeTab === "front" && (
          <Text style={styles.errorLabel}>{errors.frontUri.message}</Text>
        )}
      </View>

      {/* 3. ACCEPTED FILE TYPES BAR */}
      <View style={styles.acceptedFilesBar}>
        <Text style={styles.acceptedTextLeft}>Accepted files</Text>
        <Text style={styles.acceptedTextRight}>JPG · PNG</Text>
      </View>

      {/* 4. SUBMISSION ACTION CONTROL BUTTON */}
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
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    width: "100%",
  },
  tabCard: {
    flex: 1,
    height: 104,
    backgroundColor: "#11161D", // Base card shade matching image context background
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "transparent",
  },
  tabCardActive: {
    backgroundColor: "#062319", // Smooth deep green focus shadow frame
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  statusIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  statusIndicatorFilled: {
    backgroundColor: Colors.green || "#22C55E", // Flashes solid light green when file is loaded
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: "#64748B",
  },
  tabLabelActive: {
    color: Colors.newWhite || "white",
  },
  dropzoneWrapper: {
    marginTop: 24,
    marginBottom: 16,
  },
  dropzoneBox: {
    height: 190,
    backgroundColor: "#161C24",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  dropzoneBoxUploaded: {
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.4)",
  },
  dropzoneBoxError: {
    borderWidth: 1.2,
    borderColor: Colors.newRed || "#EF4444",
  },
  emptyPrompt: {
    alignItems: "center",
  },
  innerDotIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0A281E",
    marginBottom: 16,
  },
  dropzoneTitle: {
    color: Colors.newWhite || "white",
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  previewFrame: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.35,
  },
  statusBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  statusBadgeText: {
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.bold,
  },
  errorLabel: {
    color: Colors.newRed || "#EF4444",
    fontSize: 11,
    fontFamily: FontFamily.regular,
    marginTop: 6,
    marginLeft: 4,
  },
  acceptedFilesBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#11161D",
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  acceptedTextLeft: {
    color: "#64748B",
    fontSize: 13,
    fontFamily: FontFamily.regular,
  },
  acceptedTextRight: {
    color: Colors.newWhite || "white",
    fontSize: 13,
    fontFamily: FontFamily.bold,
  },
  buttonContainer: {
    marginTop: "auto",
    paddingBottom: 24,
  },
});