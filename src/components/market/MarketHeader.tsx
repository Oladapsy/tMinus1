import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Copy from "@/assets/icons/home/copy.svg";

interface ProfileHeaderProps {
  avatar: any; // image source
  username: string;
  userId: string;
  onCopy?: () => void;
  onEdit?: () => void;
}

export default function ProfileHeader({
  avatar,
  username,
  userId,
  onCopy,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image source={avatar} style={styles.avatar} />

      {/* Username + ID */}
      <View style={styles.infoWrapper}>
        <Text style={styles.username}>{username}</Text>

        <View style={styles.idRow}>
          <Text style={styles.userId}>ID: {userId}</Text>
          <TouchableOpacity onPress={onCopy}>
            <Copy width={16} height={16} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: 'white',
  },
  idRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  userId: {
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: FontFamily.regular,
  },
  editBtn: {
    backgroundColor: Colors.green,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editText: {
    color: 'white',
    fontFamily: FontFamily.bold,
    fontSize: 14,
  },
});
