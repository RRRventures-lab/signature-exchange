"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { getOrderBook } from "@/lib/mock-data"

export function OrderBook({ symbol }: { symbol: string }) {
    const { asks, bids, currentPrice, spread } = getOrderBook(symbol)
    const spreadPct = (spread / currentPrice) * 100

    return (
        <div className="flex flex-col h-full bg-background font-mono text-[10px]">
            <div className="flex justify-between px-4 py-2 bg-secondary/10 border-b border-border text-muted-foreground">
                <span>Order Book</span>
                <span className="text-[9px]">Spread: <span className="text-primary">${spread.toFixed(4)} ({spreadPct.toFixed(2)}%)</span></span>
            </div>

            <div className="grid grid-cols-3 px-4 py-1 text-muted-foreground border-b border-border/50 bg-secondary/5">
                <span>Price</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Total</span>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                {/* Asks (Red) */}
                <div className="flex-1 overflow-hidden flex flex-col justify-end pb-1">
                    {asks.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 px-4 hover:bg-red-900/10 cursor-pointer">
                            <span className="text-red-500">{row.price.toFixed(4)}</span>
                            <span className="text-right text-muted-foreground">{row.amount.toLocaleString()}</span>
                            <span className="text-right text-muted-foreground">${row.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>

                {/* Spread Line */}
                <div className="py-1 my-1 border-y border-border/50 bg-secondary/10 text-center font-bold text-lg text-white">
                    {currentPrice.toFixed(4)}
                    <span className="text-xs ml-2 font-normal text-muted-foreground">USD</span>
                </div>

                {/* Bids (Blue/Green) */}
                <div className="flex-1 overflow-hidden pt-1">
                    {bids.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 px-4 hover:bg-blue-900/10 cursor-pointer">
                            <span className="text-primary">{row.price.toFixed(4)}</span>
                            <span className="text-right text-muted-foreground">{row.amount.toLocaleString()}</span>
                            <span className="text-right text-muted-foreground">${row.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
