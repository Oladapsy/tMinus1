import {
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import {
  useGetProfileQuery,
  useUploadKycFileMutation,
  useSubmitKycPayloadMutation,
} from "@/src/features/profile/api/profileApi";
import { Colors } from "@/src/constants/colors";
import KycHeader, { KycScreenIndex } from "@/src/features/kyc/components/kyc/KycHeader";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import KycScreen1 from "@/src/features/kyc/components/kyc/screen/KycScreen1";
import KycScreen2 from "@/src/features/kyc/components/kyc/screen/KycScreen2";
import KycScreen3 from "@/src/features/kyc/components/kyc/screen/KycScreen3";
import KycScreen4 from "@/src/features/kyc/components/kyc/screen/KycScreen4";
import KycScreen5 from "@/src/features/kyc/components/kyc/screen/KycScreen5";
import KycScreen6 from "@/src/features/kyc/components/kyc/screen/KycScreen6";
import KycStatusScreen from "@/src/features/kyc/components/kyc/screen/KycStatusScreen";

interface KycCollectedData {
  legalName: string;
  country: string;
  documentTypeKey: string;
  documentTypeLabel: string;
  documentNumber: string;
  frontUri: string;
  backUri?: string;
  selfieUri: string;
}

export default function Index() {
  const router = useRouter();

  // 📡 Live Server Sync Engine
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
  const [uploadFile, { isLoading: isUploading }] = useUploadKycFileMutation();
  const [submitKyc, { isLoading: isSubmitting }] =
    useSubmitKycPayloadMutation();

  const [screenIndex, setScreenIndex] = useState<KycScreenIndex>(0);
  const [kycData, setKycData] = useState<KycCollectedData>({
    legalName: "",
    country: "Nigeria",
    documentTypeKey: "",
    documentTypeLabel: "",
    documentNumber: "",
    frontUri: "",
    backUri: "",
    selfieUri: "",
  });

  // 🔄 Intercept current profile verification state automatically on mount
  useEffect(() => {
    if (profile?.data?.kycStatus) {
      const status = profile.data.kycStatus;
      if (status === "pending") setScreenIndex(6);
      else if (status === "approved") setScreenIndex(7);
      else if (status === "needs_attention") setScreenIndex(8);
    }
  }, [profile]);

  if (isProfileLoading) {
    return (
      <View
        style={[
          styles.root,
          { justifyContent: "center", backgroundColor: Colors.newDark },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  // 📤 Form-Data pipeline processing transformation for image uploads
  const uploadImageToBackend = async (localUri: string) => {
    if (!localUri) return null;
    const formData = new FormData();

    formData.append("file", {
      uri: localUri,
      name: "kyc_upload.jpg",
      type: "image/jpeg",
    } as any);

    const response = await uploadFile(formData).unwrap();
    return response.data.publicUrl;
  };

  // 📝 Final structural submission payload pipeline dispatch execution
  const handleFinalSubmission = async () => {
    try {
      const remoteFrontUrl = await uploadImageToBackend(kycData.frontUri);
      const remoteBackUrl = kycData.backUri
        ? await uploadImageToBackend(kycData.backUri)
        : null;
      const remoteSelfieUrl = await uploadImageToBackend(kycData.selfieUri);

      await submitKyc({
        legalName: kycData.legalName,
        country: kycData.country,
        documentType: kycData.documentTypeKey, // 🌟 Sends exact format required by backend
        documentNumber: kycData.documentNumber,
        documentImageUrl: remoteFrontUrl || "",
        documentBackImageUrl: remoteBackUrl,
        selfieImageUrl: remoteSelfieUrl || "",
      }).unwrap();

      setScreenIndex(6);
    } catch (error) {
      console.log("KYC execution processing sequence failure:", error);
    }
  };

  const handleBackNavigation = () => {
    if (
      screenIndex === 0 ||
      screenIndex === 6 ||
      screenIndex === 7 ||
      screenIndex === 8
    ) {
      router.back();
    } else {
      setScreenIndex((prev) => (prev - 1) as KycScreenIndex);
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("@/assets/images/kyc/kycBg.png")}
        style={styles.image}
        resizeMode="cover"
      >
        <MySafeAreaView style={styles.safeContainer}>
          <KycHeader screenIndex={screenIndex} onBack={handleBackNavigation} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {screenIndex === 0 && (
              <KycScreen1 onNext={() => setScreenIndex(1)} />
            )}
            {screenIndex === 1 && (
              <KycScreen2 onNext={() => setScreenIndex(2)} />
            )}

            {screenIndex === 2 && (
              <KycScreen3
                onNext={(formFields) => {
                  setKycData((prev) => ({
                    ...prev,
                    legalName: formFields.name,
                    country: formFields.country,
                    documentTypeKey: formFields.docTypeKey,
                    documentTypeLabel: formFields.docTypeLabel,
                    documentNumber: formFields.docNumber,
                  }));
                  setScreenIndex(3);
                }}
              />
            )}

            {screenIndex === 3 && (
              <KycScreen4
                onNext={(uris) => {
                  setKycData((prev) => ({ ...prev, ...uris }));
                  setScreenIndex(4);
                }}
              />
            )}

            {screenIndex === 4 && (
              <KycScreen5 onNext={() => setScreenIndex(5)} />
            )}

            {screenIndex === 5 &&
              (isUploading || isSubmitting ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color={Colors.green} />
                </View>
              ) : (
                <KycScreen6
                  userData={{
                    name: kycData.legalName,
                    country: kycData.country,
                    docType: kycData.documentTypeLabel, // 🌟 UI gets pretty version
                  }}
                  onSubmit={handleFinalSubmission}
                />
              ))}

            {screenIndex === 6 && (
              <KycStatusScreen
                status="pending"
                onAction={() => router.back()}
              />
            )}
            {screenIndex === 7 && (
              <KycStatusScreen
                status="success"
                onAction={() => router.back()}
              />
            )}
            {screenIndex === 8 && (
              <KycStatusScreen
                status="rejected"
                onAction={() => setScreenIndex(2)}
              />
            )}
          </ScrollView>
        </MySafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  image: { width: "100%", height: "100%" },
  safeContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});
