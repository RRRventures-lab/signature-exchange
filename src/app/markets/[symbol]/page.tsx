import { NavBar } from "@/components/layout/nav-bar"
import { OrderBook } from "@/components/features/order-book"
import { TradingInterface } from "@/components/features/trading-interface"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Share2, Globe, Music2 } from "lucide-react"
import Link from "next/link"

export default function AssetDetailsPage({ params }: { params: { symbol: string } }) {
    // In a real app, fetch asset details by params.symbol
    const symbol = params.symbol
    const name = "Drake: 2026 World Tour"
    const price = 12.54

    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Markets
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
                    {/* Left Column: Asset Info & Chart */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Header */}
                        <div className="bg-secondary/10 border border-border/40 rounded-xl p-6 backdrop-blur-sm">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-lg bg-indigo-900/50 flex items-center justify-center border border-white/10">
                                        <Music2 className="h-8 w-8 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold flex items-center gap-2">
                                            {name}
                                            <Badge className="bg-primary/20 text-primary border-none">TOUR</Badge>
                                        </h1>
                                        <p className="text-muted-foreground font-mono mt-1">{symbol}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                        <Globe className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                        <Share2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <Separator className="my-6 bg-border/40" />

                            <div className="flex gap-12">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                                    <p className="text-3xl font-bold">${price.toFixed(2)}</p>
                                    <p className="text-sm text-green-400 font-medium">+4.20% (24h)</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                                    <p className="text-xl font-medium">$12.5M</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Implied Revenue</p>
                                    <p className="text-xl font-medium">$85M+</p>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 bg-secondary/10 border border-border/40 rounded-xl p-6 backdrop-blur-sm flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-muted-foreground">Price Chart</h3>
                                <div className="flex gap-2">
                                    {['1H', '1D', '1W', '1M', '1Y'].map(tf => (
                                        <button key={tf} className="text-xs font-medium px-2 py-1 rounded hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                                            {tf}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-gradient-to-t from-primary/5 to-transparent rounded border border-white/5 relative flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Interactive TradingView Chart Placeholder</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Book & Trades */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <TradingInterface />
                        <OrderBook symbol={symbol} />
                    </div>
                </div>
            </main>
        </div>
    )
}
