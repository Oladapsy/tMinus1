import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/colors";
import { FontFamily } from "@/src/constants/fonts";
import BackHeader from "../common/BackHeader";
import MarketAssetRow from "@/src/components/market/component/MarketAssetRow";
import { useGetWatchlistAssetsQuery } from "@/src/services/profileApi";

interface MarketWatchlistProps {
  onGoBack: () => void;
  onExploreMarkets: () => void;
  onSelectAsset: (symbol: string) => void;
}

export default function MarketWatchlist({
  onGoBack,
  onExploreMarkets,
  onSelectAsset,
}: MarketWatchlistProps) {
  const {
    data: watchlistResponse,
    isLoading,
    refetch,
  } = useGetWatchlistAssetsQuery({
    include: "sparkline",
  });

  useEffect(() => {
    const listPoller = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(listPoller);
  }, [refetch]);

  const watchlistData = watchlistResponse?.data ?? [];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <BackHeader
          title="Watchlist"
          paragraph="Assets you follow with row sparklines."
          onBack={onGoBack}
        />

        {isLoading && watchlistData.length === 0 ? (
          <View style={styles.centerLoader}>
            <ActivityIndicator size="small" color={Colors.green} />
          </View>
        ) : (
          <View style={styles.listSection}>
            {watchlistData.map((coin) => (
              <View key={coin.id || coin.symbol} style={styles.rowCardWrapper}>
                <MarketAssetRow
                  coin={coin}
                  onPress={() => onSelectAsset(coin.symbol)}
                />
              </View>
            ))}

            {!isLoading && watchlistData.length === 0 && (
              <Text style={styles.emptyText}>
                Your watchlist is currently empty.
              </Text>
            )}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Add more assets</Text>
          <Text style={styles.infoDescription}>
            Use the market list to add coins to your watchlist.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.actionButton} onPress={onExploreMarkets}>
        <Text style={styles.actionButtonText}>Explore markets</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },
  centerLoader: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  listSection: {
    marginTop: 10,
  },
  rowCardWrapper: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: Colors.newDark,
    borderRadius: 16,
    padding: 30,
    marginTop: 12,
    marginBottom: 10,
  },
  infoTitle: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    marginBottom: 5,
  },
  infoDescription: {
    color: Colors.newSecondary,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    lineHeight: 18,
  },
  emptyText: {
    color: Colors.newSecondary,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    textAlign: "center",
    marginVertical: 30,
  },
  actionButton: {
    position: "absolute",
    bottom: 80,
    left: 24,
    right: 24,
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});
