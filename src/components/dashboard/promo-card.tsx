"use client";

import { ArrowRight } from "lucide-react";

function AbstractVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-black">
      <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-[80px] animate-blob mix-blend-screen" />
      <div className="absolute top-[20%] right-[0%] w-[100%] h-[100%] bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 opacity-30 blur-[60px] animate-blob animation-delay-2000 mix-blend-screen" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-[60px] opacity-20 animate-pulse-slow" />
    </div>
  );
}

export function PromoCard() {
  return (
    <div className="w-full lg:w-80 rounded-xl relative overflow-hidden flex flex-col justify-end p-6 shadow-xl group cursor-pointer border border-gray-800 bg-black min-h-[300px]">
      <AbstractVisual />
      <div className="relative z-10 pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-2 py-0.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded text-[10px] font-bold uppercase tracking-wider">
            New
          </span>
          <span className="text-[10px] text-gray-300 font-mono tracking-tight">
            v2.0.4
          </span>
        </div>
        <h2 className="text-2xl font-medium text-white tracking-tight leading-tight mb-2">
          Royalty <br />
          Algorithm
        </h2>
        <p className="text-xs text-gray-400 mb-4 font-light leading-relaxed">
          Automated distribution of streaming rights. Optimize your catalog
          yield.
        </p>
      </div>
      <button className="relative z-10 w-full py-2.5 bg-white text-black rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors pointer-events-auto flex items-center justify-center gap-2">
        View Offering <ArrowRight size={14} />
      </button>
    </div>
  );
}
