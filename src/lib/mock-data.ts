// Comprehensive Mock Data for MAX Music Asset Exchange

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: "tour" | "publishing" | "master" | "bundle" | "royalty" | "label";
  price: number;
  change24h: number;
  apy: number;
  marketCap: number;
  volume24h: number;
  totalSupply: number;
  availableSupply: number;
  description: string;
  imageUrl?: string;
}

export interface PortfolioHolding {
  symbol: string;
  shares: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdraw" | "dividend";
  symbol?: string;
  amount: number;
  price?: number;
  shares?: number;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

// All available assets
export const ASSETS: Asset[] = [
  {
    id: "NNT",
    symbol: "NNT",
    name: "Neon Nights Tour",
    type: "tour",
    price: 54.20,
    change24h: 2.4,
    apy: 12.4,
    marketCap: 54200000,
    volume24h: 1250000,
    totalSupply: 1000000,
    availableSupply: 750000,
    description: "Revenue share from the upcoming 2026 World Tour featuring top EDM artists"
  },
  {
    id: "LGC",
    symbol: "LGC",
    name: "Legacy Catalog '99",
    type: "publishing",
    price: 124.50,
    change24h: -0.5,
    apy: 8.1,
    marketCap: 124500000,
    volume24h: 890000,
    totalSupply: 1000000,
    availableSupply: 400000,
    description: "Publishing rights to classic 1999 catalog including 50+ hit songs"
  },
  {
    id: "FBF",
    symbol: "FBF",
    name: "Future Bass Fund",
    type: "master",
    price: 12.05,
    change24h: 5.2,
    apy: 15.5,
    marketCap: 12050000,
    volume24h: 2100000,
    totalSupply: 1000000,
    availableSupply: 850000,
    description: "Master recording rights pool for emerging future bass artists"
  },
  {
    id: "GSF",
    symbol: "GSF",
    name: "Global Streaming IV",
    type: "bundle",
    price: 100.00,
    change24h: 0.8,
    apy: 9.2,
    marketCap: 100000000,
    volume24h: 3500000,
    totalSupply: 1000000,
    availableSupply: 600000,
    description: "Diversified streaming royalty bundle across 500+ tracks"
  },
  {
    id: "IPR",
    symbol: "IPR",
    name: "Indie Pop Royalties",
    type: "royalty",
    price: 32.10,
    change24h: 1.2,
    apy: 11.0,
    marketCap: 32100000,
    volume24h: 780000,
    totalSupply: 1000000,
    availableSupply: 700000,
    description: "Streaming royalties from top indie pop playlists"
  },
  {
    id: "LBC",
    symbol: "LBC",
    name: "LoFi Beats Collection",
    type: "master",
    price: 8.45,
    change24h: -1.1,
    apy: 7.4,
    marketCap: 8450000,
    volume24h: 450000,
    totalSupply: 1000000,
    availableSupply: 900000,
    description: "Curated lofi hip-hop master recordings for streaming"
  },
  {
    id: "KSW",
    symbol: "KSW",
    name: "K-Pop Synth Wave",
    type: "label",
    price: 45.30,
    change24h: 3.8,
    apy: 14.2,
    marketCap: 45300000,
    volume24h: 1800000,
    totalSupply: 1000000,
    availableSupply: 500000,
    description: "Label equity in emerging K-Pop synth wave imprint"
  },
  {
    id: "RNB",
    symbol: "RNB",
    name: "R&B Classics Vault",
    type: "publishing",
    price: 89.75,
    change24h: 0.3,
    apy: 10.5,
    marketCap: 89750000,
    volume24h: 1100000,
    totalSupply: 1000000,
    availableSupply: 350000,
    description: "Timeless R&B publishing catalog from the 90s and 2000s"
  }
];

// Generate price history for charts
function generatePriceHistory(basePrice: number, points: number, volatility: number): PricePoint[] {
  const now = Date.now();
  const interval = (24 * 60 * 60 * 1000) / points; // Spread over 24h for 1D
  const history: PricePoint[] = [];
  let price = basePrice * 0.95; // Start lower

  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.45) * volatility * price;
    price = Math.max(price * 0.8, Math.min(price * 1.2, price + change));
    history.push({
      timestamp: now - (points - i) * interval,
      price: parseFloat(price.toFixed(2))
    });
  }

  // Ensure last point matches current price
  history[history.length - 1].price = basePrice;
  return history;
}

