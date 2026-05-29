import BitCoinIcon from "@/assets/icons/home/coin/btc.svg";
import ChainlinkIcon from "@/assets/icons/home/coin/chainlink.svg";
import CardanoIcon from "@/assets/icons/home/coin/Cardano.svg";
import ShibaInuIcon from "@/assets/icons/home/coin/shibaInu.svg";
import HifiIcon from "@/assets/icons/home/coin/hifi.svg";
import RenIcon from "@/assets/icons/home/coin/ren.svg";
import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";

export type MarketItem = {
  id: string;
  icon: ComponentType<SvgProps>;
  coin: string;
  coinCode: string;
  price: string;
  percentage: string;
  positive: boolean;
};

export const marketData: MarketItem[] = [
  {
    id: "1",
    icon: BitCoinIcon,
    coin: "Bitcoin",
    coinCode: "BTC",
    price: "32,697.05",
    percentage: "+0.81%",
    positive: true,
  },
  {
    id: "2",
    icon: ChainlinkIcon,
    coin: "Chainlink",
    coinCode: "LINK",
    price: "12,420.11",
    percentage: "-2.34%",
    positive: false,
  },
  {
    id: "3",
    icon: CardanoIcon,
    coin: "Cardano",
    coinCode: "ADA",
    price: "1,120.40",
    percentage: "+1.12%",
    positive: true,
  },
  {
    id: "4",
    icon: ShibaInuIcon,
    coin: "Shiba Inu",
    coinCode: "SHIB",
    price: "0.000023",
    percentage: "-5.80%",
    positive: false,
  },
  {
    id: "5",
    icon: HifiIcon,
    coin: "Hifi",
    coinCode: "HIFI",
    price: "8.42",
    percentage: "+3.21%",
    positive: true,
  },
  {
    id: "6",
    icon: RenIcon,
    coin: "Ren",
    coinCode: "REN",
    price: "0.52",
    percentage: "-0.91%",
    positive: false,
  },
];