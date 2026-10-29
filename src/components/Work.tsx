import { useState, useRef, useEffect, useCallback } from "react";
import "./styles/Work.css";
import { config } from "../config";
import { Link } from "react-router-dom";
import VideoModal from "./VideoModal";
import { extractYouTubeId, getYouTubeThumbnail } from "../utils/youtube";
import { MdChevronLeft, MdChevronRight, MdPlayArrow, MdVideocam, MdArrowOutward } from "react-icons/md";

const Work = () => {
  const [modalVideo, setModalVideo] = useState<{
    isOpen: boolean;
    videoId: string | null;
    title: string;
    category: string;
    aspectRatio?: "9:16" | "16:9";
  }>({
    isOpen: false,
    videoId: null,
    title: "",
    category: "",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Exactly 5 featured project slots curated in config.ts
  const featuredProjects = config.projects
    .filter((p) => p.featured)
    .slice(0, 5);

  const checkScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide index
    const children = Array.from(el.children) as HTMLElement[];
    if (children.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = scrollLeft + clientWidth / 2;

    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(Math.min(closestIndex, featuredProjects.length - 1));
  }, [featuredProjects.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    if (index < 0 || index >= children.length) return;

    const targetChild = children[index];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    targetChild.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(featuredProjects.length, activeIndex + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  const handleOpenVideo = (
    videoId: string,
    title: string,
    category: string,
    aspectRatio?: "9:16" | "16:9"
  ) => {
    setModalVideo({
      isOpen: true,
      videoId,
      title,
      category,
      aspectRatio,
    });
  };

  return (
    <section className="work-section" id="work" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="work-header-container">
        <div className="work-header-left">
          <span className="work-section-badge">SELECTED HIGHLIGHTS</span>
          <h2 className="work-section-title">
            Featured <span>Reels &amp; Films</span>
          </h2>
          <p className="work-section-subtitle">
            Curated showcase of high-velocity 9:16 vertical shorts and 16:9 cinematic widescreen edits.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="work-carousel-controls">
          <div className="work-carousel-counter">
            <span className="current-num">0{activeIndex + 1}</span>
            <span className="counter-slash">/</span>
            <span className="total-num">0{featuredProjects.length}</span>
          </div>

          <div className="work-nav-buttons">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              className="carousel-nav-btn prev-btn"
              aria-label="Previous featured video"
              data-cursor="disable"
            >
              <MdChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className="carousel-nav-btn next-btn"
              aria-label="Next featured video"
              data-cursor="disable"
            >
              <MdChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        className="work-carousel-track"
        ref={scrollContainerRef}
        role="region"
        aria-label="Featured projects carousel"
      >
        {featuredProjects.map((project, index) => {
          const videoId = extractYouTubeId(project.videoUrl);
          const hasVideo = Boolean(videoId);
          const isPortrait = project.aspectRatio === "9:16";
          const thumb =
            project.thumbnailUrl ||
            (hasVideo && videoId ? getYouTubeThumbnail(videoId, "maxres") : null);

          return (
            <div
              className={`work-carousel-card ${isPortrait ? "card-portrait" : "card-landscape"}`}
              key={project.id}
            >
              <div className="card-top-meta">
                <span className="card-index-pill">0{index + 1}</span>
                <span className="card-subcat-badge">{project.subCategory}</span>
                <span className={`card-aspect-pill ${isPortrait ? "aspect-portrait" : "aspect-landscape"}`}>
                  {project.aspectRatio}
                </span>
              </div>

              {/* Media Preview Box */}
              <div
                className={`card-media-box ${isPortrait ? "media-ratio-9-16" : "media-ratio-16-9"}`}
                onClick={
                  hasVideo && videoId
                    ? () => handleOpenVideo(videoId, project.title, project.subCategory, project.aspectRatio)
                    : undefined
                }
                role={hasVideo ? "button" : undefined}
                tabIndex={hasVideo ? 0 : undefined}
                aria-label={hasVideo ? `Play ${project.title}` : project.title}
                data-cursor={hasVideo ? "pointer" : "default"}
              >
                {thumb ? (
                  <img
                    src={thumb}
                    alt={project.title}
                    className="card-media-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (videoId && (e.currentTarget.src.includes("maxresdefault"))) {
                        e.currentTarget.src = getYouTubeThumbnail(videoId, "hq");
                      }
                    }}
                  />
                ) : (
                  <div className="card-placeholder-mesh">
                    <div className="placeholder-content">
                      <div className="placeholder-icon-ring">
                        {hasVideo ? <MdPlayArrow size={26} /> : <MdVideocam size={24} />}
                      </div>
                      <span className="placeholder-status">
                        {hasVideo ? "READY TO PLAY" : "AWAITING VIDEO LINK"}
                      </span>
                      <span className="placeholder-slot-label">FEATURED SLOT 0{index + 1}</span>
                    </div>
                  </div>
                )}

                {hasVideo && (
                  <div className="card-play-hover-overlay">
                    <div className="play-ring">
                      <MdPlayArrow size={34} />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Details */}
              <div className="card-info-box">
                <h3 className="card-project-title">{project.title}</h3>
                <p className="card-project-desc">{project.description}</p>
                <div className="card-tags-row">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* 6th Slot: End Card linking to /myworks */}
        <div className="work-carousel-card work-carousel-cta-card">
          <div className="cta-card-content">
            <span className="cta-card-badge">FULL PORTFOLIO</span>
            <h3>Explore All 16 Works</h3>
            <p>
              Browse all 7 creative subcategories spanning viral short-form retention, docu-style essays, music videos, and SaaS motion.
            </p>
            <div className="cta-metrics">
              <div className="metric-item">
                <span className="metric-number">11</span>
                <span className="metric-label">Short Form (9:16)</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">05</span>
                <span className="metric-label">Long Form (16:9)</span>
              </div>
            </div>
            <Link to="/myworks" className="cta-gallery-btn" data-cursor="disable">
              Open Bento Gallery <MdArrowOutward />
            </Link>
          </div>
        </div>
      </div>

      {/* Direct Bottom Gallery Link */}
      <div className="work-bottom-cta">
        <Link to="/myworks" className="work-bottom-link" data-cursor="disable">
          <span>View Complete 16-Project Bento Gallery</span>
          <MdArrowOutward size={18} />
        </Link>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={() => setModalVideo((prev) => ({ ...prev, isOpen: false }))}
        videoId={modalVideo.videoId}
        title={modalVideo.title}
        category={modalVideo.category}
        aspectRatio={modalVideo.aspectRatio}
      />
    </section>
  );
};

export default Work;
