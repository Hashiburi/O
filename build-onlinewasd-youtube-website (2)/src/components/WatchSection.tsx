import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Search,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Calendar,
  Tag,
  MonitorPlay,
  ListVideo,
  Eye,
  EyeOff,
} from "lucide-react";
import { YoutubeIcon } from "./icons";
import LiveStatus from "./LiveStatus";
import type { FeedStatus } from "../hooks/useChannelFeed";
import {
  CHANNEL,
  thumb,
  embedUrl,
  watchUrl,
  formatDate,
  timeAgo,
  type Video,
} from "../data/channel";

type Filter = "all" | "main" | "blox";

export default function WatchSection({
  videos: VIDEOS,
  currentId,
  onSelect,
  watched,
  toggleWatched,
  status,
  lastSynced,
  onRefresh,
  pollMs,
  error,
}: {
  videos: Video[];
  currentId: string;
  onSelect: (id: string) => void;
  watched: Set<string>;
  toggleWatched: (id: string) => void;
  status: FeedStatus;
  lastSynced: number | null;
  onRefresh: () => void;
  pollMs: number;
  error: string | null;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoplay, setAutoplay] = useState(false);

  const current: Video = useMemo(
    () => VIDEOS.find((v) => v.id === currentId) ?? VIDEOS[0],
    [currentId, VIDEOS]
  );

  const watchedCount = VIDEOS.filter((v) => watched.has(v.id)).length;

  const filtered = useMemo(() => {
    return VIDEOS.filter((v) => {
      const matchFilter = filter === "all" || v.channel === filter;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q));
      return matchFilter && matchQuery;
    });
  }, [filter, query, VIDEOS]);

  const currentIndex = VIDEOS.findIndex((v) => v.id === current.id);
  const prev = VIDEOS[(currentIndex - 1 + VIDEOS.length) % VIDEOS.length];
  const next = VIDEOS[(currentIndex + 1) % VIDEOS.length];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(watchUrl(current.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  const channelInfo =
    current.channel === "main" ? CHANNEL : CHANNEL.secondChannel;

  return (
    <section id="watch" className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#22d3ee]">
                <MonitorPlay className="h-3.5 w-3.5" /> Theater mode
              </div>
              <LiveStatus status={status} lastSynced={lastSynced} onRefresh={onRefresh} pollMs={pollMs} />
            </div>
            {status === "offline" && (
              <div className="mt-3 rounded-lg border border-[#f43f5e]/30 bg-[#f43f5e]/10 px-3 py-2 font-mono text-[11px] text-[#fda4af]">
                Couldn't reach YouTube's feed right now ({error ?? "network"}). Showing the last known
                videos — will retry automatically.
              </div>
            )}
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Watch directly <span className="text-[#39d353]">on this site</span>
            </h2>
            <p className="mt-3 max-w-2xl text-white/60">
              Every recent upload from{" "}
              <span className="text-white font-semibold">@OnlineWASD</span> and{" "}
              <span className="text-white font-semibold">@OnlineWASD_Blox</span>{" "}
              — pulled live from the official YouTube feeds and re-checked
              every {Math.round(pollMs / 1000)} seconds, so new uploads show up here
              automatically. Click any video to play it instantly.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
            {(
              [
                { k: "all", label: `All (${VIDEOS.length})` },
                { k: "main", label: `Minecraft (${VIDEOS.filter((v) => v.channel === "main").length})` },
                { k: "blox", label: `Blox (${VIDEOS.filter((v) => v.channel === "blox").length})` },
              ] as { k: Filter; label: string }[]
            ).map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className={`rounded-lg px-3 py-2 text-xs font-bold transition sm:text-sm ${
                  filter === f.k
                    ? "bg-[#39d353] text-[#07070d]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Player */}
          <div>
            <div className="video-frame relative overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="aspect-video w-full">
                <AnimatePresence mode="wait">
                  <motion.iframe
                    key={current.id + String(autoplay)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={embedUrl(current.id, autoplay)}
                    title={current.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#39d353]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#39d353]">
                  {current.category}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-white/60">
                  {current.channel === "main" ? "@OnlineWASD" : "@OnlineWASD_Blox"}
                </span>
                {watched.has(current.id) && (
                  <span className="flex items-center gap-1 rounded-full bg-[#22d3ee]/15 px-3 py-1 text-[11px] font-bold text-[#22d3ee]">
                    <Check className="h-3 w-3" /> Watched
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">
                {current.title}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatDate(current.published)} •{" "}
                  {timeAgo(current.published)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4" /> {current.tags.slice(0, 3).join(", ")}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                {current.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {current.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/55"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={channelInfo.avatar}
                    alt={channelInfo.name}
                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold">
                      {channelInfo.name} <BadgeCheck className="h-3.5 w-3.5 text-[#22d3ee]" />
                    </div>
                    <div className="font-mono text-[11px] text-white/45">
                      {"handle" in channelInfo ? channelInfo.handle : ""}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end">
                  <button
                    onClick={() => onSelect(prev.id)}
                    className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold transition hover:bg-white/10"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev
                  </button>
                  <button
                    onClick={() => onSelect(next.id)}
                    className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold transition hover:bg-white/10"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => toggleWatched(current.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                      watched.has(current.id)
                        ? "bg-[#22d3ee]/15 text-[#22d3ee]"
                        : "border border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {watched.has(current.id) ? (
                      <>
                        <EyeOff className="h-4 w-4" /> Unwatch
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" /> Watched
                      </>
                    )}
                  </button>
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold transition hover:bg-white/10"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-[#39d353]" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy link"}
                  </button>
                  <a
                    href={watchUrl(current.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-[#ff0033] px-4 py-2 text-xs font-bold text-white transition hover:brightness-110"
                  >
                    <YoutubeIcon className="h-4 w-4" /> YouTube <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-white/50">
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  className={`relative h-5 w-9 rounded-full transition ${autoplay ? "bg-[#39d353]" : "bg-white/15"}`}
                  aria-label="Toggle autoplay"
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${autoplay ? "left-[18px]" : "left-0.5"}`}
                  />
                </button>
                Autoplay video when switching
              </label>
            </div>
          </div>

          {/* Playlist */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d16]">
            <div className="border-b border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <ListVideo className="h-5 w-5 text-[#39d353]" />
                  Up next
                  <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white/70">
                    {filtered.length}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/40">
                  {watchedCount}/{VIDEOS.length} watched
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#39d353] to-[#22d3ee] transition-all"
                  style={{ width: `${(watchedCount / Math.max(1, VIDEOS.length)) * 100}%` }}
                />
              </div>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search videos, tags..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-white/30 focus:border-[#39d353]/50 focus:bg-white/[0.06]"
                />
              </div>
            </div>

            <div id="videos" className="max-h-[720px] flex-1 space-y-2 overflow-y-auto p-3">
              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-white/40">
                  No videos match “{query}”. Try another keyword.
                </div>
              )}
              {filtered.map((v, idx) => {
                const active = v.id === current.id;
                const isWatched = watched.has(v.id);
                return (
                  <button
                    key={v.id}
                    onClick={() => onSelect(v.id)}
                    className={`group flex w-full gap-3 rounded-xl border p-2.5 text-left transition ${
                      active
                        ? "border-[#39d353]/50 bg-[#39d353]/10"
                        : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="relative w-36 shrink-0 overflow-hidden rounded-lg sm:w-40">
                      <img
                        src={thumb(v.id)}
                        alt={v.title}
                        loading="lazy"
                        className="aspect-video w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#39d353] text-[#07070d]">
                          <Play className="ml-0.5 h-4 w-4 fill-current" />
                        </span>
                      </div>
                      <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                        {v.duration}
                      </span>
                      {active && (
                        <span className="absolute left-1 top-1 flex items-center gap-1 rounded bg-[#39d353] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#07070d]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#07070d]" /> PLAYING
                        </span>
                      )}
                      {isWatched && !active && (
                        <span className="absolute left-1 top-1 rounded bg-[#22d3ee] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#07070d]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                        {String(idx + 1).padStart(2, "0")} • {v.category} • {v.channel === "main" ? "MC" : "BLOX"}
                      </div>
                      <div className={`mt-1 line-clamp-2 text-sm font-semibold leading-snug ${active ? "text-white" : "text-white/85"}`}>
                        {v.title}
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] text-white/40">
                        {timeAgo(v.published)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/10 bg-white/[0.02] p-3 text-center font-mono text-[11px] text-white/35">
              Live source: YouTube RSS • auto-refresh every {Math.round(pollMs / 1000)}s + on tab focus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
