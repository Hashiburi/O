import { useCallback, useEffect, useRef, useState } from "react";
import { CHANNEL, VIDEOS, type Video } from "../data/channel";

export type FeedStatus = "idle" | "loading" | "live" | "offline";

const CACHE_KEY = "onlinewasd-feed-cache-v1";
const POLL_MS = 60_000; // check for new uploads every 60 seconds
const TIMEOUT_MS = 9_000;

const FEEDS: { channel: Video["channel"]; id: string }[] = [
  { channel: "main", id: CHANNEL.id },
  { channel: "blox", id: CHANNEL.secondChannel.id },
];

const feedUrl = (channelId: string) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}&_=${Date.now()}`;

/** CORS-friendly relays, tried in order until one works. */
const PROXIES: ((url: string) => { url: string; kind: "xml" | "rss2json" })[] = [
  (u) => ({ url: `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`, kind: "xml" }),
  (u) => ({ url: `https://corsproxy.io/?${encodeURIComponent(u)}`, kind: "xml" }),
  (u) => ({ url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, kind: "xml" }),
  (u) => ({ url: `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(u)}`, kind: "rss2json" }),
];

const YT_NS = "http://www.youtube.com/xml/schemas/2015";
const MEDIA_NS = "http://search.yahoo.com/mrss/";
const ATOM_NS = "http://www.w3.org/2005/Atom";

const staticById = new Map(VIDEOS.map((v) => [v.id, v]));

function deriveCategory(title: string, desc: string, channel: Video["channel"]): string {
  const t = `${title} ${desc}`.toLowerCase();
  if (t.includes("#shorts") || t.includes("#short")) return channel === "blox" ? "Roblox Short" : "Short";
  if (t.includes("pvp")) return "PvP Battle";
  if (t.includes("how to") || t.includes("tutorial") || t.includes("guide")) return "Tutorial";
  if (t.includes(" vs")) return "Epic Battle";
  if (channel === "blox") return "Roblox";
  return "Minecraft";
}

function deriveTags(title: string, desc: string, channel: Video["channel"]): string[] {
  const hashtags = Array.from(desc.matchAll(/#(\w+)/g)).map((m) => m[1].toLowerCase());
  const base = channel === "blox" ? ["roblox"] : ["minecraft"];
  const words = title.toLowerCase();
  if (words.includes("pvp")) base.push("pvp");
  if (words.includes("stickman")) base.push("stickman");
  return Array.from(new Set([...base, ...hashtags])).slice(0, 8);
}

function toVideo(
  raw: { id: string; title: string; published: string; updated: string; description: string },
  channel: Video["channel"]
): Video {
  const known = staticById.get(raw.id);
  const desc = raw.description || known?.description || raw.title;
  const isShort = /#shorts?\b/i.test(`${raw.title} ${desc}`);
  return {
    id: raw.id,
    title: raw.title || known?.title || "Untitled video",
    published: raw.published || known?.published || new Date().toISOString(),
    updated: raw.updated || raw.published || known?.updated || new Date().toISOString(),
    description: desc,
    channel,
    duration: known?.duration ?? (isShort ? "SHORT" : "VIDEO"),
    tags: known?.tags ?? deriveTags(raw.title, desc, channel),
    category: known?.category ?? deriveCategory(raw.title, desc, channel),
  };
}

function parseAtom(xmlText: string, channel: Video["channel"]): Video[] {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new Error("Bad XML");
  const entries = Array.from(doc.getElementsByTagNameNS(ATOM_NS, "entry"));
  if (!entries.length && !doc.getElementsByTagNameNS(ATOM_NS, "feed").length) {
    throw new Error("Not an Atom feed");
  }
  return entries
    .map((entry) => {
      const text = (ns: string, tag: string) =>
        entry.getElementsByTagNameNS(ns, tag)[0]?.textContent?.trim() ?? "";
      const id = text(YT_NS, "videoId");
      if (!id) return null;
      return toVideo(
        {
          id,
          title: text(ATOM_NS, "title"),
          published: text(ATOM_NS, "published"),
          updated: text(ATOM_NS, "updated"),
          description: text(MEDIA_NS, "description"),
        },
        channel
      );
    })
    .filter((v): v is Video => v !== null);
}

function parseRss2Json(json: unknown, channel: Video["channel"]): Video[] {
  const data = json as { status?: string; items?: Array<Record<string, string>> };
  if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("rss2json failed");
  return data.items
    .map((item) => {
      const id =
        item.guid?.replace("yt:video:", "") ||
        new URL(item.link ?? "", "https://youtube.com").searchParams.get("v") ||
        "";
      if (!id) return null;
      const published = item.pubDate ? new Date(item.pubDate.replace(" ", "T") + "Z").toISOString() : "";
      return toVideo(
        {
          id,
          title: item.title ?? "",
          published,
          updated: published,
          description: (item.description ?? "").replace(/<[^>]+>/g, ""),
        },
        channel
      );
    })
    .filter((v): v is Video => v !== null);
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: ctrl.signal, cache: "no-store" });
  } finally {
    clearTimeout(t);
  }
}

