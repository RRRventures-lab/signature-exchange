"use client";

import { Music, ArrowRight } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  ticker: string;
  type: string;
  apy: number;
  price: number;
  change: number;
}

const ASSETS: Asset[] = [
  { id: 1, name: "Neon Nights Tour", ticker: "NNT", type: "Tour Equity", apy: 12.4, price: 54.20, change: 2.4 },
  { id: 2, name: "Legacy Catalog '99", ticker: "LGC", type: "Publishing", apy: 8.1, price: 124.50, change: -0.5 },
  { id: 3, name: "Future Bass Fund", ticker: "FBF", type: "Master Shares", apy: 15.5, price: 12.05, change: 5.2 },
  { id: 4, name: "Global Streaming IV", ticker: "GSF", type: "Bundle", apy: 9.2, price: 100.00, change: 0.8 },
  { id: 5, name: "Indie Pop Royalt.", ticker: "IPR", type: "Royalty", apy: 11.0, price: 32.10, change: 1.2 },
  { id: 6, name: "LoFi Beats Coll.", ticker: "LBC", type: "Master Shares", apy: 7.4, price: 8.45, change: -1.1 },
  { id: 7, name: "K-Pop Synth Wave", ticker: "KSW", type: "Label Equity", apy: 14.2, price: 45.30, change: 3.8 },
];

function AssetRow({ asset }: { asset: Asset }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer group">
      <div className="col-span-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 group-hover:text-[#0070F3] group-hover:border-[#0070F3]/30 transition-colors">
          <Music size={16} />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 leading-tight group-hover:text-[#0070F3] transition-colors">
            {asset.name}
          </div>
          <div className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
            {asset.ticker} • {asset.type}
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
            asset.change >= 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {asset.change > 0 ? "+" : ""}
          {asset.change}%
        </span>
      </div>
    </div>
  );
}

export function AssetList() {
  return (
    <section>
      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-sm font-semibold text-gray-900">Active Assets</h3>
        <button className="text-xs font-medium text-gray-500 hover:text-[#0070F3] transition-colors flex items-center gap-1 group">
          View Marketplace{" "}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="bg-white/50 rounded-xl border border-gray-200 shadow-sm p-2 backdrop-blur-sm">
        <div className="grid grid-cols-12 gap-4 px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-2">
          <div className="col-span-5">Name</div>
          <div className="col-span-3 text-right">APY</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h</div>
        </div>
        <div className="space-y-0.5">
          {ASSETS.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </section>
  );
}
