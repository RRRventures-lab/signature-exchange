export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            assets: {
                Row: {
                    id: string
                    symbol: string
                    name: string
                    description: string | null
                    type: 'tour' | 'catalog' | 'album' | 'single'
                    total_supply: number
                    initial_price: number
                    image_url: string | null
                    issuer_id: string | null
                    created_at: string
                    status: 'upcoming' | 'active' | 'ended'
                }
                Insert: {
                    id?: string
                    symbol: string
                    name: string
                    description?: string | null
                    type: 'tour' | 'catalog' | 'album' | 'single'
                    total_supply: number
                    initial_price: number
                    image_url?: string | null
                    issuer_id?: string | null
                    created_at?: string
                    status?: 'upcoming' | 'active' | 'ended'
                }
                Update: {
                    id?: string
                    symbol?: string
                    name?: string
                    description?: string | null
                    type?: 'tour' | 'catalog' | 'album' | 'single'
                    total_supply?: number
                    initial_price?: number
                    image_url?: string | null
                    issuer_id?: string | null
                    created_at?: string
                    status?: 'upcoming' | 'active' | 'ended'
                }
            }
            balances: {
                Row: {
                    id: string
                    user_id: string
                    asset_id: string | null // null for Cash
                    amount: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    asset_id?: string | null
                    amount?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    asset_id?: string | null
                    amount?: number
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    user_id: string
                    asset_id: string
                    side: 'buy' | 'sell'
                    price: number
                    amount: number
                    filled_amount: number
                    status: 'open' | 'filled' | 'cancelled'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    asset_id: string
                    side: 'buy' | 'sell'
                    price: number
                    amount: number
                    filled_amount?: number
                    status?: 'open' | 'filled' | 'cancelled'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    asset_id?: string
                    side?: 'buy' | 'sell'
                    price?: number
                    amount?: number
                    filled_amount?: number
                    status?: 'open' | 'filled' | 'cancelled'
                    created_at?: string
                }
            }
            trades: {
                Row: {
                    id: string
                    asset_id: string
                    buyer_id: string | null
                    seller_id: string | null
                    price: number
                    amount: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    asset_id: string
                    buyer_id?: string | null
                    seller_id?: string | null
                    price: number
                    amount: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    asset_id?: string
                    buyer_id?: string | null
                    seller_id?: string | null
                    price?: number
                    amount?: number
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    email: string | null
                    username: string | null
                    full_name: string | null
                    avatar_url: string | null
                    created_at: string
                    role: 'investor' | 'artist' | 'admin'
                }
                Insert: {
                    id: string
                    email?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    role?: 'investor' | 'artist' | 'admin'
                }
                Update: {
                    id?: string
                    email?: string | null
                    username?: string | null
                    full_name?: string | null
                    avatar_url?: string | null
                    created_at?: string
                    role?: 'investor' | 'artist' | 'admin'
                }
            }
        }
    }
}
