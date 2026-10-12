import React, { useState, useEffect, useRef } from 'react';
import { 
    Play, 
    Instagram, 
    Linkedin, 
    Mail, 
    Phone, 
    ExternalLink, 
    Copy, 
    Check, 
    Menu, 
    X, 
    ArrowUpRight,
    Film,
    Sparkles,
    Scissors
} from 'lucide-react';

import PremierePro from '../image/PrimerPro.png';
import AfterEffects from '../image/AfterEffcts.png';
import DaVinciResolve from '../image/Davinchi Resolve.png';
import Photoshop from '../image/PhotoShop.png';
import ProfilePic from '../image/profile.jpg';
import PortfolioBanner from '../image/Portfolio-baner.png';

// Resolves relative asset URLs dynamically for GitHub Pages (/repo-name/) and local root (./)
const getAssetUrl = (path) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanBase}${cleanPath}`;
};

/* =========================================================================
   MONOCHROME GLYPHS (Matching Reference: ✦ ★ ♣)
   ========================================================================= */

// 4-point pointed sparkle star
const GlyphSparkle = ({ className = "w-5 h-5 text-zinc-950" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z"/>
    </svg>
);

// 8-point faceted star
const GlyphStar = ({ className = "w-5 h-5 text-zinc-950" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
    </svg>
);

// 3-leaf clover / club mark
const GlyphClover = ({ className = "w-5 h-5 text-zinc-950" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="7.5" r="4.5"/>
        <circle cx="7.5" cy="14" r="4.5"/>
        <circle cx="16.5" cy="14" r="4.5"/>
        <path d="M11 14H13V22H11Z"/>
        <path d="M10 20C10 20 12 21 14 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

/* =========================================================================
   FRAMED ALPHA-CHANNEL LOOPING 3D CHARACTER COMPONENT (3D sub roated.mov)
   Muted inline loop, full figure visible.
   ========================================================================= */
const AlphaVideoFrame = ({ posterImage }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [prefersReduced, setPrefersReduced] = useState(false);
    const activePoster = posterImage || getAssetUrl('images/3d-figure-poster.png');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);

        const handleMotionChange = (e) => {
            setPrefersReduced(e.matches);
            if (e.matches && videoRef.current) {
                videoRef.current.pause();
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMotionChange);
        }

        if (mediaQuery.matches && videoRef.current) {
            videoRef.current.pause();
            return;
        }

        if (videoRef.current && !mediaQuery.matches) {
            videoRef.current.play().catch(() => {});
        }

        // Pause/defer playback when offscreen
        if (!containerRef.current || !videoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting && !mediaQuery.matches) {
                        videoRef.current.play().catch(() => {});
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => {
            observer.disconnect();
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMotionChange);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center select-none">
            {!hasError && !prefersReduced ? (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={activePoster}
                    onError={() => setHasError(true)}
                    onLoadedData={() => setIsLoaded(true)}
                    onCanPlay={() => setIsLoaded(true)}
                    className={`w-full h-full max-h-[380px] sm:max-h-[420px] object-contain relative z-10 transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    title="Priyanshu Dandapath 3D character animation (3D sub roated.mov)"
                >
                    <source src={getAssetUrl('videos/3D-sub-roated.webm')} type="video/webm" />
                    <source src={getAssetUrl('videos/3D sub roated.webm')} type="video/webm" />
                </video>
            ) : null}

            {/* Fallback Still Poster */}
            {(!isLoaded || hasError || prefersReduced) && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <img 
                        src={activePoster} 
                        alt="Priyanshu Dandapath 3D figure standing still"
                        className="w-full h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
};

/* =========================================================================
   CENTRAL TORN-PAPER BANNER COMPONENT (Banner My photoo.mov)
   Updated MOV with prominent portrait in torn black band and scrolling text.
   ========================================================================= */
const CentralTornBanner = ({ fallbackPoster }) => {
    const bannerVideoRef = useRef(null);
    const bannerContainerRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [hasVideoError, setHasVideoError] = useState(false);
    const [prefersReduced, setPrefersReduced] = useState(false);
    const activePoster = fallbackPoster || getAssetUrl('images/banner-poster.png');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);

        const handleMotionChange = (e) => {
            setPrefersReduced(e.matches);
            if (e.matches && bannerVideoRef.current) {
                bannerVideoRef.current.pause();
                setIsVideoPlaying(false);
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMotionChange);
        }

        if (mediaQuery.matches && bannerVideoRef.current) {
            bannerVideoRef.current.pause();
            return;
        }

        if (bannerVideoRef.current && !mediaQuery.matches) {
            bannerVideoRef.current.play().catch(() => {});
        }

        if (!bannerContainerRef.current || !bannerVideoRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (bannerVideoRef.current) {
                    if (entry.isIntersecting && !mediaQuery.matches) {
                        bannerVideoRef.current.play().catch(() => {});
                    } else {
                        bannerVideoRef.current.pause();
                    }
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(bannerContainerRef.current);
        return () => {
            observer.disconnect();
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleMotionChange);
            }
        };
    }, []);

    return (
        <section 
            ref={bannerContainerRef} 
            className="relative my-8 sm:my-14 md:my-18 w-full overflow-hidden select-none active:scale-[0.99] transition-transform duration-150 cursor-pointer"
            aria-label="Motion Video Banner"
        >
            <div className="relative w-full flex items-center justify-center overflow-hidden">
                {!hasVideoError && !prefersReduced ? (
                    <video
                        ref={bannerVideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={activePoster}
                        onPlaying={() => setIsVideoPlaying(true)}
                        onLoadedData={() => setIsVideoPlaying(true)}
                        onCanPlay={() => setIsVideoPlaying(true)}
                        onError={() => setHasVideoError(true)}
                        className="w-full h-auto min-w-full block object-contain mx-auto select-none pointer-events-none scale-[1.02] sm:scale-105 md:scale-110 transition-transform duration-300"
                        title="Priyanshu Dandapath motion torn-paper banner (Banner My photoo.mov)"
                    >
                        <source src={`${getAssetUrl('videos/Banner-My-photoo.webm')}?v=2`} type="video/webm" />
                        <source src={`${getAssetUrl('videos/Banner My photoo.webm')}?v=2`} type="video/webm" />
                    </video>
                ) : null}

                {/* Fallback Still Poster */}
                {(!isVideoPlaying || hasVideoError || prefersReduced) && (
                    <img 
                        src={activePoster} 
                        alt="Priyanshu Dandapath motion banner still" 
                        className="w-full h-auto min-w-full block object-contain mx-auto select-none scale-[1.02] sm:scale-105 md:scale-110"
                    />
                )}
            </div>
        </section>
    );
};

/* =========================================================================
   VERTICAL VIDEO CARD (True 9:16 Portrait Ratio)
   ========================================================================= */
