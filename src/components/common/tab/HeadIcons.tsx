import { View, StyleSheet } from "react-native";
import React from "react";
import IconAndText from "@/src/components/common/tab/IconAndText";
import ProfileIcon from "@/assets/icons/profile/profileImage.svg";
import SearchIcon from "@/assets/icons/main/search.svg";
import ScannerIcon from "@/assets/icons/main/scanner.svg";
import NotificationIcon from "@/assets/icons/main/notification.svg";
import { Colors } from "@/src/constants/colors";
import { router } from "expo-router";

export default function HeadIcons() {
  const handleSearchPress = () => {
    console.log("Search icon pressed");
  };

  const handleScannerPress = () => {
    console.log("Scanner icon pressed");
    router.push("/(tabs)/wallets/WalletScreen");
  };

  const handleNotificationPress = () => {
    console.log("Notification icon pressed");
    router.push("/(tabs)/home/NotificationScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <IconAndText
          icon={
            <ProfileIcon
              height={36}
              width={36}
              onPress={() => router.push("/profile")}
            />
          }
        />
      </View>
      <View style={styles.otherAction}>
        <IconAndText
          icon={
            <SearchIcon
              width={26}
              height={26}
              color={Colors.green}
              onPress={handleSearchPress}
            />
          }
        />
        <IconAndText
          icon={
            <ScannerIcon
              // width={26}
              // height={26}
              color={Colors.green}
              onPress={handleScannerPress}
            />
          }
        />
        <View style={styles.lastIcon}>
          <IconAndText
            icon={
              <NotificationIcon
                // width={26}
                // height={26}
                color={Colors.green}
                onPress={handleNotificationPress}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.tabDarkLight,
    paddingBottom: 10,
    paddingHorizontal: 2,

    // iOS Shadow Props
    shadowColor: Colors.tabDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Android Elevation
    elevation: 12,
  },
  otherAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 9,
    alignItems: "center",
  },
  lastIcon: {
    marginLeft: -10,
  },
});
