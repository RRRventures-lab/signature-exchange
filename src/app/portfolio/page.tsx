"use client";

import Link from "next/link";
import { Music, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WalletSidebar } from "@/components/dashboard/wallet-sidebar";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { Toast } from "@/components/ui/toast";
import { useAppStore } from "@/lib/store";
import { getAsset, calculatePortfolioValue, calculatePortfolioPnL } from "@/lib/mock-data";

export default function PortfolioPage() {
  const portfolio = useAppStore((state) => state.portfolio);
  const balance = useAppStore((state) => state.balance);
  const getTotalNetWorth = useAppStore((state) => state.getTotalNetWorth);
  const getPortfolioPnL = useAppStore((state) => state.getPortfolioPnL);

  const totalNetWorth = getTotalNetWorth();
  const portfolioValue = calculatePortfolioValue(portfolio);
  const pnl = getPortfolioPnL();

  // Calculate holdings with current values
  const holdings = portfolio.map((holding) => {
    const asset = getAsset(holding.symbol);
    const currentValue = asset ? asset.price * holding.shares : 0;
    const costBasis = holding.avgPrice * holding.shares;
    const pnlValue = currentValue - costBasis;
    const pnlPercent = costBasis > 0 ? (pnlValue / costBasis) * 100 : 0;

    return {
      ...holding,
      asset,
      currentValue,
      costBasis,
      pnlValue,
      pnlPercent,
      allocation: portfolioValue > 0 ? (currentValue / portfolioValue) * 100 : 0,
    };
  }).sort((a, b) => b.currentValue - a.currentValue);

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your music IP investments
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Net Worth</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalNetWorth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cash Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total P&L</p>
              <p className={`text-2xl font-bold ${pnl.value >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {pnl.value >= 0 ? "+" : ""}${pnl.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-xs ${pnl.percent >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {pnl.percent >= 0 ? "+" : ""}{pnl.percent.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mb-8">
            <PerformanceChart />
          </div>

          {/* Holdings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Holdings</h3>
            </div>

            {holdings.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                  <div className="col-span-4">Asset</div>
                  <div className="col-span-2 text-right">Shares</div>
                  <div className="col-span-2 text-right">Avg. Price</div>
                  <div className="col-span-2 text-right">Value</div>
                  <div className="col-span-2 text-right">P&L</div>
                </div>

                {/* Rows */}
                {holdings.map((holding) => (
                  <Link
                    key={holding.symbol}
                    href={`/markets/${holding.symbol}`}
                    className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                        <Music size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {holding.asset?.name || holding.symbol}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">{holding.symbol}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="text-sm font-medium text-gray-900">{holding.shares}</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="text-sm font-medium text-gray-900">${holding.avgPrice.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">
                        Now: ${holding.asset?.price.toFixed(2) || "-"}
                      </p>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${holding.currentValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-400">{holding.allocation.toFixed(1)}%</p>
                    </div>
                    <div className="col-span-2 text-right">
                      <p className={`text-sm font-medium flex items-center justify-end gap-1 ${holding.pnlValue >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {holding.pnlValue >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {holding.pnlValue >= 0 ? "+" : ""}${holding.pnlValue.toFixed(2)}
                      </p>
                      <p className={`text-xs ${holding.pnlPercent >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {holding.pnlPercent >= 0 ? "+" : ""}{holding.pnlPercent.toFixed(2)}%
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <PieChart size={24} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No holdings yet</h3>
                <p className="text-xs text-gray-500 mb-4">
                  Start building your portfolio by purchasing assets
                </p>
                <Link
                  href="/markets"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Browse Marketplace
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <WalletSidebar />
      <Toast />
    </div>
  );
}
