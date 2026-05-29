import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import PrimaryButton from "@/src/components/common/PrimaryButton";
import SpotContent from "@/src/components/market/SpotContent";
import Paragraph from "@/src/components/common/Paragraph";
import PlusIcon from "@/assets/icons/market/add-circle.svg";

const MarketScreen = () => {
  const [activeTab, setActiveTab] = useState<
    "Spot" | "Convert" | "Margin" | "Fiat"
  >("Spot");
  const [favorites, setFavorites] = useState<string[]>([]); //

  const handleAddFavorite = (coinCode: string) => {
    if (!favorites.includes(coinCode)) {
      setFavorites([...favorites, coinCode]);
    }
    console.log(favorites)
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeadIcons />

      {/* Tabs || Spot | Convert | Margin | Fiat */}
      <View style={styles.topTabs}>
        {["Convert", "Spot", "Margin", "Fiat"].map((tab) => (
          <PrimaryButton
            key={tab}
            text={tab}
            fullWidth={false}
            style={{ flex: 1, height: 38 }}
            fontSize={14}
            Bgcolor={activeTab === tab ? Colors.primary : Colors.tabDark}
            textColor={activeTab === tab ? Colors.mediumGray : Colors.secondary}
            onPress={() =>
              setActiveTab(tab as "Spot" | "Convert" | "Margin" | "Fiat")
            }
          />
        ))}
      </View>

      {/* Render content based on active tab */}
      <View style={styles.body}>
        {activeTab === "Spot" && (
          <View>
            <SpotContent />
            <TouchableOpacity
              style={styles.addFavoriteBtn}
              onPress={() => handleAddFavorite("BTC")}
            >
              <PlusIcon />
              <Paragraph text="Add Favorite" size={18} />
            </TouchableOpacity>
          </View>
        )}
        {activeTab === "Convert" && (
          <View>
            <PrimaryButton text="Convert content..." />
          </View>
        )}
        {activeTab === "Margin" && (
          <View>
            <PrimaryButton text="Margin content..." />
          </View>
        )}
        {activeTab === "Fiat" && (
          <View>
            <PrimaryButton text="Fiat content..." />
          </View>
        )}
      </View>
    </MySafeAreaView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  topTabs: {
    backgroundColor: Colors.tabDark,
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 9,
    borderRadius: 12,
    padding: 4,
  },
  body: {
    paddingHorizontal: 24,
  },
  addFavoriteBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    height: 60,
    marginTop: 16,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: Colors.favBg,
    borderWidth: 2,
    borderColor: Colors.favBorder,
    borderStyle: 'dashed',
  },
});
