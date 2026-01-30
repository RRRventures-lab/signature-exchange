import {
  Wallet,
  TrendingUp,
  DollarSign,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "solar:wallet-money-linear": Wallet,
  "solar:graph-up-linear": TrendingUp,
  "solar:dollar-minimalistic-linear": DollarSign,
};

interface StatCardProps {
  label: string;
  value: string;
  trend: "up" | "down";
  trendValue: string;
  icon: string;
}

export function StatCard({ label, value, trend, trendValue, icon }: StatCardProps) {
  const IconComponent = iconMap[icon] || Wallet;

  return (
    <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-gray-400">
          <IconComponent size={18} />
        </div>
      </div>
      <div className="flex items-end gap-2 mb-1">
        <div className="text-2xl font-semibold text-gray-900 tracking-tight">
          {value}
        </div>
      </div>
      <div
        className={`text-xs font-medium flex items-center gap-1 ${
          trend === "up" ? "text-emerald-600" : "text-rose-500"
        }`}
      >
        <span
          className={`flex items-center px-1.5 py-0.5 rounded ${
            trend === "up" ? "bg-emerald-50" : "bg-rose-50"
          }`}
        >
          {trend === "up" ? "+" : ""}
          {trendValue}
        </span>
        <span className="text-gray-400 font-normal">vs last month</span>
      </div>
    </div>
  );
}
