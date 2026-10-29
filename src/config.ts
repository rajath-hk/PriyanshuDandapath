export interface ProjectItem {
    id: string;
    title: string;
    topLevelCategory: "SHORT FORM" | "LONG FORM";
    subCategory: string;
    subCategoryKey: string;
    categoryNumber: string;
    order: number;
    description: string;
    aspectRatio: "9:16" | "16:9";
    videoUrl: string; // Add your YouTube URL here later (watch, youtu.be, shorts)
    thumbnailUrl?: string; // Optional local or remote image thumbnail
    featured: boolean;
    tags: string[];
}

export interface CreativeTool {
    name: string;
    category: string;
    icon: string;
    url: string;
}

export const config = {
    developer: {
        name: "Priyanshu",
        brandName: "PriyansArt",
        fullName: "Priyanshu Dandapath",
        headline: "PriyansArt",
        monogram: "PA",
        title: "Video Editor · Motion Designer · AI Filmmaker",
        roles: ["Video Editor", "Motion Designer", "AI Filmmaker"],
        tagline: "Crafting visuals that make people stop and watch.",
        description: "I turn raw footage into engaging visual experiences, from fast-paced short-form edits and podcast highlights to long-form storytelling, motion graphics, and AI-assisted films. Every cut, transition, and visual detail should serve the story.",
        mobilePhoto: "/images/profile.jpg"
    },
    social: {
        email: "artpriyans@gmail.com",
        location: "Howrah, West Bengal, India",
        availability: "Available for remote projects worldwide",
        instagram: "https://www.instagram.com/priyansart/",
        linkedin: "https://www.linkedin.com/in/priyanshu-dandapath-a99773300/",
        youtube: "", // Add YouTube channel link when available
        twitter: "", // Add X link when available
        github: ""   // Add GitHub link when available
    },
    about: {
        title: "About PriyansArt",
        headline: "Visual storytelling through rhythm, pacing, and retention.",
        description: "Creating edits has never felt like a job to me; it's how I process stories, rhythm, and retention. I turn raw footage into engaging visual experiences, from fast-paced short-form edits and podcast highlights to long-form storytelling, motion graphics, and AI-assisted films. Every cut, transition, and visual detail should serve the story.",
        philosophy: "Whether engineering hook retention for high-velocity shorts or shaping documentary-level narrative depth for long-form films, the goal is always the same: keep viewers captivated from the first frame to the last."
    },
    experiences: [
        {
            position: "AI Filmmaking & GenAI Visuals",
            company: "Generative Direction & Cinematic AI",
            period: "2025",
            location: "Remote",
            description: "Pioneering generative AI video workflows with Midjourney, Runway Gen-3, Kling AI, and Topaz Video AI to create hyper-cinematic concept commercials and hybrid motion scenes.",
            responsibilities: [
                "Generative AI video prompting, motion consistency, and upscaling",
                "Hybrid live-action and AI visual effects compositing",
                "Experimental cinematic world-building and narrative short films"
            ],
            technologies: ["Midjourney", "Runway Gen-3", "Kling AI", "Luma", "Topaz AI"]
        },
        {
            position: "Motion Designer & 3D Animator",
            company: "Motion Graphics & 3D Visuals",
            period: "2024",
            location: "Remote",
            description: "Designing kinetic typography, dynamic lower thirds, 3D camera projections, and UI explainer animations that bring static brands to life.",
            responsibilities: [
                "Advanced After Effects kinetic typography and visual VFX",
                "Product explainer and SaaS motion UI choreography",
                "Custom sound design and impact audio integration"
            ],
            technologies: ["After Effects", "Blender", "Photoshop", "Illustrator", "Spline"]
        },
        {
            position: "High-Retention Video Editor",
            company: "Viral Shorts, Reels & Creator Pacing",
            period: "2023",
            location: "Remote",
            description: "Delivering fast-paced, retention-optimized video editing for YouTube Shorts, Instagram Reels, and podcasts with tight rhythmic pacing and pattern interrupts.",
            responsibilities: [
                "Speed ramping, dynamic zooms, and beat-matched jump cuts",
                "Engaging visual B-roll sourcing, sound design, and subtitle typography",
                "Optimizing hook structures for maximum retention and viewer watch time"
            ],
            technologies: ["Premiere Pro", "DaVinci Resolve", "Sound Design", "Color Grading"]
        },
        {
            position: "Docu-Style & Long-Form Video Editor",
            company: "Narrative Documentary & Multi-Cam",
            period: "2022",
            location: "Remote",
            description: "Crafting long-form documentary narratives, multi-camera podcast edits, and cinematic video essays with seamless narrative flow.",
            responsibilities: [
                "Multi-camera podcast synchronization and color matching",
                "Long-form pacing and narrative chapter construction",
                "Full-mix sound leveling, noise cleanup, and mastering"
            ],
            technologies: ["Premiere Pro", "DaVinci Resolve", "Audio Mastering"]
        }
    ],
    // EXACT 16 PROJECT SLOTS ORGANIZED INTO 7 SUBCATEGORIES UNDER SHORT FORM & LONG FORM
    projects: [
        // =====================================================================
        // A. SHORT FORM (11 video projects · 9:16 portrait)
        // =====================================================================
        // Category 1: Talking Head — 4 videos
        {
            id: "talking-head-01",
            title: "Talking Head Edit 01",
            topLevelCategory: "SHORT FORM",
            subCategory: "Talking Head",
            subCategoryKey: "talking-head",
            categoryNumber: "01",
            order: 1,
            description: "High-converting creator storytelling powered by kinetic typography, animated graphic callouts, and curated B-roll overlays.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/WBcNHW3HWYg?feature=share",
            featured: true,
            tags: ["Kinetic Typography", "Creator Story", "B-Roll Flow"]
        },
        {
            id: "talking-head-02",
            title: "Talking Head Edit 02",
            topLevelCategory: "SHORT FORM",
            subCategory: "Talking Head",
            subCategoryKey: "talking-head",
            categoryNumber: "01",
            order: 2,
            description: "Thought-leader reel engineered for clarity, zero dead air, and responsive visual graphics that drive message retention.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/1_tKST6tOOA",
            featured: false,
            tags: ["Pop-up Graphics", "Retention Pacing", "Visual Hooks"]
        },
        {
            id: "talking-head-03",
            title: "Talking Head Edit 03",
            topLevelCategory: "SHORT FORM",
            subCategory: "Talking Head",
            subCategoryKey: "talking-head",
            categoryNumber: "01",
            order: 3,
            description: "Cinematic color grade with animated branded subtitles and dynamic framing keeping the speaker front and center.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/xVRXBSPjpLg",
            featured: false,
            tags: ["Color Grade", "Subtitles", "Framing"]
        },
        {
            id: "talking-head-04",
            title: "Talking Head Edit 04",
            topLevelCategory: "SHORT FORM",
            subCategory: "Talking Head",
            subCategoryKey: "talking-head",
            categoryNumber: "01",
            order: 4,
            description: "Studio-mastered vocal punch with selective sound effects highlighting core takeaway moments and insights.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/Y09E29HmtD0?feature=share",
            featured: false,
            tags: ["Audio Mastering", "Sound Design", "Punch-ins"]
        },

        // Category 2: Fast-Paced Edits — 4 videos
        {
            id: "fast-paced-01",
            title: "Fast-Paced Edit 01",
            topLevelCategory: "SHORT FORM",
            subCategory: "Fast-Paced Edits",
            subCategoryKey: "fast-paced",
            categoryNumber: "02",
            order: 5,
            description: "High-octane viral pacing engineered for peak viewer retention, aggressive speed cuts, and beat-matched transitions.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/NIM_j5cVWW0",
            featured: true,
            tags: ["High Retention", "Speed Cut", "Sound Sync"]
        },
        {
            id: "fast-paced-02",
            title: "Fast-Paced Edit 02",
            topLevelCategory: "SHORT FORM",
            subCategory: "Fast-Paced Edits",
            subCategoryKey: "fast-paced",
            categoryNumber: "02",
            order: 6,
            description: "Rhythm-matched kinetic cuts syncing aggressive audio beats with explosive motion punches and rapid pacing.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/_fIOLS-wdM8?feature=share",
            featured: false,
            tags: ["Beat Drop", "Dynamic VFX", "Velocity"]
        },
        {
            id: "fast-paced-03",
            title: "Fast-Paced Edit 03",
            topLevelCategory: "SHORT FORM",
            subCategory: "Fast-Paced Edits",
            subCategoryKey: "fast-paced",
            categoryNumber: "02",
            order: 7,
            description: "Pattern-interrupt hooks, rapid cutaways, and micro-sound design designed to stop the scroll instantly.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/qaAlt0JGyKA",
            featured: false,
            tags: ["Viral Hooks", "Micro-Zooms", "SFX"]
        },
        {
            id: "fast-paced-04",
            title: "Fast-Paced Edit 04",
            topLevelCategory: "SHORT FORM",
            subCategory: "Fast-Paced Edits",
            subCategoryKey: "fast-paced",
            categoryNumber: "02",
            order: 8,
            description: "Seamless speed ramping and framing manipulation sustaining continuous high-velocity narrative momentum.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/QEROMqMd-eg",
            featured: false,
            tags: ["Kinetic Motion", "Speed Ramps", "Flow"]
        },

        // Category 3: Podcast Highlights — 3 videos
        {
            id: "podcast-highlight-01",
            title: "Podcast Highlight 01",
            topLevelCategory: "SHORT FORM",
            subCategory: "Podcast Highlights",
            subCategoryKey: "podcast-highlights",
            categoryNumber: "03",
            order: 9,
            description: "Dynamic speaker switching, emotive reaction framing, and punchy caption styling for conversational gold.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/5igFB28eyoE?feature=share",
            featured: true,
            tags: ["Multi-Cam Cut", "Viral Clip", "Dynamic Subs"]
        },
        {
            id: "podcast-highlight-02",
            title: "Podcast Highlight 02",
            topLevelCategory: "SHORT FORM",
            subCategory: "Podcast Highlights",
            subCategoryKey: "podcast-highlights",
            categoryNumber: "03",
            order: 10,
            description: "High-impact health & fitness excerpt breaking down cortisol research with animated visual evidence and sound design.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/YDZ15Fbn4KU?feature=share",
            featured: false,
            tags: ["Waveforms", "Highlights", "Dialogue"]
        },
        {
            id: "podcast-highlight-03",
            title: "Podcast Highlight 03",
            topLevelCategory: "SHORT FORM",
            subCategory: "Podcast Highlights",
            subCategoryKey: "podcast-highlights",
            categoryNumber: "03",
            order: 11,
            description: "Split-screen dialogue framing and engaging hook structure driving curiosity and retention across socials.",
            aspectRatio: "9:16",
            videoUrl: "https://youtube.com/shorts/UZew8l9wS80",
            featured: false,
            tags: ["Split Frame", "Hook Pacing", "Reactions"]
        },

        // =====================================================================
        // B. LONG FORM (5 video projects · 16:9 widescreen)
        // =====================================================================
        // Category 4: Case Studies — 2 videos
        {
            id: "case-study-01",
            title: "Case Study 01",
            topLevelCategory: "LONG FORM",
            subCategory: "Case Studies",
            subCategoryKey: "case-studies",
            categoryNumber: "04",
            order: 12,
            description: "Comprehensive brand documentary dissecting client growth through deliberate visual storytelling and data graphics.",
            aspectRatio: "16:9",
            videoUrl: "https://youtu.be/tiJvkzqG2oY",
            featured: true,
            tags: ["Docu-Style", "Brand Narrative", "Deep Dive"]
        },
        {
            id: "case-study-02",
            title: "Case Study 02 · Aham By Senco",
            topLevelCategory: "LONG FORM",
            subCategory: "Case Studies",
            subCategoryKey: "case-studies",
            categoryNumber: "04",
            order: 13,
            description: "Commercial film and campaign showcase for Aham By Senco Titanium, featuring refined luxury color grading and sound design.",
            aspectRatio: "16:9",
            videoUrl: "https://youtu.be/HEdseIExbTs",
            featured: false,
            tags: ["Commercial", "Brand Campaign", "Color Grade"]
        },

        // Category 5: SaaS — 1 video
        {
            id: "saas-01",
            title: "SaaS Product Video 01",
            topLevelCategory: "LONG FORM",
            subCategory: "SaaS",
            subCategoryKey: "saas",
            categoryNumber: "05",
            order: 14,
            description: "High-conversion product walkthrough transforming complex UI workflows into sleek 3D-perspective motion graphics.",
            aspectRatio: "16:9",
            videoUrl: "https://youtu.be/h8LH8smtVwU",
            featured: true,
            tags: ["UI Animation", "Product Explainer", "After Effects"]
        },

        // Category 6: Music Videos — 1 video
        {
            id: "music-video-01",
            title: "Music Video 01",
            topLevelCategory: "LONG FORM",
            subCategory: "Music Videos",
            subCategoryKey: "music-videos",
            categoryNumber: "06",
            order: 15,
            description: "Cinematic music video cut with rhythm-locked transitions, stylized film grain, and atmospheric lighting treatment.",
            aspectRatio: "16:9",
            videoUrl: "https://youtu.be/LYhWxt61a_I",
            featured: false,
            tags: ["Beat Sync", "Color Grade", "Rhythmic Cuts"]
        },

        // Category 7: Podcast — 1 video
        {
            id: "podcast-01",
            title: "Podcast Episode 01 · India's Solar Empire",
            topLevelCategory: "LONG FORM",
            subCategory: "Podcast",
            subCategoryKey: "podcast",
            categoryNumber: "07",
            order: 16,
            description: "Full-length episodic YouTube podcast master featuring Surender Pal Singh Saluja with multi-cam switching and broadcast mastering.",
            aspectRatio: "16:9",
            videoUrl: "https://youtu.be/nQtBlMbJfpI?si=vUaRy63AG-wtwJa7",
            featured: false,
            tags: ["Full Episode", "Multi-Cam", "Master Audio"]
        }
    ] as ProjectItem[],

    // CREATIVE SUITE & AI TOOLS
    creativeTools: [
        // Editing & Color
        { name: "Adobe Premiere Pro", category: "Editing & Color", icon: "/images/tools/premiere.svg", url: "https://www.adobe.com/products/premiere.html" },
        { name: "DaVinci Resolve", category: "Editing & Color", icon: "/images/tools/davinci.png", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
        { name: "CapCut", category: "Editing & Color", icon: "/images/tools/capcut.svg", url: "https://www.capcut.com" },
        // AI Filmmaking
        { name: "Flow", category: "AI Filmmaking", icon: "/images/tools/flow.svg", url: "https://labs.google/flow" },
        { name: "Higgsfield AI", category: "AI Filmmaking", icon: "/images/tools/higgsfield.png", url: "https://higgsfield.ai" },
        { name: "Kling AI", category: "AI Filmmaking", icon: "/images/tools/kling.svg", url: "https://klingai.com" },
        { name: "Adobe Photoshop", category: "AI Filmmaking", icon: "/images/tools/photoshop.svg", url: "https://www.adobe.com/products/photoshop.html" },
        { name: "ElevenLabs", category: "AI Filmmaking", icon: "/images/tools/elevenlabs.svg", url: "https://elevenlabs.io" },
        // Design
        { name: "Adobe Illustrator", category: "Design", icon: "/images/tools/illustrator.svg", url: "https://www.adobe.com/products/illustrator.html" },
        { name: "Adobe Photoshop", category: "Design", icon: "/images/tools/photoshop.svg", url: "https://www.adobe.com/products/photoshop.html" },
        { name: "Procreate", category: "Design", icon: "/images/tools/procreate.png", url: "https://procreate.com" }
    ] as CreativeTool[],

    skills: {
        develop: {
            title: "VIDEO EDITING",
            description: "High-retention pacing & viral visual engineering",
            details: "Mastering the rhythm of every frame. From fast-paced gym edits and viral Shorts to full-length documentary storytelling, using Premiere Pro and DaVinci Resolve.",
            tools: ["Premiere Pro", "DaVinci Resolve", "Sound Design", "Color Grading", "Pacing", "Hooks", "Multi-Cam", "Retention"]
        },
        design: {
            title: "MOTION & AI FILM",
            description: "Kinetic typography, visual VFX & GenAI cinematography",
            details: "Bringing concepts into dynamic motion with After Effects, Blender, Spline, and next-gen AI video models (Runway, Kling, Midjourney) for high-impact visual alchemy.",
            tools: ["After Effects", "Blender", "Photoshop", "Flow", "Higgsfield AI", "Kling AI", "Topaz AI", "ElevenLabs"]
        }
    }
};
