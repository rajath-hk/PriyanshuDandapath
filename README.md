# 🎬 PriyansArt — Creative Portfolio Website

A cinematic, high-performance portfolio website for **Priyanshu Dandapath (PriyansArt)** — Professional Video Editor, Motion Designer & AI Filmmaker.

Built with **React**, **TypeScript**, **Three.js**, **GSAP**, and **Vite**.

---

## ✨ Features

- **3D Character Experience:** Interactive WebGL workstation with real-time mouse head tracking and bone animation.
- **Scroll-Choreographed Motion:** GSAP ScrollTrigger timeline transitions that rotate the 3D scene into the editing suite as you scroll.
- **Bento-Row Video Portfolio:** Dedicated 16-slot video gallery structured into **Short Form** (9:16 vertical reels) and **Long Form** (16:9 widescreen cinematics).
- **YouTube Embed Ready:** Supports standard YouTube watch URLs, short URLs (`youtu.be`), and YouTube Shorts (`youtube.com/shorts`). Includes lazy-loaded responsive modal player.
- **Creative Suite & AI Stack:** Visual showcase of industry-standard tools: Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Illustrator, Blender, Spline 3D, Midjourney, Runway Gen-3, Kling AI, Luma Dream Machine, Topaz Video AI, and ElevenLabs.
- **Smooth Inertial Scrolling:** Studio-grade smoothness powered by Lenis.
- **Fully Responsive:** Custom mobile layouts, touch-friendly navigation, and mobile portrait fallback.

---

## 🚀 Getting Started

### 1) Run Locally

On Windows PowerShell:
```powershell
# In PowerShell (use npm.cmd if scripts are restricted):
npm.cmd install
npm.cmd run dev
```

### 2) Production Build

```powershell
npm.cmd run build
npm.cmd run preview
```

---

## 🎥 How to Add Your YouTube URLs Later

All project details and video links are centralized in one file: **[`src/config.ts`](src/config.ts)**.

To connect your real videos, open `src/config.ts` and locate the `projects` array. Simply paste your YouTube link into the `videoUrl` property:

```typescript
{
    id: "fast-paced-01",
    title: "Fast-Paced Edit 01",
    topLevelCategory: "SHORT FORM",
    subCategory: "Fast-Paced Edits",
    subCategoryKey: "fast-paced",
    categoryNumber: "01",
    order: 1,
    description: "High-octane viral pacing engineered for peak viewer retention...",
    aspectRatio: "9:16",
    videoUrl: "https://www.youtube.com/shorts/YOUR_VIDEO_ID", // <-- PASTE HERE
    featured: true,
    tags: ["High Retention", "Speed Cut", "Sound Sync"]
}
```

### Supported YouTube URL Formats:
- Standard: `https://www.youtube.com/watch?v=XXXXXXXXXXX`
- Short link: `https://youtu.be/XXXXXXXXXXX`
- Shorts: `https://www.youtube.com/shorts/XXXXXXXXXXX`
- Embed: `https://www.youtube.com/embed/XXXXXXXXXXX`
- Raw 11-character video ID: `XXXXXXXXXXX`

Once a URL is added, the card automatically fetches the YouTube cover image, shows an interactive glowing play button, and opens the responsive video player on click. If left blank (`videoUrl: ""`), the card displays a clean, dark cinematic placeholder ready for future embedding.

---

## 📁 16 Portfolio Slots & Categories

### Section A: SHORT FORM (11 Reels — 9:16)
- **01. Fast-Paced Edits (4 Reels):** `fast-paced-01`, `fast-paced-02`, `fast-paced-03`, `fast-paced-04`
- **02. Talking Head (4 Reels):** `talking-head-01`, `talking-head-02`, `talking-head-03`, `talking-head-04`
- **03. Podcast Highlights (3 Reels):** `podcast-highlight-01`, `podcast-highlight-02`, `podcast-highlight-03`

### Section B: LONG FORM (5 Videos — 16:9)
- **04. Case Studies (2 Videos):** `case-study-01`, `case-study-02`
- **05. Music Videos (1 Video):** `music-video-01`
- **06. Podcast (1 Video):** `podcast-01`
- **07. SaaS Motion (1 Video):** `saas-01`

---

## 🪪 License & Attribution

- **Creator / Portfolio Owner:** Priyanshu Dandapath (PriyansArt).
- **Core 3D WebGL Template:** Adapted from open-source repository by [Redoyanul Haque](https://github.com/red1-for-hek/portfolio-website) under the **MIT License**. See [`LICENSE`](LICENSE) for full legal text.
