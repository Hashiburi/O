import { ArrowUp, Rss, Fingerprint, Gamepad2 } from "lucide-react";
import { YoutubeIcon } from "./icons";
import { CHANNEL, type Video } from "../data/channel";

export default function Footer({ videos: VIDEOS, onPlay }: { videos: Video[]; onPlay: (id: string) => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#050509]">
      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="pixel-corners relative overflow-hidden border border-[#39d353]/25 bg-gradient-to-br from-[#0c1a0e] via-[#0d0d16] to-[#0d0d16] p-8 text-center sm:p-12">
          <div className="bg-grid absolute inset-0 opacity-50" />
          <div className="absolute left-1/2 top-0 h-40 w-[500px] -translate-x-1/2 rounded-full bg-[#39d353]/15 blur-[80px]" />
          <div className="relative">
            <div className="font-pixel text-[10px] tracking-[0.3em] text-[#39d353] sm:text-xs">
              READY PLAYER ONE?
            </div>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Join the OnlineWASD squad today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Subscribe on YouTube for Stickman battles, PvP, trailer-visual
              guides and shorts — plus Roblox on the Blox channel.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={CHANNEL.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#ff0033] px-8 py-4 font-bold text-white shadow-[0_0_32px_rgba(255,0,51,0.4)] transition hover:brightness-110"
              >
                <YoutubeIcon className="h-5 w-5" /> Subscribe — @OnlineWASD
              </a>
              <a
                href={CHANNEL.secondChannel.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#a855f7]/40 bg-[#a855f7]/10 px-8 py-4 font-bold text-white transition hover:bg-[#a855f7]/20"
              >
                <YoutubeIcon className="h-5 w-5 text-[#c084fc]" /> Subscribe — Blox
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-white/40">
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Gamepad2 className="h-3.5 w-3.5 text-[#39d353]" /> Minecraft-first content
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Rss className="h-3.5 w-3.5 text-[#facc15]" /> Live RSS feed
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                <Fingerprint className="h-3.5 w-3.5 text-[#22d3ee]" /> {CHANNEL.id.slice(0, 12)}…
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-white/5">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {["W", "A", "S", "D"].map((k) => (
                  <span
                    key={k}
                    className="keycap flex h-7 w-7 items-center justify-center rounded-md font-mono text-[11px] font-bold text-[#39d353]"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <span className="font-bold">
                Online<span className="text-[#39d353]">WASD</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Fan-made hub for the YouTube channel{" "}
              <span className="text-white/80">{CHANNEL.handle}</span>. Videos
              play via the official YouTube embed. Not affiliated with Mojang
              or YouTube.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={CHANNEL.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#ff0033]/50 hover:text-white"
                aria-label="YouTube main channel"
              >
                <YoutubeIcon className="h-5 w-5" />
              </a>
              <a
                href={CHANNEL.feedUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-[#facc15]/50 hover:text-white"
                aria-label="RSS feed"
              >
                <Rss className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              Watch
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {VIDEOS.slice(0, 5).map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onPlay(v.id)}
                    className="line-clamp-1 text-left text-white/60 transition hover:text-[#39d353]"
                  >
                    {v.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              Channels
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={CHANNEL.url} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white">
                  @OnlineWASD — Minecraft
                </a>
              </li>
              <li>
                <a href={CHANNEL.secondChannel.url} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white">
                  @OnlineWASD_Blox — Roblox
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/60 hover:text-white">
                  Channel details
                </a>
              </li>
              <li>
                <a href="#journey" className="text-white/60 hover:text-white">
                  Upload timeline
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/60 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 font-mono text-[11px] text-white/35 sm:flex-row sm:px-6">
            <span>
              © {new Date().getFullYear()} OnlineWASD hub • Built from live YouTube data
            </span>
            <span className="hidden sm:inline">
              UCk5NnpL6inDmktModcooQjw • UCjqz6RN1UtCbweuQTBM5uUg
            </span>
            <a
              href="#top"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/60 transition hover:text-white"
            >
              Back to top <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
