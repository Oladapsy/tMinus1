import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import EyeIcon from "@/assets/icons/wallet/eye-slash.svg";
import EyeOpenIcon from "@/assets/icons/wallet/eye-open.svg";
import PrimaryButton from "../../common/PrimaryButton";
import Paragraph from "../../common/Paragraph";
import {
  useLoginCustomerMutation,
  useRequestEmailOtpMutation,
} from "@/src/features/auth/api/authApi";
import { router } from "expo-router";
// import { useToast } from "@/src/context/ToastContext";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/src/store/authSlice";
import * as SecureStore from "expo-secure-store";

interface AuthFormProps {
  fieldLabel: string;
  fieldPlaceholder: string;
  fieldKeyboardType?: "email-address" | "phone-pad" | "default";
  toggleLinkText: string;
  onToggleLink: () => void;
  showForgotPassword?: boolean;
  buttonText: string;
}

export default function AuthForm({
  fieldLabel,
  fieldPlaceholder,
  fieldKeyboardType = "default",
  toggleLinkText,
  onToggleLink,
  showForgotPassword = false,
  buttonText,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isUnverified, setIsUnverified] = useState(false);

  // Initialize the Redux dispatch function tool wrapper
  const dispatch = useDispatch();

  // Initialize your context provider hook handler
  // const { showToast } = useToast();

  const [loginCustomer, { isLoading }] = useLoginCustomerMutation();
  const [requestOtp, { isLoading: isSendingOtp }] =
    useRequestEmailOtpMutation();

  const dynamicSchema = z.object({
    identifier: z
      .string()
      .min(1, "This field is required")
      .superRefine((val, ctx) => {
        if (fieldLabel === "Email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please enter a valid email address",
            });
          }
        } else {
          const phoneRegex = /^\+?[0-9]{7,15}$/;
          if (!phoneRegex.test(val.replace(/\s+/g, ""))) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please enter a valid phone number",
            });
          }
        }
      }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type FormData = z.infer<typeof dynamicSchema>;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { identifier: "", password: "" },
  });

  useEffect(() => {
    setValue("identifier", "");
    setBackendError(null);
    setIsUnverified(false);
  }, [fieldLabel, setValue]);

