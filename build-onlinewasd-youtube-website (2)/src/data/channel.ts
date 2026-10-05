export interface Video {
  id: string;
  title: string;
  published: string;
  updated: string;
  description: string;
  channel: "main" | "blox";
  duration?: string;
  tags: string[];
  category: string;
  featured?: boolean;
}

export const CHANNEL = {
  name: "OnlineWASD",
  handle: "@OnlineWASD",
  id: "UCk5NnpL6inDmktModcooQjw",
  url: "https://www.youtube.com/@OnlineWASD",
  subscribeUrl: "https://www.youtube.com/@OnlineWASD?sub_confirmation=1",
  feedUrl: "https://www.youtube.com/feeds/videos.xml?channel_id=UCk5NnpL6inDmktModcooQjw",
  avatar:
    "https://yt3.googleusercontent.com/x8JwMgXXX5plb5UhpkNyVC7XJC7pu13j4E6EuMS5guGOKSqSPmxQ4-bX79QNSBWTKXud7CsV=s900-c-k-c0x00ffffff-no-rj",
  description:
    "On this channel you will watch Minecraft and other Minecraft based games.",
  longDescription:
    "OnlineWASD is a Minecraft gaming channel covering epic Stickman vs. Minecraft Mobs battles, intense PvP showdowns, trailer-quality visual guides with resource packs & mods, shorts, and crossover experiments like Free Fire vs. Minecraft. Family-friendly content for builders, fighters, and explorers.",
  niche: ["Minecraft", "Stickman vs Mobs", "PvP", "Tutorials", "Shorts"],
  keywords: [
    "Minecraft",
    "MineCraft",
    "Stickman",
    "minecraft mobs vs stickman",
    "minecraft pvp",
    "minecraft cpvp",
    "Free Fire vs Minecraft",
    "resource packs",
    "mods",
  ],
  familyFriendly: true,
  secondChannel: {
    name: "OnlineWASD_Blox",
    handle: "@OnlineWASD_Blox",
    id: "UCjqz6RN1UtCbweuQTBM5uUg",
    url: "https://www.youtube.com/@OnlineWASD_Blox",
    subscribeUrl: "https://www.youtube.com/@OnlineWASD_Blox?sub_confirmation=1",
    avatar:
      "https://yt3.googleusercontent.com/GlHcW-XdFoPxp_hoI3MYzy8rdStEQqd2nF-qbTuMThLgSklK4M_CBg5rK3V8NeDWuFNbjlKg-yI=s900-c-k-c0x00ffffff-no-rj",
    description:
      "Hi, I am OnlineWASD, a Minecraft content creator. This is my Roblox channel, OnlineWASD_Blox. You can Watch and Enjoy my Roblox Content. Don't forget to Subscribe!",
  },
};

export const VIDEOS: Video[] = [
  {
    id: "quetNjgTvsY",
    title: "Free Fire vs. Minecraft",
    published: "2026-09-23T16:05:02+00:00",
    updated: "2026-10-05T05:23:37+00:00",
    description:
      "Free Fire vs. Minecraft — the ultimate crossover short! #viral #trending #trendingshorts #explorepage #reels #fyp #minecraftshorts #minecraft #freefire #freefireshorts #freefiremax #freefireindia #shorts",
    channel: "main",
    duration: "SHORT",
    tags: ["shorts", "free fire", "minecraft", "crossover", "trending"],
    category: "Crossover Short",
    featured: true,
  },
  {
    id: "WnMSW6bTxhA",
    title:
      "How to turn Minecraft visuals into trailer visuals (Showcase and Resourcepacks/mods list)",
    published: "2026-06-16T12:00:03+00:00",
    updated: "2026-09-29T17:44:27+00:00",
    description:
      "In this video I will showcase and give you ResourcePacks and mods that can turn Minecraft visuals into Trailer look. Learn how to turn Minecraft graphics into trailer graphics — full showcase + pack/mod list included.",
    channel: "main",
    duration: "GUIDE",
    tags: ["tutorial", "resource packs", "mods", "shaders", "trailer visuals"],
    category: "Tutorial",
  },
  {
    id: "j1ZvLUrxtK8",
    title: "Minecraft PvP OnlineWASD (Me) vs. @Spiderunique_Blox",
    published: "2026-05-27T17:25:47+00:00",
    updated: "2026-09-24T02:52:43+00:00",
    description:
      "In this video I will fight @Spiderunique_Blox. Sorry for the game lag — also I have not fought with my gaming mouse, I fought using a normal mouse in this video. Sorry for bad PvP but you can still enjoy my video! Also rate my PvP and video editing in the comments.",
    channel: "main",
    duration: "PVP",
    tags: ["pvp", "battle", "multiplayer", "challenge"],
    category: "PvP Battle",
  },
  {
    id: "wV_-SUL0AfY",
    title: "Epic Stickman vs. Minecraft Mobs",
    published: "2026-05-19T16:24:58+00:00",
    updated: "2026-10-01T08:14:23+00:00",
    description:
      "Epic Stickman vs. Minecraft Mobs. Please support my channel — in next videos I will play Minecraft. Subscribe!",
    channel: "main",
    duration: "BATTLE",
    tags: ["stickman", "mobs", "epic battle", "minecraft"],
    category: "Epic Battle",
  },
  {
    id: "BNg6vwkbeew",
    title: "#roblox #robloxgames — Roblox Short",
    published: "2026-07-12T13:04:24+00:00",
    updated: "2026-09-23T17:17:10+00:00",
    description:
      "#roblox #robloxgames #shorts #shortvideo #robloxshorts — Music: Yara Yara Ya Phonk (Slowed) Revengist. From the OnlineWASD_Blox Roblox channel.",
    channel: "blox",
    duration: "SHORT",
    tags: ["roblox", "shorts", "gaming"],
    category: "Roblox Short",
  },
  {
    id: "qpk4kphVLEQ",
    title: "Minecraft — on OnlineWASD_Blox",
    published: "2025-08-27T02:11:22+00:00",
    updated: "2026-09-30T04:19:09+00:00",
    description: "Minecraft — a crossover upload on the OnlineWASD_Blox channel.",
    channel: "blox",
    duration: "VIDEO",
    tags: ["minecraft", "roblox channel", "crossover"],
    category: "Crossover",
  },
];

export const thumb = (id: string, quality: "hq" | "max" = "hq") =>
  quality === "max"
    ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const embedUrl = (id: string, autoplay = false) =>
  `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1" : ""}`;

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const timeAgo = (iso: string) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
};
