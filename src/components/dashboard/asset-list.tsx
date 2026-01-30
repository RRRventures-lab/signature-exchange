"use client";

import Link from "next/link";
import { Music, ArrowRight } from "lucide-react";
import { ASSETS, type Asset } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

const typeLabels: Record<string, string> = {
  tour: "Tour Equity",
  publishing: "Publishing",
  master: "Master Shares",
  bundle: "Bundle",
  royalty: "Royalty",
  label: "Label Equity"
};

function AssetRow({ asset }: { asset: Asset }) {
  return (
    <Link
      href={`/markets/${asset.symbol}`}
      className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group"
    >
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:text-[#0070F3] group-hover:border-[#0070F3]/30 transition-colors">
          <Music size={16} />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 leading-tight group-hover:text-[#0070F3] transition-colors">
            {asset.name}
          </div>
          <div className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
            {asset.symbol} • {typeLabels[asset.type] || asset.type}
          </div>
        </div>
      </div>
      <div className="col-span-3 text-right text-xs font-medium text-gray-600">
        {asset.apy}%
      </div>
      <div className="col-span-2 text-right text-sm font-medium text-gray-900">
        ${asset.price.toFixed(2)}
      </div>
      <div className="col-span-2 text-right">
        <span
          className={`text-[11px] font-medium ${
            asset.change24h >= 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {asset.change24h > 0 ? "+" : ""}
          {asset.change24h}%
        </span>
      </div>
    </Link>
  );
}

export function AssetList() {
  const searchQuery = useAppStore((state) => state.searchQuery);

  const filteredAssets = ASSETS.filter((asset) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      asset.name.toLowerCase().includes(query) ||
      asset.symbol.toLowerCase().includes(query) ||
      asset.type.toLowerCase().includes(query)
    );
  });

  return (
    <section>
      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-sm font-semibold text-gray-900">
          Active Assets
          {searchQuery && (
            <span className="text-gray-400 font-normal ml-2">
              ({filteredAssets.length} results)
            </span>
          )}
        </h3>
        <Link
          href="/markets"
          className="text-xs font-medium text-gray-500 hover:text-[#0070F3] transition-colors flex items-center gap-1 group"
        >
          View Marketplace{" "}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="bg-white/50 rounded-xl border border-gray-200 shadow-sm p-2 backdrop-blur-sm">
        <div className="grid grid-cols-12 gap-4 px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-2">
          <div className="col-span-5">Name</div>
          <div className="col-span-3 text-right">APY</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h</div>
        </div>
        <div className="space-y-0.5">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetRow key={asset.id} asset={asset} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-sm">
              No assets found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
