"use client";

import {
  Sidebar,
  Header,
  StatCard,
  PerformanceChart,
  AssetList,
  PromoCard,
  WalletSidebar,
} from "@/components/dashboard";
import { Toast } from "@/components/ui/toast";
import { useAppStore } from "@/lib/store";

export default function Home() {
  return (
    <div className="flex w-full h-screen font-sans text-gray-900 bg-[#FAFAFA]">
      <Sidebar />
      <MainContent />
      <div className="hidden xl:block">
        <WalletSidebar />
      </div>
      <Toast />
    </div>
  );
}

function MainContent() {
  const getTotalNetWorth = useAppStore((state) => state.getTotalNetWorth);
  const getPortfolioPnL = useAppStore((state) => state.getPortfolioPnL);
  const portfolio = useAppStore((state) => state.portfolio);

  const netWorth = getTotalNetWorth();
  const pnl = getPortfolioPnL();

  // Calculate average yield from holdings
  const avgYield = portfolio.length > 0 ? 9.4 : 0; // Mock for now

  // Calculate monthly earnings (mock)
  const monthlyEarnings = netWorth * 0.049; // ~4.9% monthly equivalent

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#FAFAFA]">
      <Header />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scroll p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Stats & Hero */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  label="Total Net Worth"
                  value={`$${netWorth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  trend={pnl.percent >= 0 ? "up" : "down"}
                  trendValue={`${Math.abs(pnl.percent).toFixed(1)}%`}
                  icon="solar:wallet-money-linear"
                />
                <StatCard
                  label="Average Yield"
                  value={`${avgYield.toFixed(1)}%`}
                  trend="up"
                  trendValue="0.8%"
                  icon="solar:graph-up-linear"
                />
                <StatCard
                  label="Mo. Earnings"
                  value={`$${monthlyEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  trend="up"
                  trendValue="4.2%"
                  icon="solar:dollar-minimalistic-linear"
                />
              </div>

              <PerformanceChart />
            </div>

            {/* Visual Promo Card */}
            <PromoCard />
          </div>

          {/* Asset List */}
          <AssetList />
        </div>
      </div>
    </main>
  );
}
