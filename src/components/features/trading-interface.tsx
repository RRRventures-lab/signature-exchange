"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function TradingInterface() {
    const [amount, setAmount] = useState("")

    return (
        <div className="rounded-lg border border-border/40 bg-secondary/10 backdrop-blur-sm overflow-hidden h-fit">
            <Tabs defaultValue="buy" className="w-full">
                <TabsList className="w-full grid grid-cols-2 rounded-none bg-muted/20 p-0 h-12">
                    <TabsTrigger value="buy" className="rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:text-green-400 data-[state=active]:border-b-2 data-[state=active]:border-green-400 font-semibold">Buy</TabsTrigger>
                    <TabsTrigger value="sell" className="rounded-none h-full data-[state=active]:bg-transparent data-[state=active]:text-red-400 data-[state=active]:border-b-2 data-[state=active]:border-red-400 font-semibold">Sell</TabsTrigger>
                </TabsList>

                <div className="p-4 space-y-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Available Balance</span>
                        <span>$24,502.50</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground font-medium">Price (USDC)</label>
                        <div className="relative">
                            <Input type="number" defaultValue={12.55} className="bg-background/20 pr-12 text-right font-mono" />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">USDC</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground font-medium">Amount</label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="bg-background/20 pr-12 text-right font-mono"
                            />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">SHARES</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-mono font-medium">${(parseFloat(amount || "0") * 12.55).toFixed(2)}</span>
                        </div>

                        <TabsContent value="buy">
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">Buy Shares</Button>
                        </TabsContent>
                        <TabsContent value="sell">
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">Sell Shares</Button>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}