async function fetchFeed(channelId: string, channel: Video["channel"]): Promise<Video[]> {
  const target = feedUrl(channelId);
  let lastErr: unknown = null;
  for (const proxy of PROXIES) {
    const { url, kind } = proxy(target);
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (kind === "rss2json") {
        const videos = parseRss2Json(await res.json(), channel);
        if (videos.length) return videos;
      } else {
        const videos = parseAtom(await res.text(), channel);
        if (videos.length) return videos;
      }
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error("All relays failed");
}

function sortByDate(list: Video[]): Video[] {
  return [...list].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );
}

function loadCache(): { videos: Video[]; at: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { videos: Video[]; at: number };
    if (!Array.isArray(parsed.videos) || !parsed.videos.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useChannelFeed() {
  const cached = useRef(loadCache());
  const [videos, setVideos] = useState<Video[]>(() =>
    sortByDate(cached.current?.videos ?? VIDEOS)
  );
  const [status, setStatus] = useState<FeedStatus>("idle");
  const [lastSynced, setLastSynced] = useState<number | null>(cached.current?.at ?? null);
  const [newVideos, setNewVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const knownIds = useRef<Set<string>>(new Set(videos.map((v) => v.id)));
  const inFlight = useRef(false);
  const firstRun = useRef(true);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setStatus("loading");
    try {
      const results = await Promise.allSettled(
        FEEDS.map((f) => fetchFeed(f.id, f.channel))
      );
      const fetched: Video[] = [];
      let anyOk = false;
      results.forEach((r, i) => {
        if (r.status === "fulfilled") {
          anyOk = true;
          fetched.push(...r.value);
        } else {
          // keep whatever we already have for that channel
          fetched.push(...videos.filter((v) => v.channel === FEEDS[i].channel));
        }
      });
      if (!anyOk) throw new Error("Could not reach YouTube feeds");

      // Dedupe, keep static fallbacks that feeds may have dropped (feeds only list 15 latest)
      const map = new Map<string, Video>();
      fetched.forEach((v) => map.set(v.id, v));
      VIDEOS.forEach((v) => {
        if (!map.has(v.id)) map.set(v.id, v);
      });
      const merged = sortByDate(Array.from(map.values()));

      const fresh = merged.filter((v) => !knownIds.current.has(v.id));
      if (fresh.length && !firstRun.current) setNewVideos(fresh);
      if (fresh.length && firstRun.current && cached.current) setNewVideos(fresh);
      merged.forEach((v) => knownIds.current.add(v.id));

      setVideos(merged);
      const now = Date.now();
      setLastSynced(now);
      setStatus("live");
      setError(null);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ videos: merged, at: now }));
      } catch {
        /* storage full / private mode */
      }
    } catch (err) {
      setStatus("offline");
      setError(err instanceof Error ? err.message : "Feed unavailable");
    } finally {
      inFlight.current = false;
      firstRun.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void refresh();
    const timer = setInterval(() => void refresh(), POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const onOnline = () => void refresh();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [refresh]);

  const dismissNew = useCallback(() => setNewVideos([]), []);

  return { videos, status, lastSynced, newVideos, dismissNew, refresh, error, pollMs: POLL_MS };
}
