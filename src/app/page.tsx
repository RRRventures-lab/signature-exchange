"use client"

import { useState } from "react"
import { TerminalHeader } from "@/components/terminal/terminal-header"
import { AssetSidebar } from "@/components/terminal/asset-sidebar"
import { MainChart } from "@/components/terminal/main-chart"
import { OrderBook } from "@/components/terminal/order-book"
import { TradingPanel } from "@/components/terminal/trading-panel"
import { BottomTabs } from "@/components/terminal/bottom-tabs"

// Layout Grid:
// [ Header (Full Width) ]
// [ Sidebar (Fixed L) ] [ Main Chart (Flex) ] [ Order Book / Trade (Fixed R) ]
// [ Bottom Panel (Full Width - below chart/book) ]

export default function SignalTerminal() {
  const [selectedAsset, setSelectedAsset] = useState("DRAKE-T26")

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden font-mono text-xs">
      <TerminalHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Asset List */}
        <AssetSidebar selectedId={selectedAsset} onSelect={setSelectedAsset} />

        {/* Center - Chart & Info */}
        <div className="flex flex-1 flex-col min-w-0 border-r border-border">
          <div className="flex-1 relative">
            <MainChart symbol={selectedAsset} />
          </div>
          <div className="h-1/3 border-t border-border bg-secondary/10">
            <BottomTabs />
          </div>
        </div>

        {/* Right - Order Book & Execution */}
        <div className="w-[320px] flex flex-col border-l border-border bg-card/20 backdrop-blur-sm z-10">
          <div className="flex-1 border-b border-border min-h-0">
            <TradingPanel symbol={selectedAsset} />
          </div>
          <div className="h-1/2 min-h-0">
            <OrderBook symbol={selectedAsset} />
          </div>
        </div>
      </div>
    </div>
  )
}
