import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import IconAndText from "@/src/components/common/tab/IconAndText";
import SettingsItem from "@/src/components/settings/SettingsItem";
import AboutIcon from "@/assets/icons/settings/about.svg";
import AppearanceIcon from "@/assets/icons/settings/appearance.svg";
import CurrencyIcon from "@/assets/icons/settings/currency.svg";
import LanguageIcon from "@/assets/icons/settings/language.svg";
import PreferenceIcon from "@/assets/icons/settings/preference.svg";
import ArrowBackIcon from "@/assets/icons/main/backward.svg";

export default function SettingsScreen() {
  return (
    <MySafeAreaView style={{ flex: 1, padding: 24 }}>
      <IconAndText
        icon={<ArrowBackIcon />}
        label="Settings"
        onPress={() => console.log("i am settings back")}
      />

      <SettingsItem
        icon={<LanguageIcon />}
        label="Language"
        value="English"
        onPress={() => {}}
      />
      <SettingsItem
        icon={<CurrencyIcon />}
        label="Currency"
        value="USD"
        onPress={() => {}}
      />
      <SettingsItem
        icon={<AppearanceIcon />}
        label="Appearance"
        value="Use Device Settings"
        onPress={() => {}}
      />
      <SettingsItem
        icon={<PreferenceIcon />}
        label="Preference"
        value="Customize"
        onPress={() => {}}
      />
      <SettingsItem
        icon={<AboutIcon />}
        label="About Us"
        value="v1.2.3"
        onPress={() => {}}
      />
    </MySafeAreaView>
  );
}
