"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimitCount: number;
}

export const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const percentage = (apiLimitCount / MAX_FREE_COUNTS) * 100;

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40 font-mono">free tier</span>
        <span className="text-xs text-white/60 font-mono font-bold">{apiLimitCount}/{MAX_FREE_COUNTS}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <button
        onClick={proModal.onOpen}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white text-sm font-bold transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/20"
      >
        <Zap className="w-4 h-4 fill-white" />
        Upgrade Pro
      </button>
    </div>
  );
};