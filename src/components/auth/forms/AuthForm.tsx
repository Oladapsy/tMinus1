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
import { useLoginCustomerMutation } from "@/src/services/authApi";
import { router } from "expo-router";

interface AuthFormProps {
  fieldLabel: string; // "Email" | "Mobile Number"
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
  const [backendError, setBackendError] = useState<string | null>(null); // Global backend error state
  const [loginCustomer, { isLoading }] = useLoginCustomerMutation();

  // Create a dynamic Zod schema based on the current label mode
  const dynamicSchema = z.object({
    identifier: z
      .string()
      .min(1, "This field is required")
      .superRefine((val, ctx) => {
        if (fieldLabel === "Email") {
          // Run strict email regex validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please enter a valid email address",
            });
          }
        } else {
          // Run phone validation (e.g., must be digits, between 7-15 characters long)
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { identifier: "", password: "" },
  });

  // Clear states when toggling between email and phone input layouts
  useEffect(() => {
    setValue("identifier", "");
    setBackendError(null);
  }, [fieldLabel, setValue]);

  const onFormSubmit = async (data: FormData) => {
    setBackendError(null); // Clear previous server errors before sending request
    try {
      const payload = {
        loginType:
          fieldLabel === "Email" ? ("email" as const) : ("phone" as const),
        identifier:
          fieldLabel === "Email"
            ? data.identifier.trim().toLowerCase()
            : data.identifier.trim().replace(/\s+/g, ""), // Clean phone formatting spaces
        password: data.password,
      };

      const response = await loginCustomer(payload).unwrap();
      if (response) {
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      console.warn("Authentication rejected:", err);

      // Target the exact path the backend uses: err.data.error.message
      if (err?.data?.error?.message) {
        setBackendError(err.data.error.message); // This will set: "Login details or password is incorrect."
      } else if (err?.data?.message) {
        setBackendError(err.data.message);
      } else {
        setBackendError(
          "An unexpected connection error occurred. Please try again.",
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Show Backend Error Banner if API call fails */}
      {backendError && (
        <View style={styles.backendErrorBox}>
          <Text style={styles.backendErrorText}>{backendError}</Text>
        </View>
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
              setBackendError(null); // Clear errors when user types
              onChange(text);
            }}
            value={value}
            editable={!isLoading}
          />
        )}
      />
      {errors.identifier && (
        <Text style={styles.errorText}>
          {errors.identifier.message as string}
        </Text>
      )}

      {/* Password field remains exactly the same, but clears error on change */}
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
              editable={!isLoading}
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
        <TouchableOpacity disabled={isLoading}>
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
    color: Colors.secondary,
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
    color: Colors.secondary,
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
    marginBottom: 2,
    marginTop: -16,
  },
  backendErrorText: {
    color: Colors.red,
    fontFamily: FontFamily.medium,
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
