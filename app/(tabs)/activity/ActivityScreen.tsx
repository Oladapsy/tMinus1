import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import HeadIcons from "@/src/components/common/tab/HeadIcons";
import MySafeAreaView from "@/src/components/common/MySafeAreaView";
import { Colors } from "@/src/constants/colors";
import ListItem from "@/src/components/common/ListItem";
import DeopsitIcon from "@/assets/icons/activity/deposit.svg";
import WithdrawlIcon from "@/assets/icons/activity/withdrawal.svg";
import BuyOrderIcon from "@/assets/icons/activity/buyOrder.svg";
import Title from "@/src/components/common/Title";
import Paragraph from "@/src/components/common/Paragraph";
import { FontFamily } from "@/src/constants/fonts";
import ActivityCard from "@/src/components/activity/ActivityCard";
import { useGetTransactionsQuery } from "@/src/services/walletApi";

const ActivityScreen = () => {
  const router = useRouter();

  // 🟢 Enhanced tracking parameter query to mirror exact maximum log capacity limits
  const {
    data: txResponse,
    isLoading,
    refetch,
  } = useGetTransactionsQuery(
    {
      limit: 50,
      page: 1,
    },
    {
      // Forces clean query synchronization refetch logic when jumping between app screens
      refetchOnMountOrArgChange: true,
    },
  );

  const rawTransactions = txResponse?.data ?? [];

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <MySafeAreaView style={Style.container}>
      <HeadIcons />

      {/* Main Header Content */}
      <View style={Style.main}>
        {/* Actions Context Group */}
        <View style={Style.actionTop}>
          <ListItem
            paddingVertical={10}
            icon={<DeopsitIcon />}
            label="Deposit"
            value=""
            onPress={() => {
              router.push({
                pathname: "/(tabs)/wallets/MainWalletScreen",
                params: { action: "open_deposit" },
              });
            }}
          />
          <ListItem
            paddingVertical={10}
            icon={<WithdrawlIcon />}
            label="Withdrawals"
            value=""
            onPress={() => {
              router.push({
                pathname: "/(tabs)/wallets/MainWalletScreen",
                params: { action: "open_withdraw" },
              });
            }}
          />
          <ListItem
            paddingVertical={10}
            icon={<BuyOrderIcon />}
            label="Buy Order"
            value=""
            onPress={() => {
              console.log("Pressed Buy Order");
            }}
            borderBottom={false}
          />
        </View>

        <Title text="Recent Activity" size={18} fontFamily={FontFamily.bold} />
      </View>

      {/* Loading state spinner rendering */}
      {isLoading ? (
        <View style={Style.loaderContainer}>
          <ActivityIndicator size="small" color={Colors.green} />
        </View>
      ) : (
        <FlatList
          data={rawTransactions}
          keyExtractor={(item) =>
            item.id || item.reference || String(Math.random())
          }
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
          renderItem={({ item }) => {
            const cleanAmountString = String(
              item.amount ?? item.toAmount ?? item.fromAmount ?? "0",
            ).replace(/[^0-9.]/g, "");
            const numAmount = parseFloat(cleanAmountString);
            const safeAmount = isNaN(numAmount) ? 0 : numAmount;

            let uiStatus: "Filled" | "Pending" | "Cancelled" = "Pending";
            if (
              item.status?.toLowerCase() === "completed" ||
              item.status?.toLowerCase() === "success"
            ) {
              uiStatus = "Filled";
            } else if (item.status?.toLowerCase() === "failed") {
              uiStatus = "Cancelled";
            }

            const displayType = item.type
              ? item.type.charAt(0).toUpperCase() +
                item.type.slice(1).toLowerCase()
              : "Transaction";

            return (
              <ActivityCard
                pair={
                  item.assetSymbol ? `${item.assetSymbol}/USD` : displayType
                }
                date={formatDate(item.createdAt)}
                amount1={`$${safeAmount.toFixed(2)}`}
                amount2={item.assetSymbol ?? "USD"}
                price={
                  item.reference ? `#${item.reference.substring(0, 8)}` : "N/A"
                }
                status={uiStatus}
              />
            );
          }}
          ListEmptyComponent={
            <View style={Style.emptyContainer}>
              <Paragraph
                text="No transactions recorded yet."
                size={14}
                color={Colors.secondary}
              />
            </View>
          }
          contentContainerStyle={Style.listContent}
        />
      )}
    </MySafeAreaView>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  main: {
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  actionTop: {
    backgroundColor: Colors.tertiary,
    height: 144,
    marginTop: 24,
    borderRadius: 12,
    padding: 10,
    marginBottom: 30,
  },
  listContent: {
    paddingBottom: 120,
    paddingHorizontal: 24,
  },
  loaderContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivityScreen;
