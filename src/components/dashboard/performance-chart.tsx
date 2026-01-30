"use client";

import { useState } from "react";

const timeframes = ["1D", "1W", "1M", "1Y", "ALL"];

export function PerformanceChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");

  return (
    <div className="h-[280px] bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
          <p className="text-[11px] text-gray-400 mt-1">
            Portfolio growth over time
          </p>
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
      <div className="absolute inset-x-0 bottom-0 h-48 px-4">
        <ChartSVG />
      </div>
    </div>
  );
}

function ChartSVG() {
  return (
    <div className="w-full h-full relative group">
      <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0070F3" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0070F3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        <path d="M0,30 L400,30" stroke="#F3F4F6" strokeWidth="1" />
        <path d="M0,60 L400,60" stroke="#F3F4F6" strokeWidth="1" />
        <path d="M0,90 L400,90" stroke="#F3F4F6" strokeWidth="1" />

        {/* Dashed line */}
        <path
          d="M0,100 C30,90 60,110 90,80 C120,50 150,70 180,60 C210,50 240,20 270,40 C300,60 330,30 360,10 L400,30"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Main Line */}
        <path
          d="M0,80 C40,80 60,100 100,70 C140,40 180,60 220,40 C260,20 300,30 340,10 L400,5"
          fill="none"
          stroke="#0070F3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Fill */}
        <path
          d="M0,80 C40,80 60,100 100,70 C140,40 180,60 220,40 C260,20 300,30 340,10 L400,5 L400,120 L0,120 Z"
          fill="url(#chartGradient)"
        />
      </svg>

      {/* Tooltip Dot */}
      <div className="absolute top-[8%] left-[85%] w-2.5 h-2.5 bg-[#0070F3] rounded-full border border-white shadow-lg z-10">
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          $24,592.00
        </div>
      </div>
    </div>
  );
}
