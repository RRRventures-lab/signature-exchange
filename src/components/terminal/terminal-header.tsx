import { Button } from "@/components/ui/button"
import { Bell, Settings, Wifi } from "lucide-react"

export function TerminalHeader() {
    return (
        <header className="h-10 border-b border-border bg-background flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-bold tracking-widest text-primary">SIGNAL_OS</span>
                </div>
                <div className="h-4 w-[1px] bg-border" />
                <div className="flex gap-4 text-[10px] text-muted-foreground uppercase tracking-wider">
                    <span className="hover:text-foreground cursor-pointer transition-colors">Agents</span>
                    <span className="hover:text-foreground cursor-pointer transition-colors">Market_Data</span>
                    <span className="hover:text-foreground cursor-pointer transition-colors">A&R_Radar</span>
                    <span className="text-foreground font-bold border-b border-primary">IP_Exchange</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Wifi className="h-3 w-3 text-green-500" />
                    <span>SYSTEM: ONLINE</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-none hover:bg-white/10">
                    <Bell className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-full border-primary/50 text-primary hover:bg-primary/10">
                    CONNECT_WALLET
                </Button>
            </div>
        </header>
    )
}
