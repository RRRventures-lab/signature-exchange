"use client";

import { Wallet, ArrowDownLeft, ArrowUpRight, Gift, RefreshCw } from "lucide-react";

interface Transaction {
  id: number;
  type: "buy" | "sell" | "div";
  asset: string;
  amount: string;
  date: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: 1, type: "buy", asset: "NNT", amount: "240.00", date: "2m ago" },
  { id: 2, type: "sell", asset: "LGC", amount: "1,250.00", date: "4h ago" },
  { id: 3, type: "div", asset: "GSF", amount: "45.20", date: "1d ago" },
];

export function WalletSidebar() {
  return (
    <aside className="w-80 flex-shrink-0 h-full border-l border-gray-200 bg-white flex flex-col z-20">
      <div className="p-6 pb-0">
        <h4 className="text-xs font-semibold text-gray-900 mb-4">Wallet</h4>
        {/* Wallet Card */}
        <div className="relative overflow-hidden rounded-xl bg-gray-900 text-white p-5 shadow-lg group cursor-pointer transition-transform hover:scale-[1.02] duration-300">
          {/* Abstract bg for card */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[50px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent z-0" />

          <div className="relative z-10 flex justify-between items-start mb-6">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
              <Wallet size={16} />
            </div>
            <span className="text-[10px] font-mono opacity-60 bg-white/5 px-2 py-0.5 rounded">
              ETH / USDC
            </span>
          </div>
          <div className="relative z-10">
            <div className="text-[10px] text-gray-400 mb-1 uppercase tracking-wider">
              Total Balance
            </div>
            <div className="text-2xl font-medium tracking-tight">$8,240.50</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-1.5 rounded-md bg-white text-gray-900 text-[10px] font-semibold hover:bg-gray-100 transition-colors">
                Deposit
              </button>
              <button className="flex-1 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold backdrop-blur-sm transition-colors border border-white/10">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="flex-1 overflow-hidden flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xs font-semibold text-gray-900">Activity</h4>
          <button className="text-[10px] text-gray-400 hover:text-gray-600">
            View All
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll space-y-5 pr-2">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-start gap-3 group">
              <div
                className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border ${
                  tx.type === "buy"
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : tx.type === "sell"
                      ? "bg-gray-50 border-gray-200 text-gray-600"
                      : "bg-[#0070F3]/5 border-[#0070F3]/20 text-[#0070F3]"
                }`}
              >
                {tx.type === "buy" ? (
                  <ArrowDownLeft size={14} />
                ) : tx.type === "sell" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <Gift size={14} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-xs font-medium text-gray-900 truncate">
                    {tx.type === "buy"
                      ? "Bought"
                      : tx.type === "sell"
                        ? "Sold"
                        : "Received"}{" "}
                    <span className="font-semibold">{tx.asset}</span>
                  </span>
                  <span
                    className={`text-xs font-medium ml-2 ${
                      tx.type === "buy" ? "text-gray-900" : "text-emerald-600"
                    }`}
                  >
                    {tx.type === "buy" ? "-" : "+"}${tx.amount}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400">
                  {tx.date} • Completed
                </div>
              </div>
            </div>
          ))}

          {/* Filler Items */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i + 10} className="flex items-start gap-3 opacity-60 group">
              <div className="mt-0.5 w-7 h-7 rounded-full bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center">
                <RefreshCw size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-xs font-medium text-gray-900">
                    Swap USDC
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    -$120.00
                  </span>
                </div>
                <div className="text-[10px] text-gray-400">3d ago • 0x82...91</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