const onFormSubmit = async (data: FormData) => {
    setBackendError(null);
    setIsUnverified(false);

    try {
      const payload = {
        loginType:
          fieldLabel === "Email" ? ("email" as const) : ("phone" as const),
        identifier:
          fieldLabel === "Email"
            ? data.identifier.trim().toLowerCase()
            : data.identifier.trim().replace(/\s+/g, ""),
        password: data.password,
      };

      const response = await loginCustomer(payload).unwrap();

      // 💡 THE BRIDGE: Check if the user has 2FA enabled on their account
      if (response?.data?.twoFactorRequired || response?.data?.challengeId) {
        // Clear out the password field cleanly for security
        setValue("password", "");

        // 🌟 PRE-CACHE OPTIONAL DATA: Save the initial challenge context if needed
        if (response?.data) {
          await SecureStore.setItemAsync("user_session", JSON.stringify(response.data));
        }

        // Push straight to your folder-based verification view path and pass down the specific token id
        router.push({
          pathname: "/(auth)/two-factor-verify",
          params: { challengeId: response.data.challengeId },
        });
        return; // 🛑 STOP execution here so they don't enter the main app tabs prematurely!
      }

      // 🔓 STANDARD FLOW: No 2FA active. Commit response structure directly into state filing cabinet before shifting screens
      if (response && response.data) {
        // 🌟 SAVE SECURELY FOR BIOMETRICS: Cache full session credentials locally
        await SecureStore.setItemAsync("user_session", JSON.stringify(response.data));

        dispatch(setCredentials(response.data));
        // Note: Make sure your setCredentials listener handles the home redirection or append router.replace("/(tabs)/home") if needed.
      }
    } catch (err: any) {
      const serverMessage =
        err?.data?.error?.message ||
        err?.data?.message ||
        "An unexpected connection error occurred.";
      setBackendError(serverMessage);

      if (
        serverMessage.toLowerCase().includes("verify") ||
        serverMessage.toLowerCase().includes("verification")
      ) {
        setIsUnverified(true);
      }
    }
  };

  const handleVerifyRedirect = async () => {
    const currentIdentifier = getValues("identifier").trim();
    if (!currentIdentifier) return;

    try {
      setBackendError(null);
      const emailToVerify =
        fieldLabel === "Email"
          ? currentIdentifier.toLowerCase()
          : currentIdentifier;

      const response = await requestOtp({ email: emailToVerify }).unwrap();
      const liveDemoCode = response?.data?.demoCode || "123456";

      // Pass the live code forward via URL query parameters
      router.push({
        pathname: "/(auth)/otp",
        params: {
          email: emailToVerify,
          codeOnMount: liveDemoCode,
        },
      });
    } catch (err: any) {
      console.log(err);
      const emailToVerify =
        fieldLabel === "Email"
          ? currentIdentifier.toLowerCase()
          : currentIdentifier;

      // Fallback route params
      router.push({
        pathname: "/(auth)/otp",
        params: {
          email: emailToVerify,
          codeOnMount: "123456",
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {backendError && (
        <View style={styles.backendErrorBox}>
          <Text style={styles.backendErrorText}>{backendError}</Text>
        </View>
      )}

      {isUnverified && (
        <TouchableOpacity
          style={styles.verifyLinkBox}
          onPress={handleVerifyRedirect}
          disabled={isSendingOtp}
        >
          {isSendingOtp ? (
            <ActivityIndicator size="small" color={Colors.green} />
          ) : (
            <Text style={styles.verifyLinkText}>
              Click here to send an OTP and verify your account →
            </Text>
          )}
        </TouchableOpacity>
      )}

      <View style={styles.labelRow}>
        <Paragraph text={fieldLabel} textAlign="left" />
        <TouchableOpacity onPress={onToggleLink}>
          <Text style={styles.toggleLink}>{toggleLinkText}</Text>
        </TouchableOpacity>
      </View>

      <Controller
        control={control}
        name="identifier"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.identifier && styles.inputError]}
            placeholder={fieldPlaceholder}
            placeholderTextColor={Colors.secondary}
            keyboardType={fieldKeyboardType}
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={(text) => {
              setBackendError(null);
              setIsUnverified(false);
              onChange(text);
            }}
            value={value}
            editable={!isLoading && !isSendingOtp}
          />
        )}
      />
      {errors.identifier && (
        <Text style={styles.errorText}>
          {errors.identifier.message as string}
        </Text>
      )}

      <Paragraph text="Password" textAlign="left" />
      <View style={[styles.inputRow, errors.password && styles.inputRowError]}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputFlex}
              placeholder="Enter your password"
              placeholderTextColor={Colors.secondary}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={(text) => {
                setBackendError(null);
                onChange(text);
              }}
              value={value}
              editable={!isLoading && !isSendingOtp}
            />
          )}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeOpenIcon color={Colors.secondary} width={20} height={20} />
          ) : (
            <EyeIcon color={Colors.secondary} width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {showForgotPassword && (
        <TouchableOpacity disabled={isLoading || isSendingOtp}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      <View style={styles.btnWrapper}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={Colors.green} />
          </View>
        ) : (
          <PrimaryButton
            text={buttonText}
            onPress={handleSubmit(onFormSubmit)}
            Bgcolor={Colors.green}
            textColor={Colors.darkText}
            disabled={isSendingOtp}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, gap: 4 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    marginTop: 8,
  },
  toggleLink: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  input: {
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 14,
    color: "white",
    fontFamily: FontFamily.regular,
    fontSize: 14,
    height: 54,
  },
  inputError: { borderWidth: 1, borderColor: Colors.red },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 54,
  },
  inputRowError: { borderWidth: 1, borderColor: Colors.red },
  inputFlex: {
    flex: 1,
    paddingVertical: 14,
    color: "white",
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginTop: 2,
    marginBottom: 8,
    textAlign: "left",
  },
  backendErrorBox: {
    backgroundColor: "rgba(255, 51, 51, 0.15)",
    borderColor: Colors.red,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    marginTop: -16,
  },
  backendErrorText: {
    color: Colors.red,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    textAlign: "center",
  },
  verifyLinkBox: {
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyLinkText: {
    color: Colors.green,
    fontFamily: FontFamily.bold,
    fontSize: 14,
    textAlign: "center",
  },
  forgot: {
    color: Colors.green,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    marginVertical: 12,
  },
  btnWrapper: { marginTop: 16 },
  loaderContainer: {
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
});
