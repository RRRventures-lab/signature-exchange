"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Share2, Globe, Music, TrendingUp, BarChart3, Users } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WalletSidebar } from "@/components/dashboard/wallet-sidebar";
import { OrderBook } from "@/components/features/order-book";
import { TradingInterface } from "@/components/features/trading-interface";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { Toast } from "@/components/ui/toast";
import { getAsset, ASSETS } from "@/lib/mock-data";

const typeLabels: Record<string, string> = {
  tour: "Tour Equity",
  publishing: "Publishing",
  master: "Master Shares",
  bundle: "Bundle",
  royalty: "Royalty",
  label: "Label Equity",
};

export default function AssetDetailsPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const asset = getAsset(symbol);

  if (!asset) {
    return (
      <div className="flex h-screen bg-[#FAFAFA]">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Asset Not Found</h1>
            <p className="text-gray-500 mb-4">The asset "{symbol}" doesn't exist.</p>
            <Link href="/markets" className="text-[#0070F3] hover:underline">
              Back to Markets
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Back Link */}
          <Link
            href="/markets"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Asset Info & Chart */}
            <div className="lg:col-span-2 space-y-6">
              {/* Asset Header */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                      <Music className="h-7 w-7" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {asset.name}
                        <span className="text-xs font-medium px-2 py-0.5 bg-[#0070F3]/10 text-[#0070F3] rounded">
                          {typeLabels[asset.type] || asset.type}
                        </span>
                      </h1>
                      <p className="text-sm text-gray-500 font-mono mt-0.5">{asset.symbol}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                      <Globe className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-100 my-5" />

                {/* Stats */}
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold text-gray-900">${asset.price.toFixed(2)}</p>
                    <p className={`text-xs font-medium ${asset.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {asset.change24h > 0 ? "+" : ""}{asset.change24h}% (24h)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(asset.marketCap / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">24h Volume</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(asset.volume24h / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">APY</p>
                    <p className="text-lg font-semibold text-emerald-600">{asset.apy}%</p>
                  </div>
                </div>
              </div>

              {/* Price Chart */}
              <PerformanceChart symbol={symbol} />

              {/* Description */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{asset.description}</p>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <TrendingUp size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Total Supply</p>
                      <p className="text-xs font-medium text-gray-900">
                        {asset.totalSupply.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <BarChart3 size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Available</p>
                      <p className="text-xs font-medium text-gray-900">
                        {asset.availableSupply.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                      <Users size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase">Holders</p>
                      <p className="text-xs font-medium text-gray-900">
                        {Math.floor((asset.totalSupply - asset.availableSupply) / 100)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Trading & Order Book */}
            <div className="space-y-6">
              <TradingInterface symbol={symbol} selectedPrice={selectedPrice} />
              <OrderBook symbol={symbol} onPriceSelect={setSelectedPrice} />
            </div>
          </div>
        </div>
      </main>

      <WalletSidebar />
      <Toast />
    </div>
  );
}
