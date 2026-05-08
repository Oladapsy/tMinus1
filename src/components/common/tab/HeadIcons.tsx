import { View, StyleSheet } from "react-native";
import React from "react";
import IconAndText from "@/src/components/common/tab/IconAndText";
import ProfileIcon from "@/assets/icons/profile/profileImage.svg";
import SearchIcon from "@/assets/icons/main/search.svg";
import ScannerIcon from "@/assets/icons/main/scanner.svg";
import NotificationIcon from "@/assets/icons/main/notification.svg";
import { Colors } from "@/src/constants/colors";

export default function HeadIcons() {
  const handleSearchPress = () => {
    console.log("Search icon pressed");
  };

  const handleScannerPress = () => {
    console.log("Scanner icon pressed");
  };

  const handleNotificationPress = () => {
    console.log("Notification icon pressed");
  };

  return (
    <View style={styles.container}>
      <View>
        <IconAndText icon={<ProfileIcon height={36} width={36} />} />
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
            <ScannerIcon color={Colors.green} onPress={handleScannerPress} />
          }
        />
        <IconAndText
          icon={
            <NotificationIcon
              width={26}
              height={26}
              color={Colors.green}
              onPress={handleNotificationPress}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: Colors.tabDark,
    paddingBottom: 10,
    paddingHorizontal: 24,
    
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
    gap: 9,
    alignItems: "center",
  },
});
