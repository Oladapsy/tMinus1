import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { Colors } from "@/src/constants/colors";
// route the create alert
import { useRouter } from "expo-router";
import MySafeAreaView from "@/src/features/shared/components/MySafeAreaView";
import MarketDashboardView from "@/src/features/market/MarketDashboardView";
import MarketTrendingView from "@/src/features/market/MarketTrendingView";
import MarketAssetDetails from "@/src/features/market/MarketAssetDetails";
import MarketOrderBook from "@/src/features/market/MarketOrderBook";
import RecentTrades from "@/src/features/market/RescentTrades";
import MarketWatchlist from "@/src/features/market/MarketWatchlist";
import CreatePriceAlert from "@/src/features/market/component/CreatePriceAlert";
import AlertSuccessView from "@/src/features/market/component/AlertSuccessView";

type MarketWorkflowMode =
  | "dashboard"
  | "trending"
  | "coin"
  | "coinOrderBook"
  | "recentTrades"
  | "watchlist"
  | "createAlert"
  | "alertSuccess";

export default function MarketScreen() {
  const [workflowMode, setWorkflowMode] =
    useState<MarketWorkflowMode>("dashboard");
  const [activeSymbol, setActiveSymbol] = useState<string>("BTC");
  const [alertData, setAlertData] = useState({
    direction: "Above" as "Above" | "Below",
    targetPrice: "72000",
  });
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/kyc/kycBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <MySafeAreaView
        style={styles.safeArea}
        edges={["top", "bottom", "left", "right"]}
      >
        {/* 📊 Screen 1: Market Dashboard View */}
        {workflowMode === "dashboard" && (
          <MarketDashboardView
            onSelectAsset={(symbol) => {
              setActiveSymbol(symbol);
              setWorkflowMode("coin");
            }}
            onNavigateToTrending={() => {
              setWorkflowMode("trending");
            }}
            onNavigateToWatchlist={() => {
              setWorkflowMode("watchlist");
            }}
          />
        )}

        {/* Screen 2: Market Trending List View */}
        {workflowMode === "trending" && (
          <MarketTrendingView
            onGoBack={() => setWorkflowMode("dashboard")}
            onSelectAsset={(symbol) => {
              setActiveSymbol(symbol);
              setWorkflowMode("coin");
            }}
          />
        )}

        {/* 💎 Screen 3: Asset Details Screen */}
        {workflowMode === "coin" && (
          <MarketAssetDetails
            symbol={activeSymbol}
            onGoBack={() => setWorkflowMode("dashboard")}
            onNavigateToAlert={() => setWorkflowMode("createAlert")}
            onBuyPress={(symbol) => {
              setActiveSymbol(symbol);
              setWorkflowMode("coinOrderBook");
            }}
          />
        )}

        {/* 🟢 Screen 4: Order Book Screen */}
        {workflowMode === "coinOrderBook" && (
          <MarketOrderBook
            symbol={activeSymbol}
            onGoBack={() => setWorkflowMode("coin")}
            onTradeAction={(symbol) => {
              console.log(`Open trade panel for ${symbol}`);
            }}
            onToggleView={() => setWorkflowMode("recentTrades")}
          />
        )}

        {/* 🔵 Screen 5: Recent Trades Screen */}
        {workflowMode === "recentTrades" && (
          <RecentTrades
            symbol={activeSymbol}
            onGoBack={() => setWorkflowMode("coin")}
            onToggleView={() => setWorkflowMode("coinOrderBook")}
          />
        )}

        {/* 📊 Screen 6: Watchlist Screen */}
        {workflowMode === "watchlist" && (
          <MarketWatchlist
            onGoBack={() => setWorkflowMode("dashboard")}
            onExploreMarkets={() => setWorkflowMode("dashboard")}
            onSelectAsset={(symbol) => {
              setActiveSymbol(symbol);
              setWorkflowMode("coin"); // ✨ Routes safely to Asset details view directly
            }}
          />
        )}

        {/* Screen 7: Alert Creation Screen */}
        {workflowMode === "createAlert" && (
          <CreatePriceAlert
            symbol={activeSymbol} // 🔥 Now accurately forces target coin focus auto-selection
            onGoBack={() => setWorkflowMode("coin")}
            onAlertCreated={(payload) => {
              setAlertData({
                direction: payload.direction,
                targetPrice: payload.targetPrice,
              });
              setWorkflowMode("alertSuccess");
            }}
          />
        )}

        {/* Screen 8: Success State Confirmation */}
        {workflowMode === "alertSuccess" && (
          <AlertSuccessView
            symbol={activeSymbol}
            direction={alertData.direction}
            targetPrice={alertData.targetPrice}
            onClose={() => {
              setWorkflowMode("coin");
              router.push("/profile/security/price-alerts");
            }}
          />
        )}
      </MySafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
