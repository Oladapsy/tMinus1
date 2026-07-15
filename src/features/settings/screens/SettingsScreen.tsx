import Back from "@/assets/icons/main/backward.svg";
import AboutIcon from "@/assets/icons/settings/about.svg";
import AppearanceIcon from "@/assets/icons/settings/appearance.svg";
import CurrencyIcon from "@/assets/icons/settings/currency.svg";
import LanguageIcon from "@/assets/icons/settings/language.svg";
import PreferenceIcon from "@/assets/icons/settings/preference.svg";

import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import ListItem from "@/src/features/shared/components/ListItem";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import IconAndText from "@/src/features/shared/components/tab/IconAndText";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  return (
    <MySafeAreaView style={Style.container}>
      <View style={Style.headWrapper}>
        <IconAndText
          icon={<Back color={Colors.secondary} />}
          label="Settings"
          labelStyle={Style.headLabel}
          onPress={() => {
            router.back();
          }}
          containerStyle={Style.headContainer}
        />
      </View>

      <ListItem
        icon={<LanguageIcon />}
        label="Language"
        value="English"
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <ListItem
        icon={<CurrencyIcon />}
        label="Currency"
        value="USD"
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <ListItem
        icon={<AppearanceIcon />}
        label="Appearance"
        value="Use Device Settings"
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <ListItem
        icon={<PreferenceIcon />}
        label="Preference"
        value="Customize"
        onPress={() => {
          console.log("Pressed");
        }}
      />
      <ListItem
        icon={<AboutIcon />}
        label="About Us"
        value="v1.2.3"
        onPress={() => {
          console.log("Pressed");
        }}
      />
    </MySafeAreaView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
  },
  headContainer: { flexDirection: "row", gap: 10 },
  headWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  headLabel: {
    color: "white",
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
});
