import { useEffect, useState } from "react";
import { Menu, X, Play } from "lucide-react";
import { YoutubeIcon } from "./icons";
import { CHANNEL } from "../data/channel";

const links = [
  { label: "Watch", href: "#watch" },
  { label: "Videos", href: "#videos" },
  { label: "About", href: "#about" },
  { label: "Blox", href: "#blox" },
  { label: "Journey", href: "#journey" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#07070d]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3">
          <div className="flex items-center gap-1">
            {["W", "A", "S", "D"].map((k, i) => (
              <span
                key={k}
                className={`keycap flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-bold ${
                  i === 0
                    ? "text-[#39d353]"
                    : i === 1
                      ? "text-[#22d3ee]"
                      : i === 2
                        ? "text-[#facc15]"
                        : "text-[#a855f7]"
                }`}
              >
                {k}
              </span>
            ))}
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-800 font-bold tracking-tight text-white">
              Online<span className="text-[#39d353]">WASD</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Minecraft Channel
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="#watch"
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#39d353]/50 hover:bg-[#39d353]/10"
          >
            <Play className="h-4 w-4 text-[#39d353]" /> Watch now
          </a>
          <a
            href={CHANNEL.subscribeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#ff0033] px-4 py-2 text-sm font-bold text-white shadow-[0_0_24px_rgba(255,0,51,0.4)] transition hover:brightness-110"
          >
            <YoutubeIcon className="h-4 w-4" /> Subscribe
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-b border-white/10 bg-[#0d0d16]/95 px-4 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <a
                href="#watch"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold"
              >
                <Play className="h-4 w-4 text-[#39d353]" /> Watch
              </a>
              <a
                href={CHANNEL.subscribeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#ff0033] px-4 py-3 text-sm font-bold"
              >
                <YoutubeIcon className="h-4 w-4" /> Subscribe
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
