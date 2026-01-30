import { ScrollArea } from "@/components/ui/scroll-area"
import { getOrderBook } from "@/lib/mock-data"

interface OrderBookProps {
    symbol?: string
}

export function OrderBook({ symbol = "DRAKE-T26" }: OrderBookProps) {
    const { asks, bids, currentPrice, spread } = getOrderBook(symbol)

    return (
        <div className="rounded-lg border border-border/40 bg-secondary/10 backdrop-blur-sm overflow-hidden">
            <div className="p-3 border-b border-border/40 bg-muted/20">
                <h3 className="font-semibold text-sm">Order Book</h3>
            </div>

            <div className="grid grid-cols-3 text-xs text-muted-foreground p-2 text-right px-4">
                <span>Price (USDC)</span>
                <span>Amount</span>
                <span>Total</span>
            </div>

            <div className="flex flex-col h-[400px]">
                {/* Asks (Sells) - Red */}
                <ScrollArea className="flex-1 border-b border-border/10">
                    <div className="flex flex-col-reverse justify-end min-h-full">
                        {asks.map((order, i) => (
                            <div key={i} className="grid grid-cols-3 text-right text-xs py-1 px-4 hover:bg-white/5 cursor-pointer relative">
                                <span className="text-red-400 font-mono">{order.price.toFixed(2)}</span>
                                <span className="font-mono">{order.amount.toLocaleString()}</span>
                                <span className="text-muted-foreground font-mono">{order.total.toLocaleString()}</span>
                                {/* Depth bar visual could go here */}
                                <div className="absolute top-0 right-0 h-full bg-red-500/10 pointer-events-none" style={{ width: `${Math.min((order.amount / 3000) * 100, 100)}%` }}></div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Spread / Current Price */}
                <div className="py-2 text-center border-y border-border/20 bg-background/50">
                    <span className="text-lg font-bold text-foreground">{currentPrice.toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground ml-2">Spread: {spread.toFixed(2)}</span>
                </div>

                {/* Bids (Buys) - Green */}
                <ScrollArea className="flex-1">
                    {bids.map((order, i) => (
                        <div key={i} className="grid grid-cols-3 text-right text-xs py-1 px-4 hover:bg-white/5 cursor-pointer relative">
                            <span className="text-green-400 font-mono">{order.price.toFixed(2)}</span>
                            <span className="font-mono">{order.amount.toLocaleString()}</span>
                            <span className="text-muted-foreground font-mono">{order.total.toLocaleString()}</span>
                            <div className="absolute top-0 right-0 h-full bg-green-500/10 pointer-events-none" style={{ width: `${Math.min((order.amount / 3000) * 100, 100)}%` }}></div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </div>
    )
}
