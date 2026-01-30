"use client";

import { getOrderBook } from "@/lib/mock-data";

interface OrderBookProps {
  symbol: string;
  onPriceSelect?: (price: number) => void;
}

export function OrderBook({ symbol, onPriceSelect }: OrderBookProps) {
  const { asks, bids, currentPrice, spread } = getOrderBook(symbol);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="p-3 border-b border-gray-100">
        <h3 className="font-semibold text-sm text-gray-900">Order Book</h3>
      </div>

      {/* Header */}
      <div className="grid grid-cols-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider p-2 px-4 border-b border-gray-50">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex flex-col max-h-[400px]">
        {/* Asks (Sells) - Red */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col-reverse">
            {asks.map((order, i) => (
              <div
                key={`ask-${i}`}
                onClick={() => onPriceSelect?.(order.price)}
                className="grid grid-cols-3 text-xs py-1.5 px-4 hover:bg-rose-50 cursor-pointer relative transition-colors"
              >
                <span className="text-rose-500 font-mono font-medium">
                  {order.price.toFixed(2)}
                </span>
                <span className="font-mono text-right text-gray-600">
                  {order.amount.toLocaleString()}
                </span>
                <span className="text-gray-400 font-mono text-right">
                  ${(order.total / 1000).toFixed(1)}k
                </span>
                <div
                  className="absolute top-0 right-0 h-full bg-rose-100/50 pointer-events-none -z-10"
                  style={{ width: `${Math.min((order.amount / 5000) * 100, 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spread / Current Price */}
        <div className="py-3 text-center border-y border-gray-100 bg-gray-50/50">
          <span className="text-lg font-bold text-gray-900">
            ${currentPrice.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 ml-2">
            Spread: ${spread.toFixed(4)}
          </span>
        </div>

        {/* Bids (Buys) - Green */}
        <div className="flex-1 overflow-y-auto">
          {bids.map((order, i) => (
            <div
              key={`bid-${i}`}
              onClick={() => onPriceSelect?.(order.price)}
              className="grid grid-cols-3 text-xs py-1.5 px-4 hover:bg-emerald-50 cursor-pointer relative transition-colors"
            >
              <span className="text-emerald-500 font-mono font-medium">
                {order.price.toFixed(2)}
              </span>
              <span className="font-mono text-right text-gray-600">
                {order.amount.toLocaleString()}
              </span>
              <span className="text-gray-400 font-mono text-right">
                ${(order.total / 1000).toFixed(1)}k
              </span>
              <div
                className="absolute top-0 right-0 h-full bg-emerald-100/50 pointer-events-none -z-10"
                style={{ width: `${Math.min((order.amount / 5000) * 100, 100)}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
