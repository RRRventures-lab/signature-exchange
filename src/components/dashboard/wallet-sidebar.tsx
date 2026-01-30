"use client";

import { useState } from "react";
import Link from "next/link";
import { Wallet, ArrowDownLeft, ArrowUpRight, Gift, RefreshCw, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatTimeAgo, getAsset } from "@/lib/mock-data";

function DepositModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const deposit = useAppStore((state) => state.deposit);
  const showToast = useAppStore((state) => state.showToast);

  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      deposit(value);
      showToast(`Deposited $${value.toFixed(2)} successfully`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-80 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Deposit Funds</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20"
            />
          </div>
          <div className="flex gap-2">
            {[100, 500, 1000, 5000].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val.toString())}
                className="flex-1 py-1 text-[10px] font-medium border border-gray-200 rounded hover:bg-gray-50"
              >
                ${val}
              </button>
            ))}
          </div>
          <button
            onClick={handleDeposit}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full py-2.5 bg-[#0070F3] text-white rounded-lg text-xs font-semibold hover:bg-[#0060D3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}

function SendModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const withdraw = useAppStore((state) => state.withdraw);
  const balance = useAppStore((state) => state.balance);
  const showToast = useAppStore((state) => state.showToast);

  const handleSend = () => {
    const value = parseFloat(amount);
    if (value > 0 && address) {
      const success = withdraw(value);
      if (success) {
        showToast(`Sent $${value.toFixed(2)} to ${address.slice(0, 8)}...`);
        onClose();
      } else {
        showToast("Insufficient balance");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 w-80 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Send Funds</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Recipient Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-500">Amount (USDC)</label>
              <span className="text-xs text-gray-400">Balance: ${balance.toFixed(2)}</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              max={balance}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20"
            />
          </div>
          <button
            onClick={() => setAmount(balance.toString())}
            className="text-xs text-[#0070F3] hover:underline"
          >
            Send Max
          </button>
          <button
            onClick={handleSend}
            disabled={!amount || !address || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export function WalletSidebar() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const balance = useAppStore((state) => state.balance);
  const transactions = useAppStore((state) => state.transactions);

  const recentTransactions = transactions.slice(0, 7);

  return (
    <>
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
              <div className="text-2xl font-medium tracking-tight">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowDeposit(true)}
                  className="flex-1 py-1.5 rounded-md bg-white text-gray-900 text-[10px] font-semibold hover:bg-gray-100 transition-colors"
                >
                  Deposit
                </button>
                <button
                  onClick={() => setShowSend(true)}
                  className="flex-1 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold backdrop-blur-sm transition-colors border border-white/10"
                >
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
            <Link href="/transactions" className="text-[10px] text-gray-400 hover:text-gray-600">
              View All
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto custom-scroll space-y-4 pr-2">
            {recentTransactions.map((tx) => {
              const asset = tx.symbol ? getAsset(tx.symbol) : null;
              return (
                <div key={tx.id} className="flex items-start gap-3 group">
                  <div
                    className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border ${
                      tx.type === "buy"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                        : tx.type === "sell"
                          ? "bg-rose-50 border-rose-200 text-rose-600"
                          : tx.type === "dividend"
                            ? "bg-[#0070F3]/5 border-[#0070F3]/20 text-[#0070F3]"
                            : tx.type === "deposit"
                              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                              : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    {tx.type === "buy" ? (
                      <ArrowDownLeft size={14} />
                    ) : tx.type === "sell" ? (
                      <ArrowUpRight size={14} />
                    ) : tx.type === "dividend" ? (
                      <Gift size={14} />
                    ) : tx.type === "deposit" ? (
                      <ArrowDownLeft size={14} />
                    ) : (
                      <ArrowUpRight size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-medium text-gray-900 truncate">
                        {tx.type === "buy"
                          ? "Bought"
                          : tx.type === "sell"
                            ? "Sold"
                            : tx.type === "dividend"
                              ? "Received"
                              : tx.type === "deposit"
                                ? "Deposited"
                                : "Sent"}{" "}
                        {tx.symbol && <span className="font-semibold">{tx.symbol}</span>}
                      </span>
                      <span
                        className={`text-xs font-medium ml-2 ${
                          tx.type === "buy" || tx.type === "withdraw"
                            ? "text-gray-900"
                            : "text-emerald-600"
                        }`}
                      >
                        {tx.type === "buy" || tx.type === "withdraw" ? "-" : "+"}$
                        {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {formatTimeAgo(tx.timestamp)} • {tx.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Modals */}
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
      {showSend && <SendModal onClose={() => setShowSend(false)} />}
    </>
  );
}