// Price history by asset and timeframe
export const PRICE_HISTORY: Record<string, Record<string, PricePoint[]>> = {};

ASSETS.forEach(asset => {
  PRICE_HISTORY[asset.symbol] = {
    "1H": generatePriceHistory(asset.price, 12, 0.002),
    "1D": generatePriceHistory(asset.price, 24, 0.005),
    "1W": generatePriceHistory(asset.price, 7, 0.02),
    "1M": generatePriceHistory(asset.price, 30, 0.05),
    "1Y": generatePriceHistory(asset.price, 12, 0.15),
    "ALL": generatePriceHistory(asset.price, 24, 0.25)
  };
});

// Portfolio chart (aggregate)
export const PORTFOLIO_HISTORY: Record<string, PricePoint[]> = {
  "1D": generatePriceHistory(24592, 24, 0.003),
  "1W": generatePriceHistory(24592, 7, 0.01),
  "1M": generatePriceHistory(24592, 30, 0.03),
  "1Y": generatePriceHistory(24592, 12, 0.12),
  "ALL": generatePriceHistory(24592, 24, 0.20)
};

// Order book generator
export function getOrderBook(symbol: string) {
  const asset = ASSETS.find(a => a.symbol === symbol);
  const basePrice = asset?.price || 50;
  const spread = basePrice * 0.002; // 0.2% spread

  const asks = Array.from({ length: 10 }, (_, i) => {
    const price = basePrice + spread + (i * basePrice * 0.001);
    const amount = Math.floor(Math.random() * 5000) + 500;
    return {
      price: parseFloat(price.toFixed(2)),
      amount,
      total: parseFloat((price * amount).toFixed(2))
    };
  });

  const bids = Array.from({ length: 10 }, (_, i) => {
    const price = basePrice - spread - (i * basePrice * 0.001);
    const amount = Math.floor(Math.random() * 5000) + 500;
    return {
      price: parseFloat(price.toFixed(2)),
      amount,
      total: parseFloat((price * amount).toFixed(2))
    };
  });

  return {
    asks,
    bids,
    currentPrice: basePrice,
    spread: parseFloat((spread * 2).toFixed(4))
  };
}

// Get single asset
export function getAsset(symbol: string): Asset | undefined {
  return ASSETS.find(a => a.symbol === symbol);
}

// Initial transactions for demo
export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "buy",
    symbol: "NNT",
    amount: 2605,
    price: 52.10,
    shares: 50,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: "completed"
  },
  {
    id: "tx-2",
    type: "sell",
    symbol: "LGC",
    amount: 1250,
    price: 125.00,
    shares: 10,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "tx-3",
    type: "dividend",
    symbol: "GSF",
    amount: 45.20,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "tx-4",
    type: "deposit",
    amount: 5000,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "tx-5",
    type: "buy",
    symbol: "GSF",
    amount: 9850,
    price: 98.50,
    shares: 100,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "completed"
  }
];

// Initial portfolio holdings
export const INITIAL_PORTFOLIO: PortfolioHolding[] = [
  { symbol: "NNT", shares: 50, avgPrice: 52.10 },
  { symbol: "GSF", shares: 100, avgPrice: 98.50 },
  { symbol: "FBF", shares: 200, avgPrice: 11.50 }
];

// Initial balance
export const INITIAL_BALANCE = 8240.50;

// Calculate portfolio value
export function calculatePortfolioValue(holdings: PortfolioHolding[]): number {
  return holdings.reduce((total, holding) => {
    const asset = getAsset(holding.symbol);
    return total + (asset ? asset.price * holding.shares : 0);
  }, 0);
}

// Calculate portfolio P&L
export function calculatePortfolioPnL(holdings: PortfolioHolding[]): { value: number; percent: number } {
  let currentValue = 0;
  let costBasis = 0;

  holdings.forEach(holding => {
    const asset = getAsset(holding.symbol);
    if (asset) {
      currentValue += asset.price * holding.shares;
      costBasis += holding.avgPrice * holding.shares;
    }
  });

  const pnlValue = currentValue - costBasis;
  const pnlPercent = costBasis > 0 ? (pnlValue / costBasis) * 100 : 0;

  return {
    value: parseFloat(pnlValue.toFixed(2)),
    percent: parseFloat(pnlPercent.toFixed(2))
  };
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
