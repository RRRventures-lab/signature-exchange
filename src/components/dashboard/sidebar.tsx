"use client";

import { useState } from "react";
import {
  LayoutGrid,
  Store,
  PieChart,
  Wallet,
  Settings,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
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
  </button>
);

export function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="w-60 flex-shrink-0 h-full border-r border-gray-200 bg-[#FAFAFA] flex flex-col justify-between p-4 z-20">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2 mt-1">
          <div className="w-7 h-7 rounded bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-md">
            M
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900">
            MAX<span className="text-gray-400 font-light">.fi</span>
          </span>
        </div>

        <div className="space-y-0.5 mb-8">
          <span className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
            Platform
          </span>
          <NavItem
            icon={<LayoutGrid size={18} />}
            label="Overview"
            active={active === "dashboard"}
            onClick={() => setActive("dashboard")}
          />
          <NavItem
            icon={<Store size={18} />}
            label="Marketplace"
            active={active === "market"}
            onClick={() => setActive("market")}
          />
          <NavItem
            icon={<PieChart size={18} />}
            label="Portfolio"
            active={active === "portfolio"}
            onClick={() => setActive("portfolio")}
          />
          <NavItem
            icon={<Wallet size={18} />}
            label="Transactions"
            active={active === "wallet"}
            onClick={() => setActive("wallet")}
          />
        </div>

        <div className="space-y-0.5">
          <span className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
            Favorites
          </span>
          <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors group">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-110 transition-transform" />
              NNT
            </span>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
              +2.4%
            </span>
          </button>
          <button className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded-md transition-colors group">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-110 transition-transform" />
              GSF
            </span>
            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
              +0.8%
            </span>
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <NavItem icon={<Settings size={18} />} label="Settings" />
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
