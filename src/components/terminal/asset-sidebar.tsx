import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const ASSETS = [
    { id: "DRAKE-T26", name: "Drake Catalog 2018-2022", type: "Catalog", price: 2.4500, change: 5.20 },
    { id: "BEY-WT", name: "Renaissance World Tour", type: "Tour", price: 3.8200, change: -1.80 },
    { id: "TS-MID", name: "Midnights Album Product", type: "Album", price: 1.9500, change: 12.40 },
    { id: "SZA-SOS", name: "SOS Deluxe Campaign", type: "Promo", price: 0.8500, change: 3.10 },
    { id: "BAD-ROY", name: "Bad Bunny Royalty Stream", type: "Royalty", price: 4.2000, change: 0.80 },
    { id: "KEN-DAM", name: "Kendrick Album Fund", type: "Album", price: 2.1500, change: 7.20 },
    { id: "WEEK-25", name: "The Weeknd Tour 2025", type: "Tour", price: 3.1000, change: -0.50 },
    { id: "DOJA-CAT", name: "Doja Cat Catalog", type: "Catalog", price: 1.1500, change: 1.20 },

]

interface AssetSidebarProps {
    selectedId: string
    onSelect: (id: string) => void
}

export function AssetSidebar({ selectedId, onSelect }: AssetSidebarProps) {
    return (
        <div className="w-[280px] border-r border-border bg-background flex flex-col">
            <div className="p-2 border-b border-border">
                <input
                    className="w-full bg-secondary/20 border border-border rounded px-2 py-1 text-[10px] focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
                    placeholder="SEARCH ASSETS..."
                />
            </div>

            <ScrollArea className="flex-1">
                <div className="flex flex-col">
                    {ASSETS.map((asset) => {
                        const isSelected = selectedId === asset.id
                        const isPositive = asset.change >= 0

                        return (
                            <button
                                key={asset.id}
                                onClick={() => onSelect(asset.id)}
                                className={cn(
                                    "flex items-center gap-3 p-3 border-b border-border/50 hover:bg-white/5 transition-colors text-left group relative",
                                    isSelected && "bg-white/5 border-l-2 border-l-primary"
                                )}
                            >
                                {/* Type Tag */}
                                <div className={cn(
                                    "h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold border border-white/10 bg-secondary/50",
                                    isSelected && "text-primary border-primary/20"
                                )}>
                                    {asset.name.substring(0, 2).toUpperCase()}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className={cn("font-bold truncate text-[11px]", isSelected ? "text-white" : "text-muted-foreground group-hover:text-white")}>
                                            {asset.name}
                                        </span>
                                        <span className="text-[9px] bg-secondary/50 px-1 rounded text-muted-foreground">{asset.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-mono text-[10px]">
                                        <span className="text-white">${asset.price.toFixed(4)}</span>
                                        <span className={isPositive ? "text-green-500" : "text-red-500"}>
                                            {isPositive ? '+' : ''}{asset.change.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>

                                {isSelected && <div className="absolute inset-0 bg-primary/5 pointer-events-none" />}
                            </button>
                        )
                    })}
                </div>
            </ScrollArea>

            <div className="p-2 border-t border-border flex justify-between text-[9px] text-muted-foreground">
                <span>MARKET_CAP: $59.7M</span>
                <span className="text-green-500">+5.2%</span>
            </div>
        </div>
    )
}
