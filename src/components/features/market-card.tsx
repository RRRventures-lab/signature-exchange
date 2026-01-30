import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

interface MarketCardProps {
    symbol: string
    name: string
    type: 'tour' | 'catalog' | 'album'
    price: number
    change24h: number
    imageUrl?: string
}

export function MarketCard({ symbol, name, type, price, change24h, imageUrl }: MarketCardProps) {
    const isPositive = change24h >= 0

    return (
        <Card className="group overflow-hidden border-border/40 bg-secondary/20 hover:bg-secondary/40 transition-all hover:border-primary/20 backdrop-blur-sm cursor-pointer">
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                        <span className="text-4xl font-bold text-white/10">{symbol}</span>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-none uppercase text-[10px] tracking-wider">
                        {type}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">{name}</h3>
                        <p className="text-xs text-muted-foreground font-mono mt-1">{symbol}</p>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Price</p>
                        <p className="text-xl font-bold">${price.toFixed(2)}</p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {Math.abs(change24h)}%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
