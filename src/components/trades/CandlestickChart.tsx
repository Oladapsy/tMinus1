// src/components/trades/CandlestickChart.tsx
import { CandlestickChart } from "react-native-wagmi-charts";

const DATA = [
  { timestamp: 1625945400000, open: 33575, high: 33600, low: 33475, close: 33520 },
  // ... more candles
];

export default function TradeChart() {
  return (
    <CandlestickChart.Provider data={DATA}>
      <CandlestickChart height={200}>
        <CandlestickChart.Candles />
        <CandlestickChart.Crosshair />
      </CandlestickChart>
    </CandlestickChart.Provider>
  );
}