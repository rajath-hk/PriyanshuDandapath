import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import "./MyWorks.css";

type FilterTab = "ALL" | "SHORT FORM" | "LONG FORM" | "fast-paced" | "talking-head" | "podcast-highlights" | "case-studies" | "music-videos" | "podcast" | "saas";

const MyWorks = () => {
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

  const handlePlayVideo = (videoId: string, title: string, category: string) => {
    setModalVideo({
      isOpen: true,
      videoId,
      title,
      category,
    });
  };

  const allProjects = config.projects;
  const shortFormProjects = allProjects.filter((p) => p.topLevelCategory === "SHORT FORM");
  const longFormProjects = allProjects.filter((p) => p.topLevelCategory === "LONG FORM");

  // Filter groups
  const fastPaced = allProjects.filter((p) => p.subCategoryKey === "fast-paced");
  const talkingHead = allProjects.filter((p) => p.subCategoryKey === "talking-head");
  const podcastHighlights = allProjects.filter((p) => p.subCategoryKey === "podcast-highlights");
  const caseStudies = allProjects.filter((p) => p.subCategoryKey === "case-studies");
  const musicVideos = allProjects.filter((p) => p.subCategoryKey === "music-videos");
  const podcastEpisodes = allProjects.filter((p) => p.subCategoryKey === "podcast");
  const saasVideos = allProjects.filter((p) => p.subCategoryKey === "saas");

  // Determine which sections to render based on activeTab
  const showShortForm = activeTab === "ALL" || activeTab === "SHORT FORM";
  const showLongForm = activeTab === "ALL" || activeTab === "LONG FORM";

  // Individual category filters
  const isSpecificFilter = !["ALL", "SHORT FORM", "LONG FORM"].includes(activeTab);
  const specificProjects = isSpecificFilter
    ? allProjects.filter((p) => p.subCategoryKey === activeTab)
    : [];

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          PriyansArt <span>Works</span>
        </h1>
        <p className="myworks-subtitle">
          16 Project Slots · Short-Form Viral Retention &amp; Long-Form Visual Storytelling
        </p>

        {/* Filter Navigation Bar */}
        <div className="myworks-filter-bar">
          <button
            className={`filter-btn ${activeTab === "ALL" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("ALL")}
            data-cursor="disable"
          >
            All (16)
          </button>
          <button
            className={`filter-btn ${activeTab === "SHORT FORM" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("SHORT FORM")}
            data-cursor="disable"
          >
            Short Form ({shortFormProjects.length})
          </button>
          <button
            className={`filter-btn ${activeTab === "LONG FORM" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("LONG FORM")}
            data-cursor="disable"
          >
            Long Form ({longFormProjects.length})
          </button>
          <span className="filter-divider">|</span>
          <button
            className={`filter-btn filter-sub ${activeTab === "fast-paced" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("fast-paced")}
            data-cursor="disable"
          >
            Fast-Paced (4)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "talking-head" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("talking-head")}
            data-cursor="disable"
          >
            Talking Head (4)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "podcast-highlights" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("podcast-highlights")}
            data-cursor="disable"
          >
            Podcast Clips (3)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "case-studies" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("case-studies")}
            data-cursor="disable"
          >
            Case Studies (2)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "music-videos" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("music-videos")}
            data-cursor="disable"
          >
            Music Videos (1)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "podcast" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("podcast")}
            data-cursor="disable"
          >
            Podcast (1)
          </button>
          <button
            className={`filter-btn filter-sub ${activeTab === "saas" ? "filter-active" : ""}`}
            onClick={() => setActiveTab("saas")}
            data-cursor="disable"
          >
            SaaS (1)
          </button>
        </div>
      </div>

      <div className="myworks-container">
        {/* SPECIFIC SINGLE CATEGORY FILTER VIEW */}
        {isSpecificFilter && (
          <div className="bento-section">
            <div className="bento-section-header">
              <h2>
                {specificProjects[0]?.subCategory}
                <span className="bento-count">({specificProjects.length} Projects)</span>
              </h2>
            </div>
            <div
              className={`bento-row ${
                specificProjects[0]?.aspectRatio === "9:16"
                  ? "bento-grid-portrait"
                  : "bento-grid-landscape"
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
          </div>
        )}

        {/* SECTION A: SHORT FORM (11 PROJECTS) */}
        {!isSpecificFilter && showShortForm && (
          <div className="portfolio-division">
            <div className="division-header">
              <span className="division-tag">SECTION A</span>
              <h2 className="division-title">
                SHORT FORM <span>REELS &amp; SHORTS</span>
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
          </div>
        )}

        {/* SECTION B: LONG FORM (5 PROJECTS) */}
        {!isSpecificFilter && showLongForm && (
          <div className="portfolio-division" style={{ marginTop: "70px" }}>
            <div className="division-header">
              <span className="division-tag">SECTION B</span>
              <h2 className="division-title">
                LONG FORM <span>CINEMATICS &amp; EPISODES</span>
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
          </div>
        )}
      </div>

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