const ProjectCardVertical = ({ project, isPlaying, onPlay }) => (
    <div 
        tabIndex={0}
        className="group rounded-2xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl card-hover-lift overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-red-500 focus:outline-none w-full"
    >
        {/* Card Header Bar */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="font-mono text-xs font-bold text-zinc-200">
                    #{project.id}
                </span>
                <span className="text-zinc-500">/</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                    {project.categoryLabel}
                </span>
            </div>
            <span className="font-mono text-xs text-zinc-400 font-semibold">
                {project.date}
            </span>
        </div>

        {/* Video Player Frame with true 9:16 portrait ratio */}
        <div className="p-3 sm:p-3.5 bg-black/60 border-b border-zinc-800 flex items-center justify-center">
            <div className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-black relative border border-zinc-800 shadow-inner">
                {isPlaying ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="relative w-full h-full group/video">
                        <img 
                            src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-colors group-hover/video:bg-black/20">
                            <button
                                onClick={onPlay}
                                className="w-14 h-14 rounded-2xl bg-red-600/95 hover:bg-red-500 active:scale-90 active:bg-red-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer backdrop-blur-sm border border-white/20 select-none"
                                aria-label={`Play ${project.title}`}
                            >
                                <Play size={24} className="fill-white translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Card Footer & Metadata */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-2 mt-auto bg-zinc-950/60">
            <div className="min-w-0">
                <h3 className="font-display font-black text-sm sm:text-base text-white leading-tight truncate">
                    {project.title}
                </h3>
                <span className="inline-block px-2 py-0.5 mt-1 rounded bg-zinc-800 text-[10px] font-mono font-bold text-zinc-300 border border-zinc-700 uppercase">
                    {project.tag}
                </span>
            </div>

            <a
                href={`https://www.youtube.com/watch?v=${project.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 active:bg-red-700 text-white font-mono font-bold text-[11px] tracking-wider uppercase transition-all shrink-0 cursor-pointer shadow-md"
            >
                YOUTUBE <ArrowUpRight size={13} />
            </a>
        </div>
    </div>
);

/* =========================================================================
   HORIZONTAL VIDEO CARD (True 16:9 Landscape Ratio)
   ========================================================================= */
const ProjectCardHorizontal = ({ project, isPlaying, onPlay }) => (
    <div 
        tabIndex={0}
        className="group rounded-2xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl card-hover-lift overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-red-500 focus:outline-none w-full"
    >
        {/* Card Header Bar */}
        <div className="px-4 sm:px-5 py-3 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-200">
                    #{project.id}
                </span>
                <span className="text-zinc-500">/</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300">
                    {project.categoryLabel}
                </span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-zinc-400 font-semibold">
                {project.date}
            </span>
        </div>

        {/* Video Player Frame with true 16:9 landscape ratio */}
        <div className="p-3 sm:p-5 bg-black/60 border-b border-zinc-800">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative border border-zinc-800 shadow-inner">
                {isPlaying ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="relative w-full h-full group/video">
                        <img 
                            src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`} 
                            onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
                            }}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-colors group-hover/video:bg-black/20">
                            <button
                                onClick={onPlay}
                                className="w-18 h-12 rounded-xl bg-red-600/95 hover:bg-red-500 active:scale-90 active:bg-red-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all cursor-pointer backdrop-blur-sm border border-white/20 select-none"
                                aria-label={`Play ${project.title}`}
                            >
                                <Play size={26} className="fill-white translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Card Footer & Metadata */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 mt-auto bg-zinc-950/60">
            <div className="min-w-0">
                <h3 className="font-display font-black text-base sm:text-xl text-white leading-tight truncate">
                    {project.title}
                </h3>
                <span className="inline-block px-2.5 py-0.5 mt-1 rounded bg-zinc-800 text-[10px] sm:text-xs font-mono font-bold text-zinc-300 border border-zinc-700 uppercase">
                    {project.tag}
                </span>
            </div>

            <a
                href={`https://www.youtube.com/watch?v=${project.videoId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 active:bg-red-700 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shrink-0 cursor-pointer shadow-md"
            >
                YOUTUBE <ArrowUpRight size={15} />
            </a>
        </div>
    </div>
);

/* =========================================================================
   MAIN PORTFOLIO COMPONENT
   ========================================================================= */
const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeWorkCategory, setActiveWorkCategory] = useState('all');
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(null);

    // Track active section on scroll
    useEffect(() => {
        const sections = ['home', 'about', 'services', 'work', 'contact'];
        const handleScroll = () => {
            const scrollPos = window.scrollY + 250;
            for (let i = sections.length - 1; i >= 0; i--) {
                const sec = document.getElementById(sections[i]);
                if (sec && sec.offsetTop <= scrollPos) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const targetId = id === 'experience' ? 'services' : id;
        const element = document.getElementById(targetId) || document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('artpriyans@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    // Full software names (no ellipses truncation)
    const softwareSkills = [
        { code: 'Pr', name: 'Premiere Pro', desc: 'Fast Cut & Rhythm', icon: PremierePro },
        { code: 'Ae', name: 'After Effects', desc: 'Motion & VFX', icon: AfterEffects },
        { code: 'Da', name: 'DaVinci Resolve', desc: 'Color & Sound', icon: DaVinciResolve },
        { code: 'Ps', name: 'Photoshop', desc: 'Thumbnails & Assets', icon: Photoshop }
    ];

    // High-value creative services replacing timeline
    const creativeServices = [
        {
            title: 'Short-Form Viral Retention',
            tag: '9:16 Shorts',
            desc: 'High-pace TikTok, Reels & YT Shorts engineered with psychological hooks, rapid beat sync & retention graphs.',
            metrics: '90%+ Avg. Watch Retention'
        },
        {
            title: 'Docu-Style YouTube Storytelling',
            tag: '16:9 Long-Form',
            desc: 'Immersive long-form pacing, narrative chapter cuts, cinematic B-roll storytelling and viewer engagement retention.',
            metrics: 'High Conversion & AVD'
        },
        {
            title: 'Motion Graphics & Visual FX',
            tag: 'Ae Motion',
            desc: 'Kinetic typography, animated 2D/3D elements, custom title cards and dynamic UI explainer animations.',
            metrics: 'Custom 60FPS Assets'
        },
        {
            title: 'Sound Design & Audio Mastering',
            tag: 'Foley & Color',
            desc: 'Multi-layered cinematic Foley, hard-hitting impact risers, vocal tuning, crisp EQ and cinematic color grades.',
            metrics: '4K ProRes Audio/Video'
        }
    ];

    const portfolioItems = {
        fastPaced: [
            { id: '01', title: 'Fast Paced Edit 1', type: 'Short Form', videoId: 'zxKrdu-Qwe0', tag: 'High Retention', date: '2025', isVertical: true },
            { id: '02', title: 'Fast Paced Edit 2', type: 'Short Form', videoId: 'U1S8MJ-_xtI', tag: 'Gym Rhythm', date: '2025', isVertical: true },
            { id: '03', title: 'Fast Paced Edit 3', type: 'Short Form', videoId: '_fIOLS-wdM8', tag: 'Speed Cut', date: '2024', isVertical: true },
            { id: '04', title: 'Fast Paced Edit 4', type: 'Short Form', videoId: 'dHJg6uceDyw', tag: 'Beat Sync', date: '2024', isVertical: true }
        ],
        motionGraphics: [
            { id: '05', title: 'Motion Graphics Short 1', type: 'Motion', videoId: 'ORbp7xWkFtY', tag: 'Visual FX', date: '2025', isVertical: true },
            { id: '06', title: 'Motion Graphics Short 2', type: 'Motion', videoId: '9VNqKz8nhq4', tag: 'Kinetic Type', date: '2025', isVertical: true },
            { id: '07', title: 'Motion Graphics Short 3', type: 'Motion', videoId: '2VFJNTEjmTQ', tag: '3D Space', date: '2024', isVertical: true }
        ],
        youtube: [
            { id: '08', title: 'Long form Storytelling', type: 'Docu-Style', videoId: 'jFvz7VQbN2g', tag: 'YouTube Main', isWide: true, date: '2025', isVertical: false },
            { id: '09', title: 'Music Video Edit', type: 'Music Video', videoId: 'LYhWxt61a_I', tag: 'Beat Sync', isWide: true, date: '2024', isVertical: false }
        ],
        saasAnimation: [
            { id: '10', title: 'SaaS Product Animation', type: 'Product Motion', videoId: 'h8LH8smtVwU', tag: 'UI Explainer', isWide: true, date: '2025', isVertical: false }
        ]
    };

    // All 7 Vertical projects (4 fast-paced + 3 motion graphics)
    const allVerticalProjects = [
        ...portfolioItems.fastPaced.map(p => ({ ...p, category: 'fastPaced', categoryLabel: 'Fast Paced' })),
        ...portfolioItems.motionGraphics.map(p => ({ ...p, category: 'motionGraphics', categoryLabel: 'Motion Graphics' }))
    ];

    // All 3 Horizontal projects (2 youtube + 1 saas animation)
    const allHorizontalProjects = [
        ...portfolioItems.youtube.map(p => ({ ...p, category: 'youtube', categoryLabel: 'YouTube Uploads' })),
        ...portfolioItems.saasAnimation.map(p => ({ ...p, category: 'saasAnimation', categoryLabel: 'SaaS Animation' }))
    ];

    const fastPacedProjects = portfolioItems.fastPaced.map(p => ({
        ...p,
        category: 'fastPaced',
        categoryLabel: 'Fast Paced'
    }));

    const motionGraphicsProjects = portfolioItems.motionGraphics.map(p => ({
        ...p,
        category: 'motionGraphics',
        categoryLabel: 'Motion Graphics'
    }));

    const youtubeProjects = portfolioItems.youtube.map(p => ({
        ...p,
        category: 'youtube',
        categoryLabel: 'YouTube Uploads'
    }));

    const saasAnimationProjects = portfolioItems.saasAnimation.map(p => ({
        ...p,
        category: 'saasAnimation',
        categoryLabel: 'SaaS Animation'
    }));

    const filterCategories = [
        { id: 'all', label: 'ALL FILES', count: 10 },
        { id: 'fastPaced', label: 'FAST PACED EDITS', count: 4 },
        { id: 'motionGraphics', label: 'MOTION GRAPHICS', count: 3 },
        { id: 'youtube', label: 'YOUTUBE UPLOADS', count: 2 },
        { id: 'saasAnimation', label: 'SAAS ANIMATION', count: 1 },
    ];

    return (
        <div className="min-h-screen bg-graph-grid text-[#F4F4F6] font-sans selection:bg-red-500 selection:text-white relative overflow-x-hidden">

            {/* =========================================================================
               MINIMAL EDITORIAL TOP NAVIGATION (Dark Translucent Bar)
               ========================================================================= */}
            <header className="sticky top-0 z-50 px-4 sm:px-8 py-3.5 backdrop-blur-md bg-[#0E0F12]/85 border-b border-zinc-800/80">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    
                    {/* Left: Brand / Initials */}
                    <button 
                        onClick={() => scrollToSection('home')}
                        className="group flex items-center gap-2.5 text-left cursor-pointer"
                        aria-label="Back to top"
                    >
                        <span className="w-8 h-8 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center font-bold text-xs text-white group-hover:bg-red-500 group-hover:border-red-500 transition-colors">
                            PD
                        </span>
                        <span className="font-display font-black text-sm tracking-tight text-white uppercase hidden sm:inline">
                            PRIYANSHU DANDAPATH
                        </span>
                    </button>

                    {/* Center: Clean Navigation */}
                    <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
                        {[
                            { id: 'home', label: 'HOME' },
                            { id: 'about', label: 'ABOUT' },
                            { id: 'services', label: 'SERVICES' },
                            { id: 'work', label: 'WORK' },
                            { id: 'contact', label: 'CONTACT' },
                        ].map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-xs font-bold tracking-widest uppercase transition-all duration-150 cursor-pointer relative py-1 active:scale-95 ${
                                        isActive 
                                            ? 'text-white font-black' 
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right: Action & Hamburger */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 active:bg-red-700 text-white text-xs font-bold tracking-wider uppercase border border-red-500 transition-all cursor-pointer shadow-md"
                        >
                            COLLABORATE
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:text-white active:scale-90 transition-transform cursor-pointer"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-3 p-4 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl space-y-2">
                        {[
                            { id: 'home', label: 'HOME' },
                            { id: 'about', label: 'ABOUT' },
                            { id: 'services', label: 'SERVICES' },
                            { id: 'work', label: 'SELECTED WORK' },
                            { id: 'contact', label: 'CONTACT' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-bold tracking-wider uppercase active:scale-98 transition-transform cursor-pointer ${
                                    activeSection === item.id ? 'bg-red-950/80 text-red-400 border border-red-800/60' : 'text-zinc-300'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <main>
                {/* =========================================================================
                   HERO SECTION (Scaled Up Title with Entire Face and Chin Fully Visible)
                   Annotation arrow and label removed as requested.
                   ========================================================================= */}
                <section id="home" className="relative pt-6 sm:pt-8 pb-10 sm:pb-14 px-4 sm:px-6 max-w-6xl mx-auto">
                    
                    {/* Top Tracking Header Labels (VIDEO EDITOR / MOTION DESIGNER ... PORTFOLIO 2026) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-display font-black tracking-widest uppercase text-zinc-200 border-b border-zinc-800 pb-3 mb-6 sm:mb-8 animate-reveal-up">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                            <span>VIDEO EDITOR / MOTION DESIGNER</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                            <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-[11px] font-mono font-bold text-zinc-300 border border-zinc-700">
                                PORTFOLIO
                            </span>
                            <span className="font-mono font-bold">2026</span>
                        </div>
                    </div>

                    {/* MAIN HERO TITLE AREA: Deliberate Subdued Paper Panel with Uncropped Chin */}
                    <div className="relative flex flex-col items-center justify-center my-3 sm:my-6">
                        
                        <div className="relative w-full max-w-5xl lg:max-w-6xl mx-auto rounded-3xl bg-subdued-paper border-2 border-zinc-700/60 p-6 sm:p-10 md:p-12 shadow-2xl overflow-visible select-none animate-reveal-up">
                            
                            {/* The PORTFOLIO Graphic with Entire Face and Chin Fully Visible */}
                            <div className="relative w-full overflow-visible">
                                <img 
                                    src={PortfolioBanner} 
                                    alt="PORTFOLIO - Priyanshu Dandapath" 
                                    className="w-full h-auto object-contain select-none mx-auto block overflow-visible"
                                />
                            </div>

                            {/* Cluster of Monochrome Marks below the hero (✦ ★ ♣) */}
                            <div className="flex items-center justify-center gap-5 mt-6 sm:mt-8 text-zinc-950 select-none" aria-hidden="true">
                                <GlyphStar className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
                                <GlyphSparkle className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
                                <GlyphClover className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* =========================================================================
                   ABOUT SECTION: COMPACT BENTO GRID (5 Distinct Cards with Aligned Edges)
                   1. 3D Character Card
                   2. Intro & Biography Card
                   3. Track Record / Statistics Card
                   4. Skills Card
                   5. Experience Timeline Card
                   ========================================================================= */}
                <section id="about" className="relative py-12 sm:py-18 px-4 sm:px-6 max-w-6xl mx-auto">
                    
                    {/* Section Label */}
                    <div className="flex items-center gap-2 mb-6 sm:mb-8">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <h2 className="font-display font-black text-xs sm:text-sm tracking-widest uppercase text-zinc-300">
                            ABOUT // IDENTITY & TRACK RECORD
                        </h2>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                        
                        {/* BENTO CARD 1: CHARACTER VIDEO CARD (Tall Outlined Glass Card) */}
                        <div className="col-span-12 md:col-span-5 lg:col-span-4 rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-4 sm:p-5 flex flex-col justify-between items-center overflow-hidden">
                            <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-400 mb-2 pb-2 border-b border-zinc-800">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="font-bold text-zinc-200">3D AVATAR</span>
                                </span>
                                <span className="text-[11px] text-zinc-400 font-semibold">ALPHA_LOOP</span>
                            </div>
                            
                            <div className="w-full flex-1 flex items-center justify-center my-2 min-h-[360px] sm:min-h-[420px]">
                                <AlphaVideoFrame posterImage="/images/3d-figure-poster.png" />
                            </div>

                            <div className="w-full text-center pt-2.5 border-t border-zinc-800">
                                <span className="text-[11px] font-mono text-zinc-400 font-semibold tracking-wider uppercase">
                                    3D_FIGURE • INTERACTIVE MODEL
                                </span>
                            </div>
                        </div>

                        {/* BENTO CARD 2: INTRODUCTION & BIOGRAPHY CARD (Roomy & High Legibility) */}
                        <div className="col-span-12 md:col-span-7 lg:col-span-8 rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2.5 border-b border-zinc-800">
                                    <span className="text-red-400 font-bold tracking-wider">// INTRODUCTION</span>
                                    <span className="text-zinc-400">BASED IN INDIA • REMOTE WORLDWIDE</span>
                                </div>

                                <h3 className="font-editorial font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                                    HELLO
                                </h3>
                                <p className="font-display font-bold text-lg sm:text-xl text-red-500 tracking-wide mt-2 mb-5">
                                    Hi, I'm Priyanshu Dandapath.
                                </p>

                                <div className="space-y-4 text-base sm:text-[17px] md:text-[18px] text-zinc-200 font-normal leading-relaxed">
                                    <p>
                                        Creating edits has never felt like a job to me; it's how I process stories, rhythm, and retention.
                                    </p>
                                    <p>
                                        I've spent the past 4 years turning raw, unpolished footage into high-retention content that captivates audiences. From fast-paced gym edits to docu-style YouTube storytelling, every cut is calculated.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono text-zinc-400">
                                <span>📍 Howrah, Bagnan (India)</span>
                                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Available worldwide for remote work</span>
                                </span>
                            </div>
                        </div>

                        {/* BENTO CARD 3: TRACK RECORD / STATISTICS CARD */}
                        <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-7 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
                                <span className="text-red-400 font-bold tracking-wider">// STATS</span>
                                <span>METRICS</span>
                            </div>

                            <div className="space-y-4 my-auto">
                                <div className="flex items-baseline justify-between border-b border-zinc-800/80 pb-3">
                                    <div>
                                        <div className="font-editorial font-black text-3xl sm:text-4xl text-white tracking-tight">
                                            4+
                                        </div>
                                        <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mt-0.5">
                                            Years Experience
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-400 font-semibold">2022 – NOW</span>
                                </div>

                                <div className="flex items-baseline justify-between border-b border-zinc-800/80 pb-3">
                                    <div>
                                        <div className="font-editorial font-black text-3xl sm:text-4xl text-white tracking-tight">
                                            150+
                                        </div>
                                        <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mt-0.5">
                                            Delivered Edits
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-400 font-semibold">Fitness • YT</span>
                                </div>

                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <div className="font-editorial font-black text-3xl sm:text-4xl text-white tracking-tight">
                                            100%
                                        </div>
                                        <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider mt-0.5">
                                            Remote Delivery
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-400 font-semibold">Worldwide</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
                                PROVEN AUDIENCE RETENTION FOCUS
                            </div>
                        </div>

                        {/* BENTO CARD 4: SKILLS CARD (Full Names, No Ellipses) */}
                        <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-7 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
                                <span className="text-red-400 font-bold tracking-wider">// TOOLKIT</span>
                                <span>SOFTWARE</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 my-auto">
                                {softwareSkills.map((soft) => (
                                    <div 
                                        key={soft.name}
                                        className="p-3 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 flex items-center gap-3 hover:border-red-500/80 transition-colors group"
                                        title={soft.desc}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-zinc-900 p-1.5 flex items-center justify-center shrink-0 border border-zinc-700 group-hover:scale-105 transition-transform">
                                            <img 
                                                src={soft.icon} 
                                                alt={soft.name} 
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="font-display font-bold text-xs sm:text-[13px] text-white block leading-tight whitespace-normal">
                                                {soft.name}
                                            </span>
                                            <span className="text-[10px] sm:text-[11px] text-red-400 block font-mono font-semibold mt-0.5">
                                                {soft.code}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
                                INDUSTRY STANDARD POST-PRODUCTION
                            </div>
                        </div>

                        {/* BENTO CARD 5: SERVICES // CREATIVE SUITE CARD */}
                        <div id="services" className="col-span-12 lg:col-span-4 rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-7 flex flex-col justify-between card-hover-lift">
                            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
                                <span className="text-red-400 font-bold tracking-wider">// SERVICES</span>
                                <span className="text-zinc-400">CREATIVE ARSENAL</span>
                            </div>

                            <div className="space-y-3.5 my-auto">
                                {creativeServices.map((srv, idx) => (
                                    <div key={idx} className="group border-b border-zinc-800/80 pb-2.5 last:border-b-0 hover:border-zinc-700 transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-display font-bold text-white text-xs sm:text-[13px] group-hover:text-red-400 transition-colors leading-tight">
                                                {srv.title}
                                            </span>
                                            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono font-bold text-red-400 border border-zinc-700 shrink-0 ml-2">
                                                {srv.tag}
                                            </span>
                                        </div>
                                        <p className="text-zinc-300 text-xs leading-relaxed font-normal">
                                            {srv.desc}
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                            <span>{srv.metrics}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-300 text-center flex items-center justify-center gap-2">
                                <span className="text-red-500">⚡</span>
                                <span className="font-bold tracking-wider">24–48HR RAPID TURNAROUND • 4K ULTRA-HD</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* =========================================================================
                   CENTRAL TORN-PAPER BANNER (New Banner My photoo.mov with Prominent Portrait)
                   ========================================================================= */}
                <CentralTornBanner fallbackPoster="/images/banner-poster.png" />

                {/* =========================================================================
                   WORK SECTION (Fluid 93vw Wide Container up to 1,920px: 4 Vertical in Row 1, 2 Horizontal in Row 2)
                   Improved Hierarchy, Enhanced Category Filter Buttons & Seamless Responsive Rows
                   ========================================================================= */}
                <section id="work" className="relative pt-10 sm:pt-14 pb-16 sm:pb-24 w-[93vw] max-w-[1920px] mx-auto px-2 sm:px-4 md:px-6">
                    
                    {/* Section Header with Strengthened Hierarchy */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center gap-2.5 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-800/60 mb-3">
                            <GlyphStar className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-xs font-mono font-bold tracking-widest uppercase text-red-300">
                                SELECTED ARCHIVE
                            </span>
                            <GlyphStar className="w-3.5 h-3.5 text-red-500" />
                        </div>
                        <h2 className="font-editorial font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight">
                            THE WORK
                        </h2>
                        <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-2 max-w-md mx-auto">
                            HIGH-RETENTION SHORTS & DOCU-STYLE STORYTELLING
                        </p>
                    </div>

                    {/* Category Filter Pills (Restyled with Comfortable Tap Targets, High Contrast & Focus States) */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-12">
                        {filterCategories.map((cat) => {
                            const isSelected = activeWorkCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveWorkCategory(cat.id)}
                                    className={`min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full font-mono text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                                        isSelected 
                                            ? 'bg-red-600 text-white border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-[1.02]' 
                                            : 'bg-zinc-900/90 text-zinc-300 border-2 border-zinc-700/70 hover:border-zinc-500 hover:text-white hover:bg-zinc-800/90 hover:scale-[1.01]'
                                    }`}
                                    aria-pressed={isSelected}
                                >
                                    {isSelected && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-red-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* -------------------------------------------------------------------------
                        WORK CONTENT ACCORDING TO SELECTED CATEGORY
                        ------------------------------------------------------------------------- */}

                    {/* SHOW ALL FILES: ROW 1 (All 7 Vertical Videos) + ROW 2 (All 3 Horizontal Videos) */}
                    {activeWorkCategory === 'all' && (
                        <div className="space-y-12 sm:space-y-16">
                            
                            {/* ROW 1: ALL SEVEN VERTICAL VIDEOS (9:16 Portrait) */}
                            <div>
                                <div className="flex items-center justify-between mb-5 border-b border-zinc-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                                        <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                            01 // VERTICAL VIDEOS & SHORTS (9:16) — ALL 7 FILES
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                                        4 FAST PACED EDITS + 3 MOTION GRAPHICS SHORTS
                                    </span>
                                </div>

                                {/* Responsive Grid Displaying All 7 Vertical Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {allVerticalProjects.map((project) => (
                                        <div key={project.id} className="w-full">
                                            <ProjectCardVertical
                                                project={project}
                                                isPlaying={playingVideoId === project.id}
                                                onPlay={() => setPlayingVideoId(project.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ROW 2: ALL THREE HORIZONTAL VIDEOS (16:9 Landscape) */}
                            <div>
                                <div className="flex items-center justify-between mb-5 border-b border-zinc-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                                        <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                            02 // HORIZONTAL VIDEOS & STORYTELLING (16:9) — ALL 3 FILES
                                        </h3>
                                    </div>
                                    <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                                        2 YOUTUBE LONG-FORM + 1 SAAS PRODUCT ANIMATION
                                    </span>
                                </div>

                                {/* Responsive Grid Displaying All 3 Horizontal Cards Side by Side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {allHorizontalProjects.map((project) => (
                                        <ProjectCardHorizontal
                                            key={project.id}
                                            project={project}
                                            isPlaying={playingVideoId === project.id}
                                            onPlay={() => setPlayingVideoId(project.id)}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* CATEGORY: FAST PACED EDITS (4 Vertical Videos) */}
                    {activeWorkCategory === 'fastPaced' && (
                        <div>
                            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                        FAST PACED EDITS (9:16)
                                    </h3>
                                </div>
                            </div>
                            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible">
                                {fastPacedProjects.map((project) => (
                                    <div key={project.id} className="shrink-0 w-[270px] xs:w-[290px] snap-center sm:w-auto">
                                        <ProjectCardVertical
                                            project={project}
                                            isPlaying={playingVideoId === project.id}
                                            onPlay={() => setPlayingVideoId(project.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CATEGORY: MOTION GRAPHICS (Vertical Videos) */}
                    {activeWorkCategory === 'motionGraphics' && (
                        <div>
                            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                        MOTION GRAPHICS SHORTS (9:16)
                                    </h3>
                                </div>
                            </div>
                            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
                                {motionGraphicsProjects.map((project) => (
                                    <div key={project.id} className="shrink-0 w-[270px] xs:w-[290px] snap-center sm:w-auto">
                                        <ProjectCardVertical
                                            project={project}
                                            isPlaying={playingVideoId === project.id}
                                            onPlay={() => setPlayingVideoId(project.id)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CATEGORY: YOUTUBE UPLOADS (2 Horizontal Videos) */}
                    {activeWorkCategory === 'youtube' && (
                        <div>
                            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                        YOUTUBE UPLOADS (16:9)
                                    </h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {youtubeProjects.map((project) => (
                                    <ProjectCardHorizontal
                                        key={project.id}
                                        project={project}
                                        isPlaying={playingVideoId === project.id}
                                        onPlay={() => setPlayingVideoId(project.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CATEGORY: SAAS ANIMATION (Horizontal Videos) */}
                    {activeWorkCategory === 'saasAnimation' && (
                        <div>
                            <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                                    <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                                        SAAS ANIMATION (16:9)
                                    </h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                {saasAnimationProjects.map((project) => (
                                    <ProjectCardHorizontal
                                        key={project.id}
                                        project={project}
                                        isPlaying={playingVideoId === project.id}
                                        onPlay={() => setPlayingVideoId(project.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                </section>

                {/* =========================================================================
                   COLLABORATION & CONTACT SECTION (Dark Translucent Card)
                   ========================================================================= */}
                <section id="contact" className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
                    
                    <div className="rounded-3xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-md shadow-2xl p-6 sm:p-10 md:p-12 relative overflow-hidden">
                        
                        {/* Red Corner Accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 transform rotate-45 translate-x-8 -translate-y-8" aria-hidden="true" />

                        <div className="text-center max-w-xl mx-auto mb-10">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800/60 text-xs font-bold tracking-wider uppercase mb-3">
                                <span>✉</span> LET'S COLLABORATE
                            </div>
                            <h2 className="font-editorial font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                                Have an edit in mind? Let's make it happen.
                            </h2>
                            <p className="font-medium text-zinc-300 text-sm sm:text-base mt-3">
                                Currently open to agency retainers, high-retention creator contracts, and motion graphics campaigns.
                            </p>
                        </div>

                        {/* Contact Action Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            
                            {/* Email Card with 1-Click Copy */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-between group hover:border-red-500/80 active:scale-[0.98] transition-all">
                                <a 
                                    href="mailto:artpriyans@gmail.com" 
                                    className="flex items-center gap-3 min-w-0"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 active:scale-95 transition-transform">
                                        <Mail size={18} />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">EMAIL</span>
                                        <span className="font-display font-bold text-sm text-white truncate block">artpriyans@gmail.com</span>
                                    </div>
                                </a>
                                <button
                                    onClick={handleCopyEmail}
                                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700/60 active:scale-90 transition-all ml-2 cursor-pointer"
                                    aria-label="Copy email address"
                                    title="Copy email"
                                >
                                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                </button>
                            </div>

                            {/* Phone Card */}
                            <a 
                                href="tel:+916289392176" 
                                className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-3 group hover:border-red-500/80 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 group-hover:bg-red-600 active:scale-95 transition-all">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">PHONE / WHATSAPP</span>
                                    <span className="font-display font-bold text-sm text-white block">+91 6289392176</span>
                                </div>
                            </a>

                            {/* Instagram Card */}
                            <a 
                                href="https://www.instagram.com/priyansart/" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-between group hover:border-red-500/80 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 group-hover:bg-pink-600 active:scale-95 transition-all">
                                        <Instagram size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">INSTAGRAM</span>
                                        <span className="font-display font-bold text-sm text-white block">@priyansart</span>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white transition-transform" />
                            </a>

                            {/* LinkedIn Card */}
                            <a 
                                href="https://www.linkedin.com/in/priyanshu-dandapath-a99773300/" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-between group hover:border-red-500/80 active:scale-[0.98] transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 group-hover:bg-blue-600 active:scale-95 transition-all">
                                        <Linkedin size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase block">LINKEDIN</span>
                                        <span className="font-display font-bold text-sm text-white block">Priyanshu Dandapath</span>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white transition-transform" />
                            </a>

                        </div>

                        {/* Location Footnote */}
                        <div className="mt-8 text-center pt-6 border-t border-zinc-800">
                            <span className="font-mono text-xs text-zinc-400">
                                BASED IN HOWRAH, BAGNAN (INDIA) • AVAILABLE WORLDWIDE • UTC +5:30
                            </span>
                        </div>

                    </div>
                </section>
            </main>

            {/* =========================================================================
               MINIMAL EDITORIAL FOOTER (Dark Theme)
               ========================================================================= */}
            <footer className="py-8 px-4 text-center border-t border-zinc-800/80 bg-[#0A0B0E]">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                    <div>
                        © {new Date().getFullYear()} PRIYANSHU DANDAPATH • ALL RIGHTS RESERVED
                    </div>

                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="hover:text-white font-bold cursor-pointer active:scale-95 transition-all"
                    >
                        BACK TO TOP ↑
                    </button>
                </div>
            </footer>

        </div>
    );
};

export default Portfolio;