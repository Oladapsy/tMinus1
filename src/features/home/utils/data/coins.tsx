// src/data/coins.ts
import BTCIcon from "@/assets/icons/home/coin/bitcoin.svg";
import CARDANOIcon from "@/assets/icons/home/coin/Cardano.svg"
import CHAINLINKIcon from "@/assets/icons/home/coin/chainlink.svg"
import HIFIIcon from "@/assets/icons/home/coin/hifi.svg"
import MFTIcon from "@/assets/icons/home/coin/mft.svg"
import RENIcon from "@/assets/icons/home/coin/ren.svg"
import SHIBAINUIcon from "@/assets/icons/home/coin/shibaInu.svg"
import SOLIcon from "@/assets/icons/home/coin/sol.svg"
import { CoinItem } from "@/src/features/home/CoinList";

export const RECENT_COINS: CoinItem[] = [
  {
    icon: <BTCIcon width={32} height={32}/>,
    price: "40,059.83",
    pair: "BTC/BUSD",
    change: "+0.81%",
    changePositive: true,
  },
  {
    icon: <CARDANOIcon width={32} height={32}/>,
    price: "2,059.83",
    pair: "CAR/BUSD",
    change: "-0.81%",
    changePositive: false,
  },
  {
    icon: <HIFIIcon  width={32} height={32}/>,
    price: "40,059.83",
    pair: "HFI/BTC",
    change: "+0.81%",
    changePositive: true,
  },
  {
    icon: <RENIcon width={32} height={32} />,
    price: "2,059.83",
    pair: "REN/BUSD",
    change: "-0.81%",
    changePositive: false,
  },
];

export const TOP_COINS: CoinItem[] = [
  {
    icon: <MFTIcon width={32} height={32} />,
    price: "40,059.83",
    pair: "MFT/BUSD",
    change: "+0.81%",
    changePositive: true,
  },
  {
    icon: <CHAINLINKIcon width={32} height={32} />,
    price: "2,059.83",
    pair: "REN/BUSD",
    change: "-0.81%",
    changePositive: false,
  },
  {
    icon: <SHIBAINUIcon width={32} height={32} />,
    price: "2,059.83",
    pair: "REN/BUSD",
    change: "-0.81%",
    changePositive: false,
  },
  {
    icon: <SOLIcon width={32} height={32} />,
    price: "2,059.83",
    pair: "REN/BUSD",
    change: "-0.81%",
    changePositive: false,
  },
];
