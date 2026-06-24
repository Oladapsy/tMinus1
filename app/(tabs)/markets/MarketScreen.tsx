import { StyleSheet, ImageBackground } from "react-native";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import { useState } from "react";

// Components
import MarketDashboardView from "@/src/components/market/MarketDashboardView";
import MarketOrderBook from "@/src/components/market/MarketOrderBook";
import RecentTrades from "@/src/components/market/RescentTrades"; // 🌟 Fixed duplicate/mismatched import name
import MarketWatchlist from "@/src/components/market/MarketWatchlist";
import AlertSuccessView from "@/src/components/market/component/AlertSuccessView";
import CreatePriceAlert from "@/src/components/market/component/CreatePriceAlert";
import MarketTrendingView from "@/src/components/market/MarketTrendingView";
import MarketAssetDetails from "@/src/components/market/MarketAssetDetails";

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
              setWorkflowMode("coinOrderBook"); // Deep dive screen testing path
            }}
            onNavigateToTrending={() => {
              setWorkflowMode("trending"); // Takes user to Screen 2 layout
            }}
            onNavigateToWatchlist={() => {
              setWorkflowMode("watchlist"); // Takes user to Watchlist.png layout
            }}
          />
        )}

        {workflowMode === "trending" && (
          <MarketTrendingView
            onGoBack={() => setWorkflowMode("dashboard")}
            onSelectAsset={(symbol) => {
              setActiveSymbol(symbol);
              setWorkflowMode("coin"); // Takes you to Screen 3 Asset Details layout!
            }}
          />
        )}

        {/* 💎 Screen 3: Asset Details Screen */}
        {workflowMode === "coin" && (
          <MarketAssetDetails
            symbol={activeSymbol}
            onGoBack={() => setWorkflowMode("dashboard")}
            onNavigateToAlert={() => setWorkflowMode("createAlert")} // Takes you straight to Screen 7!
          />
        )}

        {/* 🟢 Screen 4: Order Book Screen */}
        {workflowMode === "coinOrderBook" && (
          <MarketOrderBook
            symbol={activeSymbol}
            onGoBack={() => setWorkflowMode("dashboard")}
            onTradeAction={(symbol) => {
              console.log(`Open trade panel for ${symbol}`);
            }}
            // Toggles between internal tab panels seamlessly
            onToggleView={() => setWorkflowMode("recentTrades")}
          />
        )}

        {/* 🔵 Screen 5: Recent Trades Screen */}
        {workflowMode === "recentTrades" && (
          <RecentTrades
            onGoBack={() => setWorkflowMode("dashboard")}
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
              setWorkflowMode("coinOrderBook"); // 🏃‍♂️ Deep dive into the order book for the selected coin!
            }}
          />
        )}

        {/* Screen 7 */}
        {workflowMode === "createAlert" && (
          <CreatePriceAlert
            symbol={activeSymbol}
            currentPrice={64200.5}
            onGoBack={() => setWorkflowMode("coinOrderBook")}
            onAlertCreated={(payload) => {
              setAlertData({
                direction: payload.direction,
                targetPrice: payload.targetPrice,
              });
              setWorkflowMode("alertSuccess");
            }}
          />
        )}

        {workflowMode === "alertSuccess" && (
          <AlertSuccessView
            symbol={activeSymbol}
            direction={alertData.direction}
            targetPrice={alertData.targetPrice}
            onClose={() => setWorkflowMode("dashboard")}
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
