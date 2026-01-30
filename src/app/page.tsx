import {
  Sidebar,
  Header,
  StatCard,
  PerformanceChart,
  AssetList,
  PromoCard,
  WalletSidebar,
} from "@/components/dashboard";

export default function Home() {
  return (
    <div className="flex w-full h-screen font-sans text-gray-900 bg-[#FAFAFA]">
      <Sidebar />
      <MainContent />
      <div className="hidden xl:block">
        <WalletSidebar />
      </div>
    </div>
  );
}

function MainContent() {
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
                  value="$24,592.00"
                  trend="up"
                  trendValue="12.4%"
                  icon="solar:wallet-money-linear"
                />
                <StatCard
                  label="Average Yield"
                  value="9.4%"
                  trend="up"
                  trendValue="0.8%"
                  icon="solar:graph-up-linear"
                />
                <StatCard
                  label="Mo. Earnings"
                  value="$1,204.50"
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
