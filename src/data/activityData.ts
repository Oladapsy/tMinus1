export type ActivityItem = {
  id: string;
  pair: string;
  date: string;
  amount1: string;
  amount2: string;
  price: string;
  status: "Filled" | "Cancelled" | "Pending";
};

export const activityData: ActivityItem[] = [
  {
    id: "1",
    pair: "BTC/BUSD",
    date: "2021-08-02 04:39:26",
    amount1: "0.49975",
    amount2: "0.49975",
    price: "2652.00",
    status: "Filled",
  },
  {
    id: "2",
    pair: "ETH/USDT",
    date: "2021-08-03 12:20:10",
    amount1: "1.20000",
    amount2: "1.20000",
    price: "1820.50",
    status: "Cancelled",
  },
  {
    id: "3",
    pair: "ADA/USDT",
    date: "2021-08-04 08:11:45",
    amount1: "500.00",
    amount2: "500.00",
    price: "1.32",
    status: "Filled",
  },
  {
    id: "4",
    pair: "SHIB/USDT",
    date: "2021-08-05 16:02:01",
    amount1: "1500000",
    amount2: "1500000",
    price: "0.000021",
    status: "Pending",
  },
  {
    id: "5",
    pair: "LINK/BUSD",
    date: "2021-08-06 10:30:55",
    amount1: "25.00",
    amount2: "25.00",
    price: "24.15",
    status: "Filled",
  },
  {
    id: "6",
    pair: "REN/USDT",
    date: "2021-08-07 19:44:12",
    amount1: "300.00",
    amount2: "300.00",
    price: "0.52",
    status: "Cancelled",
  },
];