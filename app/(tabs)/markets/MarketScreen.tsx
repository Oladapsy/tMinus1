import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";

// Components
import MarketDashboardView from "@/src/components/market/MarketDashboardView";
import MarketOrderBook from "@/src/components/market/MarketOrderBook";
import RecentTrades from "@/src/components/market/RescentTrades";
import MarketWatchlist from "@/src/components/market/MarketWatchlist";
import AlertSuccessView from "@/src/components/market/component/AlertSuccessView";
import CreatePriceAlert from "@/src/components/market/component/CreatePriceAlert";
import MarketTrendingView from "@/src/components/market/MarketTrendingView";
import MarketAssetDetails from "@/src/components/market/MarketAssetDetails";

// route the create alert
import { useRouter } from "expo-router";

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
