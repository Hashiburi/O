import { motion } from "framer-motion";
import {
  BadgeCheck,
  Fingerprint,
  Rss,
  ShieldCheck,
  Gamepad2,
  Hash,
  AtSign,
  Link2,
  Cuboid,
} from "lucide-react";
import { CHANNEL } from "../data/channel";

export default function About() {
  const details = [
    {
      icon: AtSign,
      label: "Handle",
      value: CHANNEL.handle,
      sub: "youtube.com/@OnlineWASD",
    },
    {
      icon: Fingerprint,
      label: "Channel ID",
      value: CHANNEL.id,
      sub: "Verified from YouTube page metadata",
      mono: true,
    },
    {
      icon: Gamepad2,
      label: "Main niche",
      value: "Minecraft + Minecraft-based games",
      sub: "Battles • PvP • Tutorials • Shorts",
    },
    {
      icon: ShieldCheck,
      label: "Rating",
      value: "Family friendly",
      sub: "isFamilyFriendly: true on YouTube",
    },
    {
      icon: Rss,
      label: "Live feed",
      value: "Auto-syncs every 60s",
      sub: "YouTube RSS • new uploads appear instantly",
    },
    {
      icon: Link2,
      label: "Second channel",
      value: "@OnlineWASD_Blox",
      sub: "Roblox content • UCjqz6RN1UtCbwe…",
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-20 border-t border-white/5 bg-[#0a0a12] py-20">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#c084fc]">
              <Cuboid className="h-3.5 w-3.5" /> Channel details
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Researched straight from <span className="text-[#a855f7]">YouTube</span>
            </h2>
            <p className="mt-4 leading-relaxed text-white/60">
              We looked up <span className="font-semibold text-white">@OnlineWASD</span> on
              YouTube and pulled the real channel metadata — description, IDs,
              avatars and the public RSS upload feed. Everything below is the
              actual channel info, not placeholder text.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start gap-4">
                <img
                  src={CHANNEL.avatar}
                  alt="OnlineWASD"
                  className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold">
                    {CHANNEL.name} <BadgeCheck className="h-4 w-4 text-[#22d3ee]" />
                  </div>
                  <div className="mt-1 text-sm italic text-white/60">
                    “{CHANNEL.description}”
                  </div>
                  <div className="mt-2 text-sm text-white/50">
                    Check out the Roblox channel{" "}
                    <a
                      href={CHANNEL.secondChannel.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[#39d353] hover:underline"
                    >
                      youtube.com/@OnlineWASD_Blox
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                <Hash className="h-3.5 w-3.5" /> Topics this channel covers
              </div>
              <div className="flex flex-wrap gap-2">
                {CHANNEL.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-[#39d353]/40 hover:text-white"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {details.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-[#0d0d16] p-5 transition hover:border-[#39d353]/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#39d353]/10">
                  <d.icon className="h-5 w-5 text-[#39d353]" />
                </div>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  {d.label}
                </div>
                <div
                  className={`mt-1 font-bold text-white ${d.mono ? "break-all font-mono text-[13px]" : "text-[15px]"}`}
                >
                  {d.value}
                </div>
                <div className="mt-1 text-xs text-white/45">{d.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
