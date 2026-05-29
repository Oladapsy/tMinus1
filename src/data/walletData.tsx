import React from "react";
import BitCoinIcon from "@/assets/icons/home/coin/btc.svg";
import ChainlinkIcon from "@/assets/icons/home/coin/chainlink.svg";
import CardanoIcon from "@/assets/icons/home/coin/Cardano.svg";
import ShibaInuIcon from "@/assets/icons/home/coin/shibaInu.svg";
import HifiIcon from "@/assets/icons/home/coin/hifi.svg";
import RenIcon from "@/assets/icons/home/coin/ren.svg";

export interface WalletItem {
  id: string;
  icon: React.ReactNode;
  coin: string;
  coinCode: string;
  amount: string;
  usdValue: string;
}

export const walletData: WalletItem[] = [
  {
    id: "1",
    icon: <BitCoinIcon width={40} height={40}/>,
    coin: "BITCOIN",
    coinCode: "BTC",
    amount: "32,697.05",
    usdValue: "468,554.23",
  },
  {
    id: "2",
    icon: <ChainlinkIcon width={40} height={40}/>,
    coin: "CHAINLINK",
    coinCode: "LINK",
    amount: "12,420.11",
    usdValue: "120,554.23",
  },
  {
    id: "3",
    icon: <CardanoIcon width={40} height={40}/>,
    coin: "CARDANO",
    coinCode: "ADA",
    amount: "8,120.40",
    usdValue: "98,554.23",
  },
  {
    id: "4",
    icon: <ShibaInuIcon width={40} height={40}/>,
    coin: "SHIBA INU",
    coinCode: "SHIB",
    amount: "32,697.05",
    usdValue: "468,554.23",
  },
  {
    id: "5",
    icon: <HifiIcon width={40} height={40}/>,
    coin: "HIFI",
    coinCode: "MFT",
    amount: "12,420.11",
    usdValue: "120,554.23",
  },
  {
    id: "6",
    icon: <RenIcon width={40} height={40}/>,
    coin: "REN",
    coinCode: "REN",
    amount: "8,120.40",
    usdValue: "98,554.23",
  },
];
