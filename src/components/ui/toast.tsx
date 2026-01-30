"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Toast() {
  const toastMessage = useAppStore((state) => state.toastMessage);
  const clearToast = useAppStore((state) => state.clearToast);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  const isError = toastMessage.toLowerCase().includes("insufficient") ||
                  toastMessage.toLowerCase().includes("error") ||
                  toastMessage.toLowerCase().includes("failed");

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${
        isError
          ? "bg-rose-50 border-rose-200 text-rose-800"
          : "bg-emerald-50 border-emerald-200 text-emerald-800"
      }`}
    >
      {isError ? (
        <XCircle size={18} className="text-rose-500" />
      ) : (
        <CheckCircle size={18} className="text-emerald-500" />
      )}
      <span className="text-sm font-medium">{toastMessage}</span>
      <button
        onClick={clearToast}
        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
