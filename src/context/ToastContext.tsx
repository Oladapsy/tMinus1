import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// 1. Define possible toast states
type ToastType = "success" | "error";

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success"); // 2. Track layout state
  const [visible, setVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(-100)).current;

  // 3. Updated function to accept optional type parameter
  const showToast = useCallback(
    (msg: string, type: ToastType = "success") => {
      setMessage(msg);
      setToastType(type);
      setVisible(true);

      // Slide down smoothly from the top
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();

      // Slide back up after 2.5 seconds
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, 2500);
    },
    [slideAnim],
  );

  // 4. Dynamic accent color calculation
  const getAccentColor = () => {
    if (toastType === "error") {
      return Colors.red;
    }
    return Colors.green;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              top: insets.top > 0 ? insets.top + 10 : 20,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Accent bar racks state color outputs seamlessly */}
          <View
            style={[styles.accentBar, { backgroundColor: getAccentColor() }]}
          />
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    backgroundColor: Colors.newDark,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99999,
    shadowColor: Colors.newDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  toastText: {
    color: Colors.newWhite,
    fontSize: 13.5,
    fontFamily: FontFamily.bold,
    textAlign: "left",
    paddingLeft: 4,
  },
});
