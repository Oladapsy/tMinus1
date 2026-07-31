import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import MarketAssetRow from "./component/MarketAssetRow";
import { useGetMarketAssetsQuery } from "@/src/features/market/api/marketApi";
import TitleAndParagraph from "../shared/components/TitleAndParagraph";

interface MarketDashboardViewProps {
  onSelectAsset: (symbol: string) => void;
  onNavigateToTrending: () => void;
  onNavigateToWatchlist: () => void;
}

export default function MarketDashboardView({
  onSelectAsset,
  onNavigateToTrending,
  onNavigateToWatchlist,
}: MarketDashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 📈 Fetch network catalog metrics directly with sparklines included
  const {
    data: assetResponse,
    isLoading,
    refetch,
  } = useGetMarketAssetsQuery({
    q: searchQuery || undefined,
    include: "sparkline",
  });

  // 🔄 Automated 10-second poll engine routine
  useEffect(() => {
    const livePoller = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(livePoller);
  }, [refetch]);

  const activeAssets = assetResponse?.data ?? [];

  const handlePillPress = (filter: "All" | "Gainers" | "Watchlist") => {
    if (filter === "Gainers") {
      onNavigateToTrending();
    } else if (filter === "Watchlist") {
      onNavigateToWatchlist();
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

        {/* 🟢 FIXED: Spacing metrics redistributed onto text field directly to line up alignment */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search coin or symbol"
            placeholderTextColor={Colors.newSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Filter Row */}
        <View style={styles.filterRow}>
          {(["All", "Gainers", "Watchlist"] as const).map((filter) => {
            const isSelected = filter === "All";
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

        {/* Dynamic Network Content State Mapping */}
        {isLoading && activeAssets.length === 0 ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator size="small" color={Colors.green} />
          </View>
        ) : (
          <View style={styles.listContainer}>
            {activeAssets.map((coin) => (
              <View key={coin.id} style={styles.rowCardWrapper}>
                <MarketAssetRow coin={coin} onPress={onSelectAsset} />
              </View>
            ))}

            {!isLoading && activeAssets.length === 0 && (
              <Text style={styles.emptyText}>
                No matching crypto assets located.
              </Text>
            )}
          </View>
        )}
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
    marginBottom: 22,
  },
  searchInput: {
    color: Colors.newWhite,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  centerLoader: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    marginTop: 30,
  },
});
