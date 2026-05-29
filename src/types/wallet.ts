import React from "react";

export interface WalletItem {
  id: string;
  icon: React.ReactNode;
  coin: string;
  coinCode: string;
  amount: string;
  usdValue: string;
}
