"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const HISTORY = [
    { time: '01:52 AM', asset: 'Drake Catalog 2018-2022', side: 'BUY', price: 2.4520, qty: 500, total: '1.2K' },
    { time: '01:51 AM', asset: 'Renaissance World Tour', side: 'SELL', price: 3.8150, qty: 250, total: '$953.75' },
    { time: '01:50 AM', asset: 'Bad Bunny Royalty Stream', side: 'BUY', price: 4.1950, qty: 1000, total: '$4.2K' },
    { time: '01:49 AM', asset: 'Midnights Album Production', side: 'BUY', price: 1.9480, qty: 750, total: '$1.5K' },
    { time: '01:47 AM', asset: 'Drake Catalog 2018-2022', side: 'SELL', price: 2.4480, qty: 300, total: '$734.40' },
]

export function BottomTabs() {
    return (
        <div className="h-full flex flex-col font-mono text-xs">
            <Tabs defaultValue="history" className="h-full flex flex-col">
                <div className="border-b border-border bg-background px-4">
                    <TabsList className="h-9 bg-transparent p-0 gap-6">
                        <TabsTrigger value="history" className="h-full rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground px-0">TRADE HISTORY</TabsTrigger>
                        <TabsTrigger value="orders" className="h-full rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground px-0">MY ORDERS</TabsTrigger>
                        <TabsTrigger value="portfolio" className="h-full rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-muted-foreground px-0">PORTFOLIO</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="history" className="flex-1 overflow-auto p-0 m-0">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-secondary/10 text-muted-foreground sticky top-0">
                            <tr>
                                <th className="p-3 font-medium text-[10px] uppercase">Time</th>
                                <th className="p-3 font-medium text-[10px] uppercase">Asset</th>
                                <th className="p-3 font-medium text-[10px] uppercase">Side</th>
                                <th className="p-3 font-medium text-[10px] uppercase text-right">Price</th>
                                <th className="p-3 font-medium text-[10px] uppercase text-right">Quantity</th>
                                <th className="p-3 font-medium text-[10px] uppercase text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HISTORY.map((row, i) => (
                                <tr key={i} className="border-b border-border/30 hover:bg-white/5 transition-colors">
                                    <td className="p-3 text-muted-foreground">{row.time}</td>
                                    <td className="p-3 font-bold text-white">{row.asset}</td>
                                    <td className={`p-3 font-bold ${row.side === 'BUY' ? 'text-primary' : 'text-red-500'}`}>{row.side}</td>
                                    <td className="p-3 text-right">${row.price.toFixed(4)}</td>
                                    <td className="p-3 text-right">{row.qty}</td>
                                    <td className="p-3 text-right">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TabsContent>
            </Tabs>
        </div>
    )
}
