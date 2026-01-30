"use client";

import { create } from "zustand";
import {
  type Transaction,
  type PortfolioHolding,
  INITIAL_BALANCE,
  INITIAL_PORTFOLIO,
  INITIAL_TRANSACTIONS,
  getAsset,
  calculatePortfolioValue,
  calculatePortfolioPnL,
} from "./mock-data";

interface TradeResult {
  success: boolean;
  message: string;
  transaction?: Transaction;
}

interface AppState {
  // User state
  balance: number;
  portfolio: PortfolioHolding[];
  transactions: Transaction[];

  // UI state
  searchQuery: string;
  showDepositModal: boolean;
  showSendModal: boolean;
  toastMessage: string | null;

  // Computed values
  getPortfolioValue: () => number;
  getPortfolioPnL: () => { value: number; percent: number };
  getTotalNetWorth: () => number;

  // Actions
  setSearchQuery: (query: string) => void;
  setShowDepositModal: (show: boolean) => void;
  setShowSendModal: (show: boolean) => void;
  showToast: (message: string) => void;
  clearToast: () => void;

  // Trading actions
  buyAsset: (symbol: string, shares: number, price: number) => TradeResult;
  sellAsset: (symbol: string, shares: number, price: number) => TradeResult;
  deposit: (amount: number) => void;
  withdraw: (amount: number) => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  balance: INITIAL_BALANCE,
  portfolio: INITIAL_PORTFOLIO,
  transactions: INITIAL_TRANSACTIONS,
  searchQuery: "",
  showDepositModal: false,
  showSendModal: false,
  toastMessage: null,

  // Computed values
  getPortfolioValue: () => calculatePortfolioValue(get().portfolio),
  getPortfolioPnL: () => calculatePortfolioPnL(get().portfolio),
  getTotalNetWorth: () => get().balance + calculatePortfolioValue(get().portfolio),

  // UI Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setShowDepositModal: (show) => set({ showDepositModal: show }),
  setShowSendModal: (show) => set({ showSendModal: show }),

  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => set({ toastMessage: null }), 3000);
  },

  clearToast: () => set({ toastMessage: null }),

  // Buy asset
  buyAsset: (symbol, shares, price) => {
    const state = get();
    const totalCost = shares * price;
    const fee = totalCost * 0.001; // 0.1% fee
    const totalWithFee = totalCost + fee;

    if (totalWithFee > state.balance) {
      return {
        success: false,
        message: "Insufficient balance"
      };
    }

    const asset = getAsset(symbol);
    if (!asset) {
      return {
        success: false,
        message: "Asset not found"
      };
    }

    // Create transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: "buy",
      symbol,
      amount: totalWithFee,
      price,
      shares,
      timestamp: new Date(),
      status: "completed"
    };

    // Update portfolio
    const existingHolding = state.portfolio.find(h => h.symbol === symbol);
    let newPortfolio: PortfolioHolding[];

    if (existingHolding) {
      // Calculate new average price
      const totalShares = existingHolding.shares + shares;
      const totalCostBasis = (existingHolding.shares * existingHolding.avgPrice) + (shares * price);
      const newAvgPrice = totalCostBasis / totalShares;

      newPortfolio = state.portfolio.map(h =>
        h.symbol === symbol
          ? { ...h, shares: totalShares, avgPrice: parseFloat(newAvgPrice.toFixed(2)) }
          : h
      );
    } else {
      newPortfolio = [
        ...state.portfolio,
        { symbol, shares, avgPrice: price }
      ];
    }

    set({
      balance: parseFloat((state.balance - totalWithFee).toFixed(2)),
      portfolio: newPortfolio,
      transactions: [transaction, ...state.transactions]
    });

    return {
      success: true,
      message: `Bought ${shares} ${symbol} shares for $${totalCost.toFixed(2)}`,
      transaction
    };
  },

  // Sell asset
  sellAsset: (symbol, shares, price) => {
    const state = get();
    const holding = state.portfolio.find(h => h.symbol === symbol);

    if (!holding || holding.shares < shares) {
      return {
        success: false,
        message: "Insufficient shares"
      };
    }

    const totalValue = shares * price;
    const fee = totalValue * 0.001; // 0.1% fee
    const totalAfterFee = totalValue - fee;

    // Create transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: "sell",
      symbol,
      amount: totalAfterFee,
      price,
      shares,
      timestamp: new Date(),
      status: "completed"
    };

    // Update portfolio
    const newPortfolio = holding.shares === shares
      ? state.portfolio.filter(h => h.symbol !== symbol)
      : state.portfolio.map(h =>
          h.symbol === symbol
            ? { ...h, shares: h.shares - shares }
            : h
        );

    set({
      balance: parseFloat((state.balance + totalAfterFee).toFixed(2)),
      portfolio: newPortfolio,
      transactions: [transaction, ...state.transactions]
    });

    return {
      success: true,
      message: `Sold ${shares} ${symbol} shares for $${totalAfterFee.toFixed(2)}`,
      transaction
    };
  },

  // Deposit
  deposit: (amount) => {
    const state = get();
    const transaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: "deposit",
      amount,
      timestamp: new Date(),
      status: "completed"
    };

    set({
      balance: parseFloat((state.balance + amount).toFixed(2)),
      transactions: [transaction, ...state.transactions]
    });
  },

  // Withdraw
  withdraw: (amount) => {
    const state = get();
    if (amount > state.balance) {
      return false;
    }

    const transaction: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type: "withdraw",
      amount,
      timestamp: new Date(),
      status: "completed"
    };

    set({
      balance: parseFloat((state.balance - amount).toFixed(2)),
      transactions: [transaction, ...state.transactions]
    });

    return true;
  }
}));
