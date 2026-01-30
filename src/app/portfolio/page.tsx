import { NavBar } from "@/components/layout/nav-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Wallet } from "lucide-react"

export default function PortfolioPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main className="container mx-auto px-4 pt-24 pb-12">
                <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>

                {/* Account Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-secondary/10 border-border/40 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$124,592.00</div>
                            <p className="text-xs text-green-400 flex items-center mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +12.5% (All time)
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/10 border-border/40 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Available</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold flex items-center gap-2">
                                $24,502.50
                                <Wallet className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-secondary/10 border-border/40 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Invested Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$100,089.50</div>
                            <p className="text-xs text-muted-foreground mt-1">Across 4 Assets</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Holdings Table */}
                <div className="rounded-xl border border-border/40 overflow-hidden bg-secondary/5">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Asset</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Shares</TableHead>
                                <TableHead className="text-right">Avg. Price</TableHead>
                                <TableHead className="text-right">Current Price</TableHead>
                                <TableHead className="text-right">Market Value</TableHead>
                                <TableHead className="text-right">P/L</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="hover:bg-white/5">
                                <TableCell className="font-medium">Drake: 2026 World Tour <span className="text-muted-foreground text-xs ml-2">DRAKE-T26</span></TableCell>
                                <TableCell><Badge variant="outline">Tour</Badge></TableCell>
                                <TableCell className="text-right font-mono">5,000</TableCell>
                                <TableCell className="text-right font-mono">$10.00</TableCell>
                                <TableCell className="text-right font-mono">$12.54</TableCell>
                                <TableCell className="text-right font-mono font-medium">$62,700.00</TableCell>
                                <TableCell className="text-right font-mono text-green-400">+$12,700.00</TableCell>
                            </TableRow>
                            <TableRow className="hover:bg-white/5">
                                <TableCell className="font-medium">The Weeknd: Next Album <span className="text-muted-foreground text-xs ml-2">WEEK-A5</span></TableCell>
                                <TableCell><Badge variant="outline">Album</Badge></TableCell>
                                <TableCell className="text-right font-mono">2,000</TableCell>
                                <TableCell className="text-right font-mono">$5.00</TableCell>
                                <TableCell className="text-right font-mono">$5.40</TableCell>
                                <TableCell className="text-right font-mono font-medium">$10,800.00</TableCell>
                                <TableCell className="text-right font-mono text-green-400">+$800.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}
