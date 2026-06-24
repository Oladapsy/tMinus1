import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import TitleAndParagraph from "@/src/components/common/TitleAndParagraph";
import MarketAssetRow from "./component/MarketAssetRow";

const MOCK_MARKETS = [
  {
    id: "asset_btc",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Testnet",
    priceUsd: 64200.5,
    change24h: 2.1,
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/btc.svg",
    initial: "B",
    badgeBg: "#E28A16",
  },
  {
    id: "asset_eth",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum Sepolia",
    priceUsd: 3420.0,
    change24h: -1.1,
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/eth.svg",
    initial: "E",
    badgeBg: "#3758FF",
  },
  {
    id: "asset_sol",
    name: "Solana",
    symbol: "SOL",
    network: "Solana Devnet",
    priceUsd: 152.0,
    change24h: 4.2,
    isActive: true,
    minBuyUsd: 10,
    minSellUsd: 10,
    iconUrl: "/assets/sol.svg",
    initial: "S",
    badgeBg: "#00FFA3",
  },
];

interface MarketDashboardViewProps {
  onSelectAsset: (symbol: string) => void;
  onNavigateToTrending: () => void; // 🌟 Made mandatory since it's wired to the "Gainers" pill
  onNavigateToWatchlist: () => void; // 🌟 New mandatory callback to wire up the "Watchlist" pill
}

export default function MarketDashboardView({
  onSelectAsset,
  onNavigateToTrending,
  onNavigateToWatchlist,
}: MarketDashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Handler for intercepts when clicking pills
  const handlePillPress = (filter: "All" | "Gainers" | "Watchlist") => {
    if (filter === "Gainers") {
      onNavigateToTrending(); // 🏃‍♂️ Reroutes straight to Screen 2
    } else if (filter === "Watchlist") {
      onNavigateToWatchlist(); // 🏃‍♂️ Reroutes straight to Watchlist.png layout
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <TitleAndParagraph
            title="Markets"
            paragraph="Search assets, view live prices, and open a coin detail screen."
          />
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search coin or symbol"
            placeholderTextColor={Colors.newSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Row Acting as Screen Shortcuts */}
        <View style={styles.filterRow}>
          {(["All", "Gainers", "Watchlist"] as const).map((filter) => {
            const isSelected = filter === "All"; // Dashboard defaults visually to highlighting "All"
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => handlePillPress(filter)}
                style={[
                  styles.filterPill,
                  isSelected && styles.activeFilterPill,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.listContainer}>
          {MOCK_MARKETS.filter((item) => {
            if (
              searchQuery &&
              !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              !item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            )
              return false;
            return true;
          }).map((coin) => (
            <View key={coin.id} style={styles.rowCardWrapper}>
              <MarketAssetRow
                key={coin.id}
                coin={coin}
                onPress={onSelectAsset}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: Colors.newDark,
    borderRadius: 14,
    paddingHorizontal: 26,
    paddingVertical: 17,
    marginBottom: 22,
  },
  searchInput: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    padding: 0,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  activeFilterPill: {
    backgroundColor: Colors.green,
  },
  filterText: {
    color: Colors.newSecondary,
    fontSize: 11,
    fontFamily: FontFamily.medium,
  },
  activeFilterText: {
    color: Colors.primary,
    fontFamily: FontFamily.bold,
  },
  listContainer: {
    gap: 16,
  },
  rowCardWrapper: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: -6,
  },
});
