import React, { useState, useEffect } from 'react';
import { Play, Instagram, Linkedin, Mail, Phone, ExternalLink, Scissors, Film, MonitorPlay, Sparkles, ChevronDown, Folder, Maximize2, Minus, X } from 'lucide-react';
import PremierePro from '../image/PrimerPro.png';
import AfterEffects from '../image/AfterEffcts.png';
import DaVinciResolve from '../image/Davinchi Resolve.png';
import Photoshop from '../image/PhotoShop.png';
import ProfileVideo from '../public/Final 001.webm';
import ProfilePic from '../image/profile.jpg';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [scrolled, setScrolled] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        // Clock timer
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    const software = [
        { name: 'Premiere Pro', image: PremierePro },
        { name: 'After Effects', image: AfterEffects },
        { name: 'DaVinci Resolve', image: DaVinciResolve },
        { name: 'Photoshop', image: Photoshop }
    ];

    const experience = [
        {
            year: '2022',
            title: 'The Beginning',
            desc: 'Started my video editing journey working on personal passion projects, learning the fundamentals of rhythm and cut.',
            type: 'Personal'
        },
        {
            year: '2023',
            title: 'Agency Internship & Freelance',
            desc: 'Landed my first internship at a media agency. Balanced agency work with freelance gigs to expand my portfolio.',
            type: 'Internship'
        },
        {
            year: '2024',
            title: 'Niche Specialization',
            desc: 'Second internship focusing on the Gym/Fitness niche. My dedication paid off—promoted to full-time after just 3 months.',
            type: 'Full-time'
        },
        {
            year: '2025',
            title: 'Current Status',
            desc: 'Continuing full-time agency work while pushing boundaries with high-end freelance clients and personal creative works.',
            type: 'Professional'
        }
    ];

    const portfolioItems = {
        fastPaced: [1, 2, 3, 4],
        motionGraphics: [1, 2, 3, 4],
        aiReels: [1, 2, 3, 4],
        youtube: [
            { title: 'Documentary Edit', type: 'doc' },
            { title: 'Music Video Edit', type: 'music' }
        ]
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Reusable Window Component
    const WindowCard = ({ title, children, className = "" }) => (
        <div className={`relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/60 backdrop-blur-xl ${className}`}>
            {/* Window Title Bar */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80 border border-yellow-500/30"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/30"></div>
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</div>
                <div className="w-10"></div> {/* Spacer for alignment */}
            </div>
            {/* Window Content */}
            <div className="p-6 md:p-8">
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white overflow-x-hidden transition-colors duration-1000">

            {/* Import Script Font */}
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
          .font-signature { font-family: 'Dancing Script', cursive; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}
            </style>

            {/* --- Animated Background Elements --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Dark Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-fast"></div>

                {/* Floating Gradient Orbs (Darker/More Vibrant) */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-float animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-pink-600/20 rounded-full blur-[100px] animate-float animation-delay-4000"></div>
            </div>

            {/* --- Taskbar / Navigation --- */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90vw]">
                <div className="flex flex-col md:flex-row items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300 ring-1 ring-white/5">
                    {['About', 'Experience', 'Work', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="px-2 md:px-4 py-1 md:py-2 rounded-xl text-xs md:text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-95 w-full md:w-auto text-center"
                        >
                            {item}
                        </button>
                    ))}
                    <div className="w-full md:w-px h-px md:h-6 bg-white/10 mx-0 md:mx-2 my-1 md:my-0"></div>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="px-2 md:px-4 py-1 md:py-2 rounded-xl bg-purple-600 text-white font-bold text-xs md:text-sm shadow-lg hover:bg-purple-500 transition-all active:scale-95 w-full md:w-auto"
                    >
                        Hire Me
                    </button>
                </div>
            </nav>

            {/* --- Top Bar (OS Style) --- */}
            <div className="fixed top-0 w-full z-40 px-6 py-2 flex justify-between items-center text-xs font-medium text-slate-400 bg-slate-900/30 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-200"> PriyansArt OS</span>
                    <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">File</span>
                    <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">Edit</span>
                    <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">View</span>
                    <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">Window</span>
                    <span className="hidden md:inline hover:text-white cursor-pointer transition-colors">Help</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="uppercase text-green-400">Bat 100%</span>
                    <span className="text-slate-200">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* --- Hero Section --- */}
            <header className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-32">

                <WindowCard title="System_Profile.exe" className="max-w-4xl w-full text-center bg-slate-900/40 border-white/10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-bold tracking-wide uppercase mb-8 shadow-sm">
                        <Sparkles size={14} />
                        Professional Video Editor v4.0
                    </div>

                    <div className="mb-6 flex justify-center">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-56 md:h-96 w-auto object-contain"
                            style={{ mixBlendMode: 'screen' }}
                        >
                            <source src={ProfileVideo} type="video/webm" />
                        </video>
                    </div>

                    <p className="max-w-xl mx-auto text-slate-400 mb-10 text-xl leading-relaxed font-medium">
                        Visual Storyteller & Motion Designer. <br />
                        <span className="text-sm opacity-60">Located in Howrah, Bagnan</span>
                    </p>

                    {/* Software Dock */}
                    <div className="inline-flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/5 shadow-inner backdrop-blur-sm">
                        {software.map((soft) => (
                            <div key={soft.name} className="group relative flex flex-col items-center">
                                <div className="w-16 h-16 rounded-xl bg-slate-800/50 shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 cursor-pointer border border-white/5 p-2">
                                    <img
                                        src={soft.image}
                                        alt={soft.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-black text-white px-2 py-1 rounded-md border border-white/10">
                                    {soft.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </WindowCard>

                <div className="absolute bottom-24 animate-bounce text-slate-600">
                    <ChevronDown size={24} />
                </div>
            </header>

            {/* --- About Section --- */}
            <section id="about" className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 items-start">

                    {/* Image Window */}
                    <WindowCard title="Profile_Pic.jpg" className="overflow-hidden">
                        <img
                            src={ProfilePic}
                            alt="Priyanshu Dandapath - Profile"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </WindowCard>

                    {/* Text Window */}
                    <WindowCard title="About_Me.txt">
                        <h2 className="text-3xl font-bold mb-6 text-white">
                            Hello, World! 👋
                        </h2>
                        <div className="space-y-4 text-slate-300 font-medium leading-relaxed">
                            <p>
                                My name is <span className="text-purple-300 font-bold bg-purple-500/10 px-1 rounded border border-purple-500/20">Priyanshu Dandapath</span>. I have a 4-year track record of turning boring footage into retention-grabbing content.
                            </p>
                            <p>
                                "Transforming raw footage into compelling stories is more than just a job for me—it's a rhythm I live by. Every cut, every transition is a heartbeat in the narrative I craft."
                            </p>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/20">
                                    <div className="text-xs text-yellow-400 font-bold uppercase mb-1">Experience</div>
                                    <div className="text-xl font-bold text-white">4 Years</div>
                                </div>
                                <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-500/20">
                                    <div className="text-xs text-purple-400 font-bold uppercase mb-1">Projects</div>
                                    <div className="text-xl font-bold text-white">150+</div>
                                </div>
                            </div>
                        </div>
                    </WindowCard>

                </div>
            </section>

            {/* --- Experience Section --- */}
            <section id="experience" className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
                <WindowCard title="Career_Timeline.pdf">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">Experience Log</h2>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full"></div>

                        <div className="space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-900 border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20 mt-6"></div>

                                    {/* Content Card */}
                                    <div className="ml-12 md:ml-0 md:w-1/2">
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
                                                    {exp.year}
                                                </span>
                                                <span className="text-xs font-bold text-slate-500 uppercase">{exp.type}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                                            <p className="text-slate-400 text-sm">{exp.desc}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </WindowCard>
            </section>

            {/* --- Work Showcase Section (Folder Style) --- */}
            <section id="work" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-black mb-10 text-center text-white drop-shadow-sm">
                    Project <span className="text-purple-500">Files</span>
                </h2>

                {/* --- Fast Paced Folder --- */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4 pl-2">
                        <Folder className="text-yellow-500 fill-yellow-500/20" size={28} />
                        <h3 className="text-2xl font-bold text-slate-200">Fast_Paced_Edits</h3>
                    </div>
                    <WindowCard title="Viewer">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {portfolioItems.fastPaced.map((item) => (
                                <div key={item} className="aspect-[9/16] rounded-lg bg-black relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all hover:-translate-y-1 border border-white/5">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" fill="white" />
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
                                        <p className="text-white text-xs font-mono">Reel_{item}.mp4</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </WindowCard>
                </div>

                {/* --- Motion Graphics Folder --- */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4 pl-2">
                        <Folder className="text-purple-500 fill-purple-500/20" size={28} />
                        <h3 className="text-2xl font-bold text-slate-200">Motion_Graphics</h3>
                    </div>
                    <WindowCard title="After_Effects_Renders">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {portfolioItems.motionGraphics.map((item) => (
                                <div key={item} className="aspect-[9/16] rounded-lg bg-slate-900 relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-1 border border-purple-500/20">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-12 h-12 text-yellow-400 opacity-80 group-hover:scale-110 transition-transform" fill="currentColor" />
                                    </div>
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-400 text-black text-[10px] font-bold rounded">AE</div>
                                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
                                        <p className="text-white text-xs font-mono">MG_{item}.mov</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </WindowCard>
                </div>

                {/* --- AI Folder --- */}
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4 pl-2">
                        <Folder className="text-blue-500 fill-blue-500/20" size={28} />
                        <h3 className="text-2xl font-bold text-slate-200">Generative_AI</h3>
                    </div>
                    <WindowCard title="Gen_AI_Output">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {portfolioItems.aiReels.map((item) => (
                                <div key={item} className="aspect-[9/16] rounded-lg bg-gradient-to-br from-indigo-950 to-purple-950 relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all hover:-translate-y-1 border border-white/5">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Sparkles className="w-12 h-12 text-white opacity-80 group-hover:rotate-12 transition-transform" />
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black to-transparent">
                                        <p className="text-white text-xs font-mono">AI_Gen_{item}.mp4</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </WindowCard>
                </div>

                {/* --- YouTube Folder --- */}
                <div>
                    <div className="flex items-center gap-2 mb-4 pl-2">
                        <Folder className="text-red-500 fill-red-500/20" size={28} />
                        <h3 className="text-2xl font-bold text-slate-200">YouTube_Uploads</h3>
                    </div>
                    <WindowCard title="Web_Browser">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {portfolioItems.youtube.map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="aspect-video rounded-lg bg-slate-800 border border-white/10 overflow-hidden relative mb-4 shadow-inner flex items-center justify-center">
                                        <MonitorPlay size={48} className="text-slate-600 mb-2" />
                                        <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{item.title}</h4>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{item.type}</p>
                                </div>
                            ))}
                        </div>
                    </WindowCard>
                </div>

            </section>

            {/* --- Get In Touch Section --- */}
            <section id="contact" className="relative z-10 py-24 px-6">
                <WindowCard title="Compose_Mail.exe" className="max-w-4xl mx-auto bg-slate-900/80 border-white/10">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
                            Let's <span className="text-purple-500">Collaborate!</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Have a project in mind? Let's make it happen.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <a href="tel:+916289392176" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 shadow-sm hover:shadow-green-500/20 hover:border-green-500/30 transition-all group">
                                <div className="p-3 rounded-full bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase">Phone</div>
                                    <div className="text-white font-bold">+91 6289392176</div>
                                </div>
                            </a>

                            <a href="mailto:artpriyans@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 shadow-sm hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all group">
                                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-500 uppercase">Email</div>
                                    <div className="text-white font-bold">artpriyans@gmail.com</div>
                                </div>
                            </a>
                        </div>

                        <div className="space-y-4">
                            <a href="https://www.instagram.com/priyansart/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 shadow-sm hover:shadow-pink-500/20 hover:border-pink-500/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform">
                                        <Instagram size={20} />
                                    </div>
                                    <span className="font-bold text-white">Instagram</span>
                                </div>
                                <ExternalLink size={16} className="text-slate-500 group-hover:text-purple-400" />
                            </a>

                            <a href="https://www.linkedin.com/in/priyanshu-dandapath-a99773300/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 shadow-sm hover:shadow-blue-700/20 hover:border-blue-700/30 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-blue-700/20 text-blue-400 group-hover:scale-110 transition-transform">
                                        <Linkedin size={20} />
                                    </div>
                                    <span className="font-bold text-white">LinkedIn</span>
                                </div>
                                <ExternalLink size={16} className="text-slate-500 group-hover:text-purple-400" />
                            </a>
                        </div>
                    </div>
                </WindowCard>
            </section>

            <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10 bg-slate-900/50 backdrop-blur-md mb-20">
                <p>&copy; {new Date().getFullYear()} by Rajath Hegde . System Status: Online.</p>
            </footer>

            {/* Styles */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        .animate-grid-fast {
          animation: grid-move 1.5s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Portfolio;
