import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import { MdArrowBack, MdMailOutline } from "react-icons/md";
import "./MyWorks.css";

type FilterTab =
  | "ALL"
  | "SHORT FORM"
  | "LONG FORM"
  | "fast-paced"
  | "talking-head"
  | "podcast-highlights"
  | "case-studies"
  | "music-videos"
  | "podcast"
  | "saas";

interface FilterOption {
  key: FilterTab;
  label: string;
  count: number;
}

const categoryDescriptions: Record<
  string,
  { title: string; subtitle: string; desc: string }
> = {
  "fast-paced": {
    title: "Fast-Paced Edits",
    subtitle: "High-Retention Visual Engineering",
    desc: "Rhythm-matched kinetic cuts, rapid velocity shifts, and pattern interrupts engineered to maximize viewer retention and stop the scroll instantly.",
  },
  "talking-head": {
    title: "Talking Head Edits",
    subtitle: "Kinetic Typography & Creator Storytelling",
    desc: "High-converting creator and thought-leader storytelling powered by kinetic typography, animated graphic callouts, and seamless B-roll flow.",
  },
  "podcast-highlights": {
    title: "Podcast Highlights",
    subtitle: "Multi-Cam Dialogue Clips & Viral Hooks",
    desc: "Multi-camera dialogue clips with dynamic speaker switching, audio-reactive subtitles, and punchy hook structures for viral discovery.",
  },
  "case-studies": {
    title: "Case Studies & Breakdowns",
    subtitle: "Narrative Documentary & Deep Dives",
    desc: "In-depth documentary-style breakdowns, client case studies, and cinematic video essays with structured narrative arcs and custom sound design.",
  },
  "music-videos": {
    title: "Music Video Edits",
    subtitle: "Stylized Rhythm & Creative VFX",
    desc: "Stylized, beat-driven music video edits featuring dynamic color grading, speed ramping, and experimental visual effects tailored to musical cadence.",
  },
  "podcast": {
    title: "Full Podcast Production",
    subtitle: "Multi-Camera Mastery & Audio Balancing",
    desc: "Full-length multi-camera podcast mastering with seamless multi-angle switching, broadcast audio leveling, and brand-consistent lower thirds.",
  },
  "saas": {
    title: "SaaS Product Motion",
    subtitle: "UI Choreography & Explainer Motion",
    desc: "Product demo and UI motion choreography illustrating complex software workflows with crisp 60fps animations and kinetic camera moves.",
  },
};

