import { motion } from "framer-motion";
import { BadgeCheck, Play, Boxes } from "lucide-react";
import { YoutubeIcon } from "./icons";
import { CHANNEL, thumb, timeAgo, type Video } from "../data/channel";

export default function Blox({ videos, onPlay }: { videos: Video[]; onPlay: (id: string) => void }) {
  const bloxVideos = videos.filter((v) => v.channel === "blox").slice(0, 4);
  const blox = CHANNEL.secondChannel;

  return (
    <section id="blox" className="relative scroll-mt-20 overflow-hidden border-y border-white/5 bg-gradient-to-b from-[#120a1e] via-[#0d0d16] to-[#07070d] py-20">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#a855f7]/15 blur-[100px]" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#c084fc]">
              <Boxes className="h-3.5 w-3.5" /> Sister channel
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              OnlineWASD<span className="text-[#a855f7]">_Blox</span>
            </h2>
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#a855f7]/20 bg-[#a855f7]/[0.06] p-4">
              <img
                src={blox.avatar}
                alt={blox.name}
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold">
                  {blox.name} <BadgeCheck className="h-4 w-4 text-[#22d3ee]" />
                </div>
                <div className="font-mono text-xs text-white/50">{blox.handle}</div>
                <div className="font-mono text-[11px] text-white/35">{blox.id}</div>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-white/60">
              “{blox.description}”
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={blox.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#a855f7] px-6 py-3.5 font-bold text-white shadow-[0_0_32px_rgba(168,85,247,0.4)] transition hover:brightness-110"
              >
                <YoutubeIcon className="h-5 w-5" /> Subscribe to Blox
              </a>
              <a
                href={blox.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold transition hover:bg-white/10"
              >
                Visit channel
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              Latest from Blox • playable on this site
            </div>
            {bloxVideos.map((v, i) => (
              <motion.button
                key={v.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onPlay(v.id)}
                className="group flex w-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-[#a855f7]/40 hover:bg-[#a855f7]/[0.06]"
              >
                <div className="relative w-44 shrink-0 overflow-hidden rounded-xl sm:w-52">
                  <img src={thumb(v.id)} alt={v.title} className="aspect-video w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a855f7] text-white">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </div>
                </div>
                <div className="min-w-0 py-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#c084fc]">
                    {v.category} • {timeAgo(v.published)}
                  </div>
                  <div className="mt-1 line-clamp-2 font-bold leading-snug">{v.title}</div>
                  <div className="mt-1.5 line-clamp-2 text-xs text-white/50">{v.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
