import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MediaDropzoneProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  fieldName: Path<TFieldValues>;
  currentUri: string;
  label: string;
  mode: "camera" | "gallery";
  hasError: boolean;
  onPress: () => void; // Passed cleanly from parent handler switchboard
}

export default function MediaDropzone<TFieldValues extends FieldValues>({
  control,
  fieldName,
  currentUri,
  label,
  mode,
  hasError,
  onPress,
}: MediaDropzoneProps<TFieldValues>) {
  return (
    <View style={styles.dropzoneWrapper}>
      <Controller
        control={control}
        name={fieldName}
        render={() => (
          <Pressable
            style={[
              styles.dropzoneBox,
              currentUri ? styles.dropzoneBoxUploaded : null,
              hasError ? styles.dropzoneBoxError : null,
            ]}
            onPress={onPress}
          >
            {currentUri ? (
              <View style={styles.previewFrame}>
                <Image
                  source={{ uri: currentUri }}
                  style={styles.imageOverlay}
                />
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>Image Selected</Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyPrompt}>
                <View style={styles.innerDotIndicator} />
                <Text style={styles.dropzoneTitle}>
                  {mode === "camera" ? "Open selfie camera" : `Upload ${label}`}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropzoneWrapper: { marginTop: 24, marginBottom: 16 },
  dropzoneBox: {
    height: 190,
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  dropzoneBoxUploaded: { borderWidth: 1.2, borderColor: Colors.newGreen },
  dropzoneBoxError: { borderWidth: 1.2, borderColor: Colors.newRed },
  emptyPrompt: { alignItems: "center" },
  innerDotIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.newGreen,
    marginBottom: 16,
  },
  dropzoneTitle: {
    color: Colors.newWhite,
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
});
