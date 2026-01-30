"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X, Music, TrendingUp, Filter } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WalletSidebar } from "@/components/dashboard/wallet-sidebar";
import { Toast } from "@/components/ui/toast";
import { ASSETS, type Asset } from "@/lib/mock-data";

const typeLabels: Record<string, string> = {
  tour: "Tour Equity",
  publishing: "Publishing",
  master: "Master Shares",
  bundle: "Bundle",
  royalty: "Royalty",
  label: "Label Equity",
};

const typeFilters = ["all", "tour", "publishing", "master", "bundle", "royalty", "label"];

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/markets/${asset.symbol}`}
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-[#0070F3]/30 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#0070F3] group-hover:border-[#0070F3]/30 transition-colors">
            <Music size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#0070F3] transition-colors">
              {asset.name}
            </h3>
            <p className="text-xs text-gray-400 font-mono">{asset.symbol}</p>
          </div>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
          {typeLabels[asset.type]}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-bold text-gray-900">${asset.price.toFixed(2)}</p>
          <p className={`text-xs font-medium ${asset.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {asset.change24h > 0 ? "+" : ""}{asset.change24h}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">APY</p>
          <p className="text-sm font-semibold text-emerald-600">{asset.apy}%</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-400">
        <span>MCap: ${(asset.marketCap / 1000000).toFixed(1)}M</span>
        <span>Vol: ${(asset.volume24h / 1000000).toFixed(2)}M</span>
      </div>
    </Link>
  );
}

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"price" | "change" | "apy" | "volume">("volume");

  const filteredAssets = ASSETS.filter((asset) => {
    const matchesSearch =
      !searchQuery ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || asset.type === typeFilter;

    return matchesSearch && matchesType;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price":
        return b.price - a.price;
      case "change":
        return b.change24h - a.change24h;
      case "apy":
        return b.apy - a.apy;
      case "volume":
      default:
        return b.volume24h - a.volume24h;
    }
  });

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-sm text-gray-500 mt-1">
                Browse and trade music IP assets
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              {typeFilters.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    typeFilter === type
                      ? "bg-gray-900 text-white"
                      : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {type === "all" ? "All Types" : typeLabels[type]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs font-medium bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20"
              >
                <option value="volume">Volume</option>
                <option value="price">Price</option>
                <option value="change">24h Change</option>
                <option value="apy">APY</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-xs text-gray-400 mb-4">
            {filteredAssets.length} asset{filteredAssets.length !== 1 ? "s" : ""} found
          </p>

          {/* Asset Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>

          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No assets found</h3>
              <p className="text-xs text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      <WalletSidebar />
      <Toast />
    </div>
  );
}
