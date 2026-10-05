import { AnimatePresence, motion } from "framer-motion";
import { Play, X, Bell } from "lucide-react";
import { thumb, timeAgo, type Video } from "../data/channel";

export default function NewUploadToast({
  videos,
  onPlay,
  onDismiss,
}: {
  videos: Video[];
  onPlay: (id: string) => void;
  onDismiss: () => void;
}) {
  const v = videos[0];
  return (
    <AnimatePresence>
      {v && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          className="fixed bottom-4 left-4 right-4 z-[70] sm:left-auto sm:right-6 sm:w-[380px]"
        >
          <div className="animate-pulse-glow overflow-hidden rounded-2xl border border-[#39d353]/50 bg-[#0d0d16]/95 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#39d353]">
                <Bell className="h-3.5 w-3.5" />
                New upload{videos.length > 1 ? `s (${videos.length})` : ""}
              </div>
              <button
                onClick={onDismiss}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                onPlay(v.id);
                onDismiss();
              }}
              className="group flex w-full gap-3 p-3 text-left"
            >
              <div className="relative w-32 shrink-0 overflow-hidden rounded-lg">
                <img src={thumb(v.id)} alt={v.title} className="aspect-video w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#39d353] text-[#07070d] transition group-hover:scale-110">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="line-clamp-2 text-sm font-bold leading-snug">{v.title}</div>
                <div className="mt-1 font-mono text-[11px] text-white/50">
                  {v.channel === "main" ? "@OnlineWASD" : "@OnlineWASD_Blox"} • {timeAgo(v.published)}
                </div>
                <div className="mt-1.5 text-[11px] font-semibold text-[#39d353]">Tap to watch now →</div>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