const MyWorks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [modalVideo, setModalVideo] = useState<{
    isOpen: boolean;
    videoId: string | null;
    title: string;
    category: string;
  }>({
    isOpen: false,
    videoId: null,
    title: "",
    category: "",
  });

  // Ensure body scroll is unlocked when opening this page
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    document.body.style.overflowY = "auto";
  }, []);

  const handlePlayVideo = (videoId: string, title: string, category: string) => {
    setModalVideo({
      isOpen: true,
      videoId,
      title,
      category,
    });
  };

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const allProjects = config.projects;
  const shortFormProjects = allProjects.filter((p) => p.topLevelCategory === "SHORT FORM");
  const longFormProjects = allProjects.filter((p) => p.topLevelCategory === "LONG FORM");

  // Subcategory filters
  const fastPaced = allProjects.filter((p) => p.subCategoryKey === "fast-paced");
  const talkingHead = allProjects.filter((p) => p.subCategoryKey === "talking-head");
  const podcastHighlights = allProjects.filter((p) => p.subCategoryKey === "podcast-highlights");
  const caseStudies = allProjects.filter((p) => p.subCategoryKey === "case-studies");
  const musicVideos = allProjects.filter((p) => p.subCategoryKey === "music-videos");
  const podcastEpisodes = allProjects.filter((p) => p.subCategoryKey === "podcast");
  const saasVideos = allProjects.filter((p) => p.subCategoryKey === "saas");

  // Determine visibility
  const showShortForm = activeTab === "ALL" || activeTab === "SHORT FORM";
  const showLongForm = activeTab === "ALL" || activeTab === "LONG FORM";

  // Individual subcategory filters
  const isSpecificFilter = !["ALL", "SHORT FORM", "LONG FORM"].includes(activeTab);
  const specificProjects = isSpecificFilter
    ? allProjects.filter((p) => p.subCategoryKey === activeTab)
    : [];

  const filterTabs: FilterOption[] = [
    { key: "ALL", label: "All", count: allProjects.length },
    { key: "SHORT FORM", label: "Short Form", count: shortFormProjects.length },
    { key: "LONG FORM", label: "Long Form", count: longFormProjects.length },
    { key: "fast-paced", label: "Fast-Paced", count: fastPaced.length },
    { key: "talking-head", label: "Talking Head", count: talkingHead.length },
    { key: "podcast-highlights", label: "Podcast Highlights", count: podcastHighlights.length },
    { key: "case-studies", label: "Case Studies", count: caseStudies.length },
    { key: "music-videos", label: "Music Videos", count: musicVideos.length },
    { key: "podcast", label: "Podcast", count: podcastEpisodes.length },
    { key: "saas", label: "SaaS", count: saasVideos.length },
  ];

  return (
    <div className="myworks-page">
      {/* Header Area */}
      <header className="myworks-header">
        <div className="myworks-nav-row">
          <button
            onClick={handleBackNavigation}
            className="works-back-button"
            data-cursor="disable"
            aria-label="Back to home page"
          >
            <MdArrowBack size={18} />
            <span>Back to Home</span>
          </button>
        </div>

        <span className="myworks-eyebrow">PORTFOLIO ARCHIVE</span>
        <h1 className="myworks-title">
          PriyansArt <span className="title-accent">Works</span>
        </h1>
        <p className="myworks-subtitle">
          16 Project Slots · High-Velocity Short-Form Viral Retention &amp; Cinematic Long-Form Storytelling
        </p>

        {/* Redesigned Category Filter Bar */}
        <div className="works-filter-wrapper">
          <div
            className="works-filter-scroll-track"
            role="tablist"
            aria-label="Portfolio category filters"
          >
            {filterTabs.map((filter) => {
              const isActive = activeTab === filter.key;
              return (
                <button
                  key={filter.key}
                  className={`filter-pill ${isActive ? "filter-pill-active" : ""}`}
                  onClick={() => setActiveTab(filter.key)}
                  data-cursor="disable"
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="pill-label">{filter.label}</span>
                  <span className="pill-count">{filter.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Works Content Container */}
      <main className="myworks-container">
        {/* SPECIFIC SINGLE CATEGORY FILTER VIEW */}
        {isSpecificFilter && (
          <section className="specific-category-section" aria-label={categoryDescriptions[activeTab]?.title || "Discipline Projects"}>
            <div className="category-showcase-header">
              <div className="category-meta-badge-row">
                <span className="category-discipline-badge">DISCIPLINE SHOWCASE</span>
                <span className="category-total-badge">
                  {specificProjects.length} {specificProjects.length === 1 ? "Curated Project" : "Projects"}
                </span>
              </div>
              <h2 className="category-showcase-title">
                {categoryDescriptions[activeTab]?.title || specificProjects[0]?.subCategory}
              </h2>
              {categoryDescriptions[activeTab]?.subtitle && (
                <p className="category-showcase-subtitle">
                  {categoryDescriptions[activeTab]?.subtitle}
                </p>
              )}
              {categoryDescriptions[activeTab]?.desc && (
                <p className="category-showcase-desc">
                  {categoryDescriptions[activeTab]?.desc}
                </p>
              )}
              <div className="category-header-divider" />
            </div>

            {/* Adaptive layout depending on count: Single Spotlight, 2-Grid, 3-Grid, 4-Grid */}
            {specificProjects.length === 1 ? (
              <div className="works-spotlight-wrapper">
                <VideoCard
                  project={specificProjects[0]}
                  onPlay={handlePlayVideo}
                  className="spotlight-video-card"
                />
              </div>
            ) : specificProjects.length === 2 ? (
              <div className="bento-grid-2-landscape specific-grid">
                {specificProjects.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            ) : specificProjects.length === 3 ? (
              <div
                className={`specific-grid ${
                  specificProjects[0]?.aspectRatio === "9:16"
                    ? "bento-grid-3-reels"
                    : "bento-grid-3-landscape"
                }`}
              >
                {specificProjects.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            ) : (
              <div
                className={`specific-grid ${
                  specificProjects[0]?.aspectRatio === "9:16"
                    ? "bento-grid-4-reels"
                    : "bento-grid-3-landscape"
                }`}
              >
                {specificProjects.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* SECTION A: SHORT FORM (11 PROJECTS) */}
        {!isSpecificFilter && showShortForm && (
          <section className="portfolio-division" aria-label="Section A: Short Form Reels and Shorts">
            <div className="division-header">
              <span className="division-tag">SECTION A · 11 REELS</span>
              <h2 className="division-title">
                SHORT FORM <span className="title-accent">REELS &amp; SHORTS</span>
              </h2>
              <p className="division-desc">
                9:16 vertical high-retention formats designed for YouTube Shorts, Instagram Reels, and TikTok.
              </p>
            </div>

            {/* Subcategory 1: Fast-Paced Edits (4 Reels) */}
            <div className="bento-subcategory">
              <div className="bento-sub-header">
                <h3>
                  01. Fast-Paced Edits <span className="sub-count">4 Reels</span>
                </h3>
                <span className="sub-pill">Rhythm &amp; Speed Cuts</span>
              </div>
              <div className="bento-grid-4-reels">
                {fastPaced.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </div>

            {/* Subcategory 2: Talking Head (4 Reels) */}
            <div className="bento-subcategory">
              <div className="bento-sub-header">
                <h3>
                  02. Talking Head <span className="sub-count">4 Reels</span>
                </h3>
                <span className="sub-pill">Kinetic Typography &amp; B-Roll</span>
              </div>
              <div className="bento-grid-4-reels">
                {talkingHead.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </div>

            {/* Subcategory 3: Podcast Highlights (3 Reels) */}
            <div className="bento-subcategory">
              <div className="bento-sub-header">
                <h3>
                  03. Podcast Highlights <span className="sub-count">3 Reels</span>
                </h3>
                <span className="sub-pill">Multi-Cam Dialogue Clips</span>
              </div>
              <div className="bento-grid-3-reels">
                {podcastHighlights.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION B: LONG FORM (5 PROJECTS) */}
        {!isSpecificFilter && showLongForm && (
          <section
            className="portfolio-division portfolio-division-b"
            aria-label="Section B: Long Form Cinematics and Episodes"
          >
            <div className="division-header">
              <span className="division-tag">SECTION B · 5 VIDEOS</span>
              <h2 className="division-title">
                LONG FORM <span className="title-accent">CINEMATICS &amp; EPISODES</span>
              </h2>
              <p className="division-desc">
                16:9 widescreen docu-style visual essays, music video cuts, full podcasts, and SaaS product motion.
              </p>
            </div>

            {/* Subcategory 4: Case Studies (2 Videos) */}
            <div className="bento-subcategory">
              <div className="bento-sub-header">
                <h3>
                  04. Case Studies <span className="sub-count">2 Videos</span>
                </h3>
                <span className="sub-pill">Docu-Style &amp; Breakdowns</span>
              </div>
              <div className="bento-grid-2-landscape">
                {caseStudies.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </div>

            {/* Subcategories 5, 6, 7: Music Videos, Podcast, SaaS */}
            <div className="bento-subcategory">
              <div className="bento-sub-header">
                <h3>
                  05 – 07. Music Videos · Podcast · SaaS Motion <span className="sub-count">3 Videos</span>
                </h3>
                <span className="sub-pill">Widescreen Master Cuts</span>
              </div>
              <div className="bento-grid-3-landscape">
                {musicVideos.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
                {podcastEpisodes.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
                {saasVideos.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onPlay={handlePlayVideo}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Navigation & Call-to-Action */}
        <footer className="myworks-footer-cta">
          <div className="footer-cta-card">
            <span className="footer-cta-badge">COLLABORATION &amp; INQUIRIES</span>
            <h3 className="footer-cta-title">Ready to create high-impact video content?</h3>
            <p className="footer-cta-desc">
              Whether you need high-retention edits for social media, kinetic motion graphics, or full cinematic long-form storytelling, let's discuss your next project.
            </p>
            <div className="footer-cta-actions">
              <Link to="/" className="works-cta-btn works-cta-primary" data-cursor="disable">
                <MdArrowBack size={18} />
                <span>Return to Homepage</span>
              </Link>
              <a
                href={`mailto:${config.social.email}`}
                className="works-cta-btn works-cta-secondary"
                data-cursor="disable"
              >
                <MdMailOutline size={18} />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={() => setModalVideo((prev) => ({ ...prev, isOpen: false }))}
        videoId={modalVideo.videoId}
        title={modalVideo.title}
        category={modalVideo.category}
      />
    </div>
  );
};

export default MyWorks;
