"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export function TradingPanel({ symbol }: { symbol: string }) {
    const [mode, setMode] = useState<'buy' | 'sell'>('buy')

    return (
        <div className="flex flex-col h-full bg-background font-mono text-xs">
            <div className="grid grid-cols-2 border-b border-border">
                <button
                    onClick={() => setMode('buy')}
                    className={`py-3 text-center font-bold tracking-wider transition-colors ${mode === 'buy' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-white'}`}
                >
                    BUY
                </button>
                <button
                    onClick={() => setMode('sell')}
                    className={`py-3 text-center font-bold tracking-wider transition-colors ${mode === 'sell' ? 'text-red-500 border-b-2 border-red-500 bg-red-500/5' : 'text-muted-foreground hover:text-white'}`}
                >
                    SELL
                </button>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {/* Order Type */}
                <div>
                    <label className="text-[9px] text-muted-foreground uppercase mb-2 block">Order Type</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-secondary/50 border border-border rounded py-1.5 text-white hover:bg-secondary">Limit</button>
                        <button className="bg-transparent border border-transparent rounded py-1.5 text-muted-foreground hover:bg-secondary/30">Market</button>
                    </div>
                </div>

                {/* Price Input */}
                <div>
                    <label className="text-[9px] text-muted-foreground uppercase mb-1.5 block">Price Per Share</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-muted-foreground">$</span>
                        <input
                            type="number"
                            defaultValue={3.8200}
                            className="w-full bg-secondary/10 border border-border rounded py-2 pl-6 pr-3 text-white focus:outline-none focus:border-primary/50 font-mono"
                        />
                    </div>
                </div>

                {/* Qty Input */}
                <div>
                    <label className="text-[9px] text-muted-foreground uppercase mb-1.5 block">Quantity (Shares)</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-secondary/10 border border-border rounded py-2 px-3 text-white focus:outline-none focus:border-primary/50 font-mono"
                    />
                </div>

                {/* Percentages */}
                <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 75, 100].map(pct => (
                        <button key={pct} className="text-[9px] text-primary hover:text-white py-1 rounded bg-primary/5 hover:bg-primary/20">
                            {pct === 100 ? 'Max' : `${pct}%`}
                        </button>
                    ))}
                </div>

                {/* Summary */}
                <div className="pt-4 border-t border-border space-y-1">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Total</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Fee (0.1%)</span>
                        <span>$0.00</span>
                    </div>
                </div>

                <Button className={`w-full font-bold mt-2 ${mode === 'buy' ? 'bg-primary hover:bg-primary/90' : 'bg-red-500 hover:bg-red-600'}`}>
                    {mode === 'buy' ? 'PLACE BUY ORDER' : 'PLACE SELL ORDER'}
                </Button>
            </div>

            {/* Asset Details Footer */}
            <div className="mt-auto p-4 bg-secondary/5 border-t border-border">
                <h4 className="text-[9px] uppercase text-muted-foreground mb-2">Asset Details</h4>
                <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Yield</span>
                        <span className="text-green-500">12.0%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Available</span>
                        <span className="text-white">1.25M</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
