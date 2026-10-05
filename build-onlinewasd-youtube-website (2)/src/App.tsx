import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import WatchSection from "./components/WatchSection";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Blox from "./components/Blox";
import Timeline from "./components/Timeline";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import NewUploadToast from "./components/NewUploadToast";
import { useChannelFeed } from "./hooks/useChannelFeed";

const STORAGE_KEY = "onlinewasd-watched";

function loadWatched(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export default function App() {
  const feed = useChannelFeed();
  const { videos } = feed;
  const [currentId, setCurrentId] = useState(videos[0].id);
  const userPicked = useRef(false);
  const [watched, setWatched] = useState<Set<string>>(() => loadWatched());
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // If the visitor hasn't picked a video yet, always follow the newest upload.
  useEffect(() => {
    if (!userPicked.current && videos[0] && videos[0].id !== currentId) {
      setCurrentId(videos[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  // Keep the current selection valid if the list changes.
  useEffect(() => {
    if (!videos.some((v) => v.id === currentId) && videos[0]) setCurrentId(videos[0].id);
  }, [videos, currentId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...watched]));
    } catch {
      /* noop */
    }
  }, [watched]);

  const toggleWatched = useCallback((id: string) => {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const select = useCallback((id: string) => {
    userPicked.current = true;
    setCurrentId(id);
  }, []);

  const handlePlay = useCallback(
    (id: string) => {
      select(id);
      requestAnimationFrame(() => {
        document.getElementById("watch")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [select]
  );

  return (
    <div className="min-h-screen bg-[#07070d] text-white antialiased">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#39d353] via-[#22d3ee] to-[#a855f7]"
      />
      <Navbar />
      <main>
        <Hero
          videos={videos}
          onPlay={handlePlay}
          status={feed.status}
          lastSynced={feed.lastSynced}
          onRefresh={feed.refresh}
          pollMs={feed.pollMs}
        />
        <Ticker />
        <WatchSection
          videos={videos}
          currentId={currentId}
          onSelect={select}
          watched={watched}
          toggleWatched={toggleWatched}
          status={feed.status}
          lastSynced={feed.lastSynced}
          onRefresh={feed.refresh}
          pollMs={feed.pollMs}
          error={feed.error}
        />
        <About />
        <Pillars onPlay={handlePlay} />
        <Blox videos={videos} onPlay={handlePlay} />
        <Timeline videos={videos} onPlay={handlePlay} />
        <Faq />
      </main>
      <Footer videos={videos} onPlay={handlePlay} />
      <NewUploadToast videos={feed.newVideos} onPlay={handlePlay} onDismiss={feed.dismissNew} />
    </div>
  );
}
