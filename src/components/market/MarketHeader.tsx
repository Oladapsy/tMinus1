import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import Copy from "@/assets/icons/home/copy.svg";
import Title from "../common/Title";
import Paragraph from "../common/Paragraph";

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
        <Title text={username} size={18} fontFamily={FontFamily.bold} />

        <View style={styles.idRow}>
          <Paragraph text={`ID: ${userId}`} size={14}/>
          <TouchableOpacity onPress={onCopy}>
            <Copy width={9} height={11} color={Colors.secondary} />
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
    paddingTop: 28,
    paddingBottom: 20,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 28,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 11,
  },
  idRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  editBtn: {
    backgroundColor: Colors.green,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
  },
  editText: {
    color: Colors.primary,
    fontFamily: FontFamily.regular,
    fontSize: 14,
  },
});
