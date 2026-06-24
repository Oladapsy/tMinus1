import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/src/constants/colors";

interface SparklinePoint {
  time: string;
  priceUsd: number;
}

interface MarketMiniSparklineProps {
  points: SparklinePoint[];
  isPositive: boolean;
  width?: number;
  height?: number;
}

export default function MarketMiniSparkline({
  points,
  isPositive,
  width = 75,
  height = 24,
}: MarketMiniSparklineProps) {
  if (!points || points.length < 2) return null;

  const prices = points.map((p) => p.priceUsd);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice === 0 ? 1 : maxPrice - minPrice;

  // Generate SVG vector coordinate points mapping cleanly to view space
  const pathData = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      // Invert Y coordinates so higher price values go UP
      const y = height - ((point.priceUsd - minPrice) / priceRange) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <Svg width={width} height={height}>
      <Path
        d={pathData}
        fill="none"
        stroke={isPositive ? Colors.green : Colors.newRed}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}