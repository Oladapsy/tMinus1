import { StyleSheet, ImageBackground } from "react-native";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import { useState } from "react";

// Components
import MarketDashboardView from "@/src/components/market/MarketDashboardView";
import MarketOrderBook from "@/src/components/market/MarketOrderBook";
import RecentTrades from "@/src/components/market/RescentTrades"; // 🌟 Fixed duplicate/mismatched import name
import MarketWatchlist from "@/src/components/market/MarketWatchlist";

type MarketWorkflowMode =
  | "dashboard"
  | "trending"
  | "coin"
  | "coinOrderBook"
  | "recentTrades"
  | "watchlist"
  | "createalert"
  | "alertcreated";

export default function MarketScreen() {
  const [workflowMode, setWorkflowMode] =
    useState<MarketWorkflowMode>("dashboard");
  const [activeSymbol, setActiveSymbol] = useState<string>("BTC");

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
              setWorkflowMode("watchlist"); // Takes user to Screen 2 layout
            }}
            onNavigateToWatchlist={() => {
              setWorkflowMode("watchlist"); // Takes user to Watchlist.png layout
            }}
          />
        )}

        {/* Screen 2 will be here!!! */}
        {/* {workflowMode === "trending" && (
            <MarketTrendingView />
        )} */}

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
