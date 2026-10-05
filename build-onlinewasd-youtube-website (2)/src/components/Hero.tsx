import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  BadgeCheck,
  Copy,
  Check,
  ChevronRight,
  Radio,
  ShieldCheck,
  Layers,
  Clapperboard,
  ExternalLink,
} from "lucide-react";
import { YoutubeIcon } from "./icons";
import LiveStatus from "./LiveStatus";
import type { FeedStatus } from "../hooks/useChannelFeed";
import { CHANNEL, thumb, timeAgo, type Video } from "../data/channel";

const KEYS = [
  { key: "W", label: "Forward", color: "text-[#39d353]", border: "hover:border-[#39d353]/60" },
  { key: "A", label: "Left", color: "text-[#22d3ee]", border: "hover:border-[#22d3ee]/60" },
  { key: "S", label: "Back", color: "text-[#facc15]", border: "hover:border-[#facc15]/60" },
  { key: "D", label: "Right", color: "text-[#a855f7]", border: "hover:border-[#a855f7]/60" },
];

export default function Hero({
  videos,
  onPlay,
  status,
  lastSynced,
  onRefresh,
  pollMs,
}: {
  videos: Video[];
  onPlay: (id: string) => void;
  status: FeedStatus;
  lastSynced: number | null;
  onRefresh: () => void;
  pollMs: number;
}) {
  const [pressed, setPressed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const latest = videos[0];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (["W", "A", "S", "D"].includes(k)) setPressed(k);
    };
    const up = () => setPressed(null);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(CHANNEL.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="/images/minecraft-hero.jpg"
          alt="Minecraft landscape"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070d]/70 via-[#07070d]/85 to-[#07070d]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-32 left-1/2 h-96 w-[720px] -translate-x-1/2 rounded-full bg-[#39d353]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#a855f7]/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Minecraft Gaming Channel
              </span>
              <LiveStatus
                status={status}
                lastSynced={lastSynced}
                onRefresh={onRefresh}
                pollMs={pollMs}
                compact
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
            >
              ONLINE
              <br />
              <span className="bg-gradient-to-r from-[#39d353] via-[#4ade80] to-[#22d3ee] bg-clip-text text-transparent text-glow-green">
                WASD
              </span>{" "}
              <span className="align-middle font-pixel text-lg text-white/30 sm:text-xl">
                ▮
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-white/70"
            >
              {CHANNEL.longDescription}
            </motion.p>

            {/* Channel chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 pr-4 backdrop-blur"
            >
              <img
                src={CHANNEL.avatar}
                alt="OnlineWASD avatar"
                className="h-14 w-14 rounded-xl border border-white/10 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-bold text-white">{CHANNEL.name}</span>
                  <BadgeCheck className="h-4 w-4 shrink-0 text-[#22d3ee]" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-white/50">
                  <span>{CHANNEL.handle}</span>
                  <span className="text-white/20">•</span>
                  <span className="hidden sm:inline">{CHANNEL.id}</span>
                  <button
                    onClick={copyHandle}
                    className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 transition hover:bg-white/10 hover:text-white"
                  >
                    {copied ? <Check className="h-3 w-3 text-[#39d353]" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <a
                href={CHANNEL.url}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white sm:flex"
              >
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <button
                onClick={() => onPlay(latest.id)}
                className="group flex items-center justify-center gap-2 rounded-xl bg-[#39d353] px-7 py-4 font-bold text-[#07070d] shadow-[0_0_32px_rgba(57,211,83,0.4)] transition hover:brightness-110"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch latest video
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <a
                href={CHANNEL.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:border-[#ff0033]/60 hover:bg-[#ff0033]/10"
              >
                <YoutubeIcon className="h-5 w-5 text-[#ff4d5e]" />
                Subscribe on YouTube
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: Clapperboard, label: "Videos found", value: `${videos.length} uploads` },
                { icon: Radio, label: "Latest upload", value: timeAgo(latest.published) },
                { icon: ShieldCheck, label: "Rating", value: "Family friendly" },
                { icon: Layers, label: "Channels", value: "Minecraft + Blox" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <s.icon className="h-4 w-4 text-[#39d353]" />
                  <div className="mt-2 text-sm font-bold text-white">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/40">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* WASD interactive */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pixel-corners border border-white/10 bg-[#0d0d16]/90 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                  Press to move
                </div>
                <div className="font-mono text-[11px] text-[#39d353]">
                  <span className="animate-blink">●</span> ONLINE
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                {KEYS.map((k) => (
                  <button
                    key={k.key}
                    onMouseDown={() => setPressed(k.key)}
                    onMouseUp={() => setPressed(null)}
                    onMouseLeave={() => pressed === k.key && setPressed(null)}
                    className={`keycap flex h-16 w-16 flex-col items-center justify-center rounded-xl sm:h-[72px] sm:w-[72px] ${k.border} ${
                      pressed === k.key
                        ? "pressed border-[#39d353] bg-[#39d353]/20"
                        : ""
                    }`}
                  >
                    <span className={`font-pixel text-lg ${pressed === k.key ? "text-white" : k.color}`}>
                      {k.key}
                    </span>
                    <span className="mt-1 text-[9px] uppercase tracking-wider text-white/40">
                      {k.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-4 text-center font-mono text-xs text-white/35">
                Tip: press <span className="text-white/70">W A S D</span> on your keyboard — just like in-game
              </div>
            </motion.div>

            {/* Featured video card */}
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              onClick={() => onPlay(latest.id)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <img
                src={thumb(latest.id)}
                alt={latest.title}
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="rounded-full bg-[#ff0033] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Latest
                </span>
                <span className="rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur">
                  {timeAgo(latest.published)}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#39d353] text-[#07070d] shadow-[0_0_40px_rgba(57,211,83,0.6)] transition group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-bold text-white">{latest.title}</div>
                <div className="mt-1 font-mono text-xs text-white/60">
                  Auto-updates from YouTube • click to watch instantly here
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
