import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { CHANNEL } from "../data/channel";

const faqs = [
  {
    q: "What is OnlineWASD about?",
    a: "OnlineWASD is a Minecraft gaming channel. Per its official YouTube description: “On this channel you will watch Minecraft and other Minecraft based games.” Expect Stickman vs. Mobs battles, PvP fights, trailer-visual tutorials with resource packs & mods, and viral shorts like Free Fire vs. Minecraft.",
  },
  {
    q: "Can I watch videos directly on this website?",
    a: "Yes! The theater at the top of this page embeds the real YouTube player. Click any thumbnail and the video loads instantly — no redirect needed. You can also hit Prev/Next, search, filter by channel, copy links, or jump to YouTube.",
  },
  {
    q: "Where does the video list come from? Is it real?",
    a: "100% real and live. The site fetches the official public YouTube RSS feeds in your browser: UCk5NnpL6inDmktModcooQjw (main) and UCjqz6RN1UtCbweuQTBM5uUg (Blox). It re-checks every 60 seconds and whenever you return to the tab, so a brand-new upload shows up here automatically — with a “New upload” alert you can tap to play.",
  },
  {
    q: "How fast does a new video appear on this site?",
    a: "As soon as YouTube publishes it to the channel feed (usually within a few minutes of going public). The page polls on a 60-second timer, when the tab regains focus, and when your connection comes back online. You can also tap the refresh icon in the Live badge to check instantly. If the feed can't be reached, the last known list is shown and retried automatically.",
  },
  {
    q: "What is OnlineWASD_Blox?",
    a: "It's the sister Roblox channel run by the same creator: “Hi, I am OnlineWASD, a Minecraft content creator. This is my Roblox channel, OnlineWASD_Blox. You can Watch and Enjoy my Roblox Content. Don't forget to Subscribe!” Its uploads are also playable in the theater here.",
  },
  {
    q: "How do I subscribe or support the channel?",
    a: "Hit any Subscribe button on this page — they deep-link to youtube.com/@OnlineWASD?sub_confirmation=1 (and the Blox equivalent). On YouTube you can also like, comment (e.g. rate the PvP and editing as requested in the PvP video), and share shorts to help the channel grow.",
  },
  {
    q: "How do I find the channel on YouTube?",
    a: "Search “OnlineWASD” on YouTube, or go directly to youtube.com/@OnlineWASD. The channel ID is UCk5NnpL6inDmktModcooQjw. Tags include OnlineWASD, Minecraft, Stickman, minecraft mobs vs stickman, minecraft pvp and minecraft cpvp.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/5 bg-[#0a0a12] py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
            <MessageCircleQuestion className="h-3.5 w-3.5" /> FAQ
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border transition ${
                  isOpen ? "border-[#39d353]/40 bg-[#39d353]/[0.04]" : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-bold">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "rotate-45 border-[#39d353]/50 bg-[#39d353]/15 text-[#39d353]"
                        : "border-white/15 text-white/60"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/60">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] text-white/35">
          Channel: {CHANNEL.handle} • {CHANNEL.id} • Data verified via YouTube page metadata + RSS
        </p>
      </div>
    </section>
  );
}
