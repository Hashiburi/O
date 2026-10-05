import { motion } from "framer-motion";
import { Play, History } from "lucide-react";
import { thumb, formatDate, type Video } from "../data/channel";

export default function Timeline({ videos, onPlay }: { videos: Video[]; onPlay: (id: string) => void }) {
  const sorted = [...videos].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  return (
    <section id="journey" className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#22d3ee]">
            <History className="h-3.5 w-3.5" /> Upload journey
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Every upload, <span className="text-[#22d3ee]">in order</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            From Epic Stickman battles to the latest Free Fire vs. Minecraft
            short — this timeline is built from the real publish dates in the
            YouTube feed.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-[#39d353] via-[#22d3ee] to-[#a855f7] sm:left-1/2" />
          <div className="space-y-6">
            {sorted.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.05 }}
                className={`relative flex gap-5 pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-10"
                    : "sm:ml-auto sm:flex-row-reverse sm:pl-10 sm:text-right"
                }`}
              >
                <span
                  className={`absolute top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-pixel text-[10px] ${
                    i === 0
                      ? "border-[#39d353] bg-[#39d353] text-[#07070d]"
                      : "border-white/20 bg-[#0d0d16] text-white/60"
                  } left-0 sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-5" : "sm:-left-5"
                  }`}
                >
                  {String(sorted.length - i).padStart(2, "0")}
                </span>

                <button
                  onClick={() => onPlay(v.id)}
                  className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d16] text-left transition hover:border-[#39d353]/40"
                >
                  <div className="relative">
                    <img
                      src={thumb(v.id)}
                      alt={v.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
                      {formatDate(v.published)}
                    </span>
                    <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100">
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </span>
                    {i === 0 && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#39d353] px-2.5 py-1 font-mono text-[10px] font-bold text-[#07070d]">
                        LATEST
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {v.category} • {v.channel === "main" ? "@OnlineWASD" : "@OnlineWASD_Blox"}
                    </div>
                    <div className="mt-1 line-clamp-2 font-bold leading-snug">{v.title}</div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
