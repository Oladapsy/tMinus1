import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import BackHeader from "@/src/components/common/BackHeader";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import Paragraph from "@/src/components/common/Paragraph";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/src/services/profileApi";
import { useToast } from "@/src/context/ToastContext";

// 1. Zod Form Validation Rules matching our allowed fields
const editProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"),
  avatarUrl: z
    .string()
    .url("Please provide a valid image URL")
    .or(z.string().optional()),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfileScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  // 🌟 Hook 1: Pull current user details out of cache to populate the form
  const { data: profileResponse, isLoading: isFetching } = useGetProfileQuery();

  // 🌟 Hook 2: Initialize our PATCH profile mutation modifier
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const profile = profileResponse?.data;

  // 2. Configure React Hook Form
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      avatarUrl: "",
    },
  });

  // Dynamic values listener to drive UI components state changes
  const currentAvatarUrl = watch("avatarUrl");
  const currentFullName = watch("fullName");
  const avatarInitial = currentFullName
    ? currentFullName.charAt(0).toUpperCase()
    : "U";

  // Pre-fill inputs with existing backend data records once fetched successfully
  useEffect(() => {
    if (profile) {
      setValue("fullName", profile.fullName);
      setValue("phone", profile.phone);
      setValue("avatarUrl", profile.avatarUrl || "");
    }
  }, [profile, setValue]);

  // 3. Dispatch Updated Modifications Package to Server
  // 3. Dispatch Updated Modifications Package to Server
  const onSaveProfile = async (data: EditProfileFormData) => {
    try {
      const payload = {
        fullName: data.fullName.trim(),
        phone: data.phone.trim().replace(/\s+/g, ""),
        avatarUrl: data.avatarUrl?.trim() || undefined,
      };

      await updateProfile(payload).unwrap();

      // 🌟 Change: Pass the string directly!
      showToast?.("Profile updated successfully!");
      router.back();
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to update profile changes.";

      // 🌟 Change: Pass the string directly!
      showToast?.(errMsg);
    }
  };

  // Mock Avatar selection framework logic wrapper
  const handlePickImage = () => {
    // Perfect injection point for an image picking dependency later.
    // For now, let's feed a high-quality temporary dynamic avatar image URL string:
    const demoUrls = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop",
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&h=240&fit=crop",
    ];
    const chosen = currentAvatarUrl === demoUrls[0] ? demoUrls[1] : demoUrls[0];
    setValue("avatarUrl", chosen, { shouldDirty: true });
  };

  if (isFetching) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: Colors.newBlack }]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <MySafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.pageTitle}>
            <BackHeader title="Edit Profile" onBack={router.back} staright />
          </View>

          {/* EDITABLE AVATAR PICKER SECTION */}
          <View style={styles.avatarPickerContainer}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              onPress={handlePickImage}
              activeOpacity={0.8}
            >
              {currentAvatarUrl ? (
                <Image
                  source={{ uri: currentAvatarUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarCircleFallback}>
                  <Text style={styles.avatarLetterFallback}>
                    {avatarInitial}
                  </Text>
                </View>
              )}
              {/* Camera Icon Overlay Badge Badge layout */}
              <View style={styles.cameraBadgeCircle}>
                <Text style={styles.cameraIconText}>📸</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarHelperText}>
              Tap to change avatar image
            </Text>
          </View>

          {/* INTERACTIVE INPUT FIELD MODULES */}
          <View style={styles.formContainer}>
            {/* FULL NAME INPUT */}
            <Paragraph text="Full Name" textAlign="left" />
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.fullName && styles.inputError]}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.secondary}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isUpdating}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}

            {/* PHONE NUMBER INPUT */}
            <Paragraph text="Phone Number" textAlign="left" />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  placeholder="Enter phone number"
                  placeholderTextColor={Colors.secondary}
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isUpdating}
                />
              )}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}

            {/* EMAIL ADDRESS (READ-ONLY FinTech Core Identity Anchor Anchor) */}
            <Paragraph text="Email Address" textAlign="left" />
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={profile?.email}
              editable={false}
              selectTextOnFocus={false}
            />
            <Text style={styles.disabledHelperText}>
              Your dynamic login email anchor cannot be changed.
            </Text>
          </View>

          {/* SAVE CONTROLS BLOCK */}
          <View style={styles.footerSection}>
            {isUpdating ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color={Colors.green} />
              </View>
            ) : (
              <PrimaryButton
                text="Save Changes"
                onPress={handleSubmit(onSaveProfile)}
                Bgcolor={isDirty ? Colors.green : Colors.newDark}
                textColor={isDirty ? Colors.darkText : Colors.secondary}
                disabled={!isDirty}
              />
            )}
          </View>
        </ScrollView>
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  safeContainer: { flex: 1, backgroundColor: "transparent" },
  scrollContainer: { paddingHorizontal: 24, paddingBottom: 40 },
  pageTitle: { marginTop: 14, marginBottom: -20 },
  avatarPickerContainer: { alignItems: "center", marginVertical: 24 },
  avatarWrapper: {
    position: "relative",
    width: 90,
    height: 90,
    borderRadius: 45,
    elevation: 4,
  },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarCircleFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetterFallback: {
    color: Colors.newBlack,
    fontSize: 32,
    fontFamily: FontFamily.bold,
  },
  cameraBadgeCircle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.tertiary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.newBlack,
  },
  cameraIconText: { fontSize: 12 },
  avatarHelperText: {
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    marginTop: 10,
  },
  formContainer: { gap: 4, marginTop: 10 },
  input: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 14,
    color: "white",
    fontFamily: FontFamily.regular,
    fontSize: 14,
    height: 54,
    marginTop: 6,
    marginBottom: 4,
  },
  disabledInput: {
    opacity: 0.5,
    borderColor: "transparent",
    color: Colors.secondary,
  },
  inputError: { borderWidth: 1, borderColor: Colors.red },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginBottom: 10,
  },
  disabledHelperText: {
    color: Colors.secondary,
    fontSize: 11,
    fontFamily: FontFamily.regular,
    marginTop: -2,
    marginBottom: 12,
  },
  footerSection: { marginTop: 40 },
  loaderContainer: {
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
