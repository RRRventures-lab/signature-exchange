
import { Database } from "@/types/database"

export type Order = Database['public']['Tables']['orders']['Row']
export type Asset = Database['public']['Tables']['assets']['Row']

// Mock Data Store
export const MOCK_ASSETS: Asset[] = [
    {
        id: "DRAKE-T26",
        symbol: "DRAKE-T26",
        name: "Drake: 2026 World Tour",
        description: "Revenue share from the upcoming 2026 World Tour",
        type: "tour",
        total_supply: 1000000,
        initial_price: 10.00,
        image_url: null,
        issuer_id: "artist-1",
        created_at: new Date().toISOString(),
        status: 'active'
    },
    {
        id: "BEY-WT",
        symbol: "BEY-WT",
        name: "Renaissance World Tour",
        description: "Global stadium tour revenue rights",
        type: "tour",
        total_supply: 2000000,
        initial_price: 15.00,
        image_url: null,
        issuer_id: "artist-2",
        created_at: new Date().toISOString(),
        status: 'active'
    },
    {
        id: "TS-MID",
        symbol: "TS-MID",
        name: "Midnights Album Production",
        description: "Royalty split from Midnights album streams",
        type: "album",
        total_supply: 5000000,
        initial_price: 5.00,
        image_url: null,
        issuer_id: "artist-3",
        created_at: new Date().toISOString(),
        status: 'active'
    }
]

export const getOrderBook = (symbol: string) => {
    // Generate deterministic mock data based on symbol
    const basePrice = symbol === 'DRAKE-T26' ? 12.54 :
        symbol === 'BEY-WT' ? 15.20 : 5.80

    const asks = Array.from({ length: 10 }, (_, i) => ({
        price: basePrice + (i * 0.05) + 0.02,
        amount: Math.floor(Math.random() * 1000) + 100,
        total: 0 // Calculated on fly or ignored for now
    })).map(o => ({ ...o, total: o.price * o.amount }))

    const bids = Array.from({ length: 10 }, (_, i) => ({
        price: basePrice - (i * 0.05) - 0.02,
        amount: Math.floor(Math.random() * 1000) + 100,
        total: 0
    })).map(o => ({ ...o, total: o.price * o.amount }))

    return { asks, bids, currentPrice: basePrice, spread: 0.04 }
}

export const getAsset = (symbol: string) => {
    return MOCK_ASSETS.find(a => a.symbol === symbol) || MOCK_ASSETS[0]
}
