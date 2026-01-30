"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Gift, Filter } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WalletSidebar } from "@/components/dashboard/wallet-sidebar";
import { Toast } from "@/components/ui/toast";
import { useAppStore } from "@/lib/store";
import { formatTimeAgo, getAsset, type Transaction } from "@/lib/mock-data";

const typeFilters = ["all", "buy", "sell", "deposit", "withdraw", "dividend"];

const typeLabels: Record<string, string> = {
  all: "All",
  buy: "Buys",
  sell: "Sells",
  deposit: "Deposits",
  withdraw: "Withdrawals",
  dividend: "Dividends",
};

function TransactionRow({ tx }: { tx: Transaction }) {
  const asset = tx.symbol ? getAsset(tx.symbol) : null;

  const getIcon = () => {
    switch (tx.type) {
      case "buy":
        return <ArrowDownLeft size={16} />;
      case "sell":
        return <ArrowUpRight size={16} />;
      case "dividend":
        return <Gift size={16} />;
      case "deposit":
        return <ArrowDownLeft size={16} />;
      case "withdraw":
        return <ArrowUpRight size={16} />;
      default:
        return <ArrowUpRight size={16} />;
    }
  };

  const getIconStyle = () => {
    switch (tx.type) {
      case "buy":
        return "bg-emerald-50 border-emerald-200 text-emerald-600";
      case "sell":
        return "bg-rose-50 border-rose-200 text-rose-600";
      case "dividend":
        return "bg-[#0070F3]/5 border-[#0070F3]/20 text-[#0070F3]";
      case "deposit":
        return "bg-emerald-50 border-emerald-200 text-emerald-600";
      case "withdraw":
        return "bg-gray-50 border-gray-200 text-gray-600";
      default:
        return "bg-gray-50 border-gray-200 text-gray-600";
    }
  };

  const getLabel = () => {
    switch (tx.type) {
      case "buy":
        return "Bought";
      case "sell":
        return "Sold";
      case "dividend":
        return "Dividend";
      case "deposit":
        return "Deposited";
      case "withdraw":
        return "Withdrawn";
      default:
        return tx.type;
    }
  };

  const isDebit = tx.type === "buy" || tx.type === "withdraw";

  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
      <div className="col-span-5 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center border ${getIconStyle()}`}>
          {getIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {getLabel()} {tx.symbol && <span className="font-semibold">{tx.symbol}</span>}
          </p>
          <p className="text-xs text-gray-400">{formatTimeAgo(tx.timestamp)}</p>
        </div>
      </div>

      <div className="col-span-2 text-right">
        {tx.shares ? (
          <p className="text-sm text-gray-600">{tx.shares} shares</p>
        ) : (
          <p className="text-sm text-gray-400">-</p>
        )}
      </div>

      <div className="col-span-2 text-right">
        {tx.price ? (
          <p className="text-sm text-gray-600">${tx.price.toFixed(2)}</p>
        ) : (
          <p className="text-sm text-gray-400">-</p>
        )}
      </div>

      <div className="col-span-2 text-right">
        <p className={`text-sm font-medium ${isDebit ? "text-gray-900" : "text-emerald-600"}`}>
          {isDebit ? "-" : "+"}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      <div className="col-span-1 text-right">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
          tx.status === "completed"
            ? "bg-emerald-50 text-emerald-600"
            : tx.status === "pending"
              ? "bg-amber-50 text-amber-600"
              : "bg-rose-50 text-rose-600"
        }`}>
          {tx.status}
        </span>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const transactions = useAppStore((state) => state.transactions);
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    return typeFilter === "all" || tx.type === typeFilter;
  });

  // Calculate totals
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "buy" || tx.type === "withdraw") {
        acc.outflow += tx.amount;
      } else {
        acc.inflow += tx.amount;
      }
      return acc;
    },
    { inflow: 0, outflow: 0 }
  );

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-500 mt-1">
              View your complete transaction history
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Inflow</p>
              <p className="text-2xl font-bold text-emerald-600">
                +${totals.inflow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Total Outflow</p>
              <p className="text-2xl font-bold text-gray-900">
                -${totals.outflow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6">
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
                {typeLabels[type]}
              </button>
            ))}
          </div>

          {/* Transaction List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 border-b border-gray-100">
              <div className="col-span-5">Transaction</div>
              <div className="col-span-2 text-right">Shares</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-1 text-right">Status</div>
            </div>

            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {filteredTransactions.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Filter size={24} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No transactions found</h3>
                <p className="text-xs text-gray-500">
                  {typeFilter !== "all"
                    ? `No ${typeLabels[typeFilter].toLowerCase()} yet`
                    : "Your transaction history will appear here"}
                </p>
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
