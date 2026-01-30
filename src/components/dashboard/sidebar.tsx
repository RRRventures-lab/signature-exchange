"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Store,
  PieChart,
  Wallet,
  Settings,
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ href, icon, label, active }: NavItemProps) => (
  <Link
    href={href}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
      active
        ? "bg-white shadow-sm text-gray-900"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`}
  >
    <span className={`transition-colors ${active ? "text-[#0070F3]" : "group-hover:text-gray-900"}`}>
      {icon}
    </span>
    <span className="text-[13px] font-medium tracking-tight">{label}</span>
  </Link>
);

interface FavoriteItemProps {
  symbol: string;
  change: string;
  positive: boolean;
}

const FavoriteItem = ({ symbol, change, positive }: FavoriteItemProps) => (
  <Link
    href={`/markets/${symbol}`}
    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors group"
  >
    <span className="flex items-center gap-2">
      <div className={`w-1.5 h-1.5 rounded-full ${positive ? "bg-emerald-500" : "bg-rose-500"} group-hover:scale-110 transition-transform`} />
      {symbol}
    </span>
    <span className={`${positive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"} px-1.5 py-0.5 rounded text-[10px]`}>
      {positive ? "+" : ""}{change}%
    </span>
  </Link>
);

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-60 flex-shrink-0 h-full border-r border-gray-200 bg-[#FAFAFA] flex flex-col justify-between p-4 z-20">
      <div>
        <Link href="/" className="flex items-center gap-2 mb-8 px-2 mt-1">
          <div className="w-7 h-7 rounded bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-md">
            M
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900">
            MAX<span className="text-gray-400 font-light">.fi</span>
          </span>
        </Link>

        <div className="space-y-0.5 mb-8">
          <span className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
            Platform
          </span>
          <NavItem
            href="/"
            icon={<LayoutGrid size={18} />}
            label="Overview"
            active={isActive("/")}
          />
          <NavItem
            href="/markets"
            icon={<Store size={18} />}
            label="Marketplace"
            active={isActive("/markets")}
          />
          <NavItem
            href="/portfolio"
            icon={<PieChart size={18} />}
            label="Portfolio"
            active={isActive("/portfolio")}
          />
          <NavItem
            href="/transactions"
            icon={<Wallet size={18} />}
            label="Transactions"
            active={isActive("/transactions")}
          />
        </div>

        <div className="space-y-0.5">
          <span className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
            Favorites
          </span>
          <FavoriteItem symbol="NNT" change="2.4" positive={true} />
          <FavoriteItem symbol="GSF" change="0.8" positive={true} />
          <FavoriteItem symbol="FBF" change="5.2" positive={true} />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" active={isActive("/settings")} />
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-md border border-gray-200 bg-white">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 border border-gray-100 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
              alt="User"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-gray-900 truncate">
              Alex V.
            </span>
            <span className="text-[10px] text-gray-400 truncate">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
