"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Badge } from "@/components/ui/badge"

const data = [
    { name: '09:00', price: 3.82 },
    { name: '10:00', price: 3.85 },
    { name: '11:00', price: 3.84 },
    { name: '12:00', price: 3.88 },
    { name: '13:00', price: 3.92 },
    { name: '14:00', price: 3.89 },
    { name: '15:00', price: 3.82 },
    { name: '16:00', price: 3.80 },
    { name: '17:00', price: 3.85 },
    { name: '18:00', price: 3.88 },
    { name: '19:00', price: 3.95 },
    { name: '20:00', price: 4.02 },
    { name: '21:00', price: 3.85 },
    { name: '22:00', price: 3.82 },
]

export function MainChart({ symbol }: { symbol: string }) {
    const currentPrice = 3.8200
    const isLoss = true // Mocking the red chart from image

    return (
        <div className="flex flex-col h-full bg-background/50">
            <div className="p-4 border-b border-border flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded bg-secondary/50 flex items-center justify-center text-xs font-bold text-muted-foreground">B</div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Renaissance World Tour</h2>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-mono text-white">${currentPrice.toFixed(4)}</span>
                        <span className="text-sm font-mono text-red-500">-1.80%</span>
                    </div>
                </div>

                <div className="flex gap-1">
                    {['1H', '24H', '7D', '30D'].map(tf => (
                        <button key={tf} className={`px-3 py-1 text-[10px] rounded hover:bg-secondary transition-colors ${tf === '24H' ? 'bg-secondary text-white' : 'text-muted-foreground'}`}>
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-0 pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="name" hide />
                        <YAxis domain={['auto', 'auto']} hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#3b82f6' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
