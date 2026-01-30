"use client";

import { useState, useMemo } from "react";
import { PORTFOLIO_HISTORY, PRICE_HISTORY, type PricePoint } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

const timeframes = ["1D", "1W", "1M", "1Y", "ALL"];

interface PerformanceChartProps {
  symbol?: string; // If provided, show asset chart; otherwise show portfolio
}

export function PerformanceChart({ symbol }: PerformanceChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [hoveredPoint, setHoveredPoint] = useState<PricePoint | null>(null);

  const getTotalNetWorth = useAppStore((state) => state.getTotalNetWorth);

  // Get the appropriate data source
  const chartData = useMemo(() => {
    if (symbol && PRICE_HISTORY[symbol]) {
      return PRICE_HISTORY[symbol][selectedTimeframe] || [];
    }
    return PORTFOLIO_HISTORY[selectedTimeframe] || [];
  }, [symbol, selectedTimeframe]);

  // Calculate chart bounds
  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (chartData.length === 0) return { minPrice: 0, maxPrice: 100, priceRange: 100 };
    const prices = chartData.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    return { minPrice: min, maxPrice: max, priceRange: range };
  }, [chartData]);

  // Generate SVG path from data
  const pathData = useMemo(() => {
    if (chartData.length < 2) return null;

    const width = 400;
    const height = 100;
    const padding = 5;

    const points = chartData.map((point, i) => {
      const x = (i / (chartData.length - 1)) * width;
      const y = height - padding - ((point.price - minPrice) / priceRange) * (height - padding * 2);
      return { x, y, ...point };
    });

    const line = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
    const fill = `${line} L${width},${height} L0,${height} Z`;

    return { line, fill, points };
  }, [chartData, minPrice, priceRange]);

  const currentValue = hoveredPoint?.price ?? chartData[chartData.length - 1]?.price ?? getTotalNetWorth();
  const startValue = chartData[0]?.price ?? currentValue;
  const changePercent = startValue > 0 ? ((currentValue - startValue) / startValue) * 100 : 0;
  const isPositive = changePercent >= 0;

  return (
    <div className="h-[280px] bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {symbol ? `${symbol} Price` : "Performance"}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ${currentValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`text-xs font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
              {isPositive ? "+" : ""}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                tf === selectedTimeframe
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="absolute inset-x-0 bottom-0 h-44 px-4">
        <div className="w-full h-full relative">
          <svg
            viewBox="0 0 400 100"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? "#10B981" : "#F43F5E"} stopOpacity="0.15" />
                <stop offset="100%" stopColor={isPositive ? "#10B981" : "#F43F5E"} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <path d="M0,25 L400,25" stroke="#F3F4F6" strokeWidth="1" />
            <path d="M0,50 L400,50" stroke="#F3F4F6" strokeWidth="1" />
            <path d="M0,75 L400,75" stroke="#F3F4F6" strokeWidth="1" />

            {/* Fill */}
            {pathData?.fill && (
              <path d={pathData.fill} fill="url(#chartGradient)" />
            )}

            {/* Main Line */}
            {pathData?.line && (
              <path
                d={pathData.line}
                fill="none"
                stroke={isPositive ? "#10B981" : "#F43F5E"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive hover areas */}
            {pathData?.points?.map((point, i) => (
              <rect
                key={i}
                x={point.x - 8}
                y={0}
                width={16}
                height={100}
                fill="transparent"
                onMouseEnter={() => setHoveredPoint(point)}
                className="cursor-crosshair"
              />
            ))}
          </svg>

          {/* Hover tooltip */}
          {hoveredPoint && pathData?.points && (
            <>
              <div
                className="absolute w-2 h-2 rounded-full border-2 border-white shadow-lg"
                style={{
                  left: `${(pathData.points.findIndex((p) => p.timestamp === hoveredPoint.timestamp) / (pathData.points.length - 1)) * 100}%`,
                  top: `${100 - ((hoveredPoint.price - minPrice) / priceRange) * 100}%`,
                  backgroundColor: isPositive ? "#10B981" : "#F43F5E",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <div
                className="absolute bg-gray-900 text-white text-[10px] py-1 px-2 rounded shadow-xl whitespace-nowrap z-10"
                style={{
                  left: `${(pathData.points.findIndex((p) => p.timestamp === hoveredPoint.timestamp) / (pathData.points.length - 1)) * 100}%`,
                  top: `${100 - ((hoveredPoint.price - minPrice) / priceRange) * 100 - 12}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                ${hoveredPoint.price.toFixed(2)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
