"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";

export function Header() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 flex-shrink-0 bg-white/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-semibold text-gray-900">Dashboard</h1>
        <span className="h-4 w-px bg-gray-200" />
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("personal")}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
              activeTab === "personal"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
              activeTab === "team"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            Team
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative group">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-md text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gray-300 w-48 transition-all hover:bg-white hover:shadow-sm"
          />
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm transition-all relative">
          <Bell size={16} />
          <span className="absolute top-2 right-2.5 w-1 h-1 bg-rose-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
