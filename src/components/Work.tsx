import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import VideoModal from "./VideoModal";
import { extractYouTubeId, getYouTubeThumbnail } from "../utils/youtube";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
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

  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  // Curate top featured projects across categories for the homepage preview
  const featuredProjects = config.projects
    .filter((p) => p.featured)
    .slice(0, 5);

  const handleOpenVideo = (videoId: string, title: string, category: string) => {
    setModalVideo({
      isOpen: true,
      videoId,
      title,
      category,
    });
  };

  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            Featured <span>Reels &amp; Films</span>
          </h2>
          <div className="work-flex">
            {featuredProjects.map((project, index) => {
              const videoId = extractYouTubeId(project.videoUrl);
              const thumb =
                project.thumbnailUrl ||
                (videoId ? getYouTubeThumbnail(videoId) : undefined);

              return (
                <div className="work-box" key={project.id}>
                  <div className="work-info">
                    <div className="work-title">
                      <h3>0{index + 1}</h3>
                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.subCategory} · {project.aspectRatio}</p>
                      </div>
                    </div>
                    <h4>Focus &amp; Style</h4>
                    <p>{project.description}</p>
                  </div>
                  <WorkImage
                    image={thumb}
                    alt={project.title}
                    aspectRatio={project.aspectRatio}
                    link={!videoId ? "/myworks" : undefined}
                    onPlay={
                      videoId
                        ? () => handleOpenVideo(videoId, project.title, project.subCategory)
                        : undefined
                    }
                  />
                </div>
              );
            })}

            {/* See All 16 Works Button */}
            <div className="work-box work-box-cta">
              <div className="see-all-works">
                <h3>Explore All 16 Works</h3>
                <p>
                  Browse Short Form (Fast-Paced, Talking Head, Podcasts) &amp; Long Form (Case Studies, Music Videos, SaaS)
                </p>
                <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                  Open Bento Gallery →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={modalVideo.isOpen}
        onClose={() => setModalVideo((prev) => ({ ...prev, isOpen: false }))}
        videoId={modalVideo.videoId}
        title={modalVideo.title}
        category={modalVideo.category}
      />
    </>
  );
};

export default Work;
