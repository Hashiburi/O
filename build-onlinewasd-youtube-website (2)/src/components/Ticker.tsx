import { Sparkles } from "lucide-react";

const items = [
  "MINECRAFT",
  "STICKMAN VS MOBS",
  "PVP BATTLES",
  "TRAILER VISUALS",
  "RESOURCE PACKS & MODS",
  "FREE FIRE VS MINECRAFT",
  "SHORTS",
  "ROBLOX ON BLOX CHANNEL",
  "FAMILY FRIENDLY",
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[#39d353]/20 bg-[#0b0f0c] py-3">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span
              className={`font-pixel text-[11px] tracking-wider ${
                i % 3 === 0
                  ? "text-[#39d353]"
                  : i % 3 === 1
                    ? "text-white/80"
                    : "text-[#22d3ee]"
              }`}
            >
              {item}
            </span>
            <Sparkles className="h-3 w-3 text-[#facc15]" />
          </span>
        ))}
      </div>
    </div>
  );
}
