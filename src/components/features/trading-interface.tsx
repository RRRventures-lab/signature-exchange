"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { getAsset } from "@/lib/mock-data";

interface TradingInterfaceProps {
  symbol: string;
  selectedPrice?: number;
}

export function TradingInterface({ symbol, selectedPrice }: TradingInterfaceProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const balance = useAppStore((state) => state.balance);
  const portfolio = useAppStore((state) => state.portfolio);
  const buyAsset = useAppStore((state) => state.buyAsset);
  const sellAsset = useAppStore((state) => state.sellAsset);
  const showToast = useAppStore((state) => state.showToast);

  const asset = getAsset(symbol);
  const holding = portfolio.find((h) => h.symbol === symbol);
  const currentPrice = selectedPrice || asset?.price || 0;

  // Update price when selectedPrice changes
  useEffect(() => {
    if (selectedPrice) {
      setPrice(selectedPrice.toString());
    }
  }, [selectedPrice]);

  const shares = parseFloat(amount) || 0;
  const total = shares * currentPrice;
  const fee = total * 0.001; // 0.1% fee
  const totalWithFee = activeTab === "buy" ? total + fee : total - fee;

  const canBuy = shares > 0 && totalWithFee <= balance;
  const canSell = shares > 0 && holding && shares <= holding.shares;

  const handleTrade = () => {
    if (activeTab === "buy") {
      const result = buyAsset(symbol, shares, currentPrice);
      showToast(result.message);
      if (result.success) {
        setAmount("");
      }
    } else {
      const result = sellAsset(symbol, shares, currentPrice);
      showToast(result.message);
      if (result.success) {
        setAmount("");
      }
    }
  };

  const setPercentage = (percent: number) => {
    if (activeTab === "buy") {
      const maxShares = Math.floor((balance * percent) / currentPrice);
      setAmount(maxShares.toString());
    } else if (holding) {
      const sellShares = Math.floor(holding.shares * percent);
      setAmount(sellShares.toString());
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Tab Header */}
      <div className="grid grid-cols-2 border-b border-gray-100">
        <button
          onClick={() => setActiveTab("buy")}
          className={`py-3 text-sm font-semibold transition-colors ${
            activeTab === "buy"
              ? "text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`py-3 text-sm font-semibold transition-colors ${
            activeTab === "sell"
              ? "text-rose-600 border-b-2 border-rose-500 bg-rose-50/50"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Available Balance / Holdings */}
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">
            {activeTab === "buy" ? "Available Balance" : "Available Shares"}
          </span>
          <span className="font-medium text-gray-900">
            {activeTab === "buy"
              ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
              : `${holding?.shares || 0} ${symbol}`}
          </span>
        </div>

        {/* Price Input */}
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 font-medium">Price (USDC)</label>
          <div className="relative">
            <input
              type="number"
              value={price || currentPrice}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono text-right pr-14 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              USDC
            </span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 font-medium">Amount (Shares)</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono text-right pr-16 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              SHARES
            </span>
          </div>
        </div>

        {/* Quick Percentage Buttons */}
        <div className="flex gap-2">
          {[0.25, 0.5, 0.75, 1].map((pct) => (
            <button
              key={pct}
              onClick={() => setPercentage(pct)}
              className="flex-1 py-1.5 text-[10px] font-semibold border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              {pct * 100}%
            </button>
          ))}
        </div>

        {/* Order Summary */}
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-mono">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Fee (0.1%)</span>
            <span className="font-mono text-gray-400">${fee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium pt-1">
            <span className="text-gray-700">Total</span>
            <span className="font-mono">
              ${totalWithFee.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Trade Button */}
        <button
          onClick={handleTrade}
          disabled={activeTab === "buy" ? !canBuy : !canSell}
          className={`w-full py-3 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            activeTab === "buy"
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-rose-500 hover:bg-rose-600 text-white"
          }`}
        >
          {activeTab === "buy" ? `Buy ${symbol}` : `Sell ${symbol}`}
        </button>
      </div>
    </div>
  );
}
