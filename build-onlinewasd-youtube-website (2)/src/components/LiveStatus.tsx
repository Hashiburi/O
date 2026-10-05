import { useEffect, useState } from "react";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import type { FeedStatus } from "../hooks/useChannelFeed";

function ago(ts: number | null, now: number) {
  if (!ts) return "never";
  const s = Math.max(0, Math.floor((now - ts) / 1000));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export default function LiveStatus({
  status,
  lastSynced,
  onRefresh,
  pollMs,
  compact = false,
}: {
  status: FeedStatus;
  lastSynced: number | null;
  onRefresh: () => void;
  pollMs: number;
  compact?: boolean;
}) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const loading = status === "loading";
  const offline = status === "offline";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] ${
        offline
          ? "border-[#f43f5e]/40 bg-[#f43f5e]/10 text-[#fda4af]"
          : "border-[#39d353]/30 bg-[#39d353]/10 text-[#39d353]"
      }`}
      title={`Auto-checks YouTube every ${Math.round(pollMs / 1000)}s and whenever you return to the tab`}
    >
      {offline ? (
        <WifiOff className="h-3.5 w-3.5" />
      ) : (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      <span className="font-bold uppercase tracking-wider">
        {offline ? "Feed offline" : loading ? "Syncing" : "Live"}
      </span>
      {!compact && (
        <span className="text-current/70">
          • synced {ago(lastSynced, now)}
        </span>
      )}
      <button
        onClick={onRefresh}
        disabled={loading}
        className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:opacity-60"
        aria-label="Refresh feed now"
      >
        <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
      </button>
      {!compact && !offline && <Wifi className="h-3.5 w-3.5 opacity-60" />}
    </div>
  );
}
