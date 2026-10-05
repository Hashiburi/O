import { motion } from "framer-motion";
import { Swords, Sparkles, Zap, Clapperboard, Play } from "lucide-react";

const pillars = [
  {
    icon: Clapperboard,
    color: "text-[#facc15]",
    bg: "bg-[#facc15]/10",
    border: "hover:border-[#facc15]/40",
    title: "Epic Battles",
    desc: "Stickman vs. Minecraft Mobs — large-scale mob showdowns with cinematic edits.",
    videoId: "wV_-SUL0AfY",
    tag: "Stickman • Mobs",
  },
  {
    icon: Swords,
    color: "text-[#f43f5e]",
    bg: "bg-[#f43f5e]/10",
    border: "hover:border-[#f43f5e]/40",
    title: "PvP Showdowns",
    desc: "1v1 fights like OnlineWASD vs. @Spiderunique_Blox. Rate the PvP in the comments.",
    videoId: "j1ZvLUrxtK8",
    tag: "PvP • Challenge",
  },
  {
    icon: Sparkles,
    color: "text-[#22d3ee]",
    bg: "bg-[#22d3ee]/10",
    border: "hover:border-[#22d3ee]/40",
    title: "Trailer Visuals Guides",
    desc: "Turn vanilla Minecraft into trailer-quality graphics with packs, mods & shaders.",
    videoId: "WnMSW6bTxhA",
    tag: "Tutorial • Mods",
  },
  {
    icon: Zap,
    color: "text-[#39d353]",
    bg: "bg-[#39d353]/10",
    border: "hover:border-[#39d353]/40",
    title: "Shorts & Crossovers",
    desc: "Fast viral shorts — Free Fire vs. Minecraft and more experiments.",
    videoId: "quetNjgTvsY",
    tag: "Shorts • Viral",
  },
];

export default function Pillars({ onPlay }: { onPlay: (id: string) => void }) {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#facc15]/30 bg-[#facc15]/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#facc15]">
            <Sparkles className="h-3.5 w-3.5" /> What you'll watch
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Four ways to play with <span className="text-[#39d353]">WASD</span>
          </h2>
          <p className="mt-3 text-white/60">
            Every pillar links to a real upload. Hit play and it loads instantly
            in the theater above.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              className={`group rounded-2xl border border-white/10 bg-[#0d0d16] p-6 transition ${p.border}`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.bg}`}>
                <p.icon className={`h-6 w-6 ${p.color}`} />
              </div>
              <div className={`mt-4 font-mono text-[11px] uppercase tracking-[0.2em] ${p.color}`}>
                {p.tag}
              </div>
              <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
              <button
                onClick={() => onPlay(p.videoId)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-bold transition group-hover:border-white/20 hover:bg-white/10"
              >
                <Play className="h-4 w-4 fill-current" /> Play episode
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
