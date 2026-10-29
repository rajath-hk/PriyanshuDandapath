import React, { useState, useEffect } from "react";
import { ProjectItem } from "../config";
import { extractYouTubeId, getYouTubeThumbnail } from "../utils/youtube";
import { MdPlayArrow, MdVideocam } from "react-icons/md";
import "./styles/VideoCard.css";

interface VideoCardProps {
  project: ProjectItem;
  onPlay?: (videoId: string, title: string, category: string, aspectRatio?: "9:16" | "16:9") => void;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  project,
  onPlay,
  className = "",
}) => {
  const videoId = extractYouTubeId(project.videoUrl);
  const hasVideo = Boolean(videoId);
  const isPortrait = project.aspectRatio === "9:16";

  const [thumbSrc, setThumbSrc] = useState<string | null>(
    project.thumbnailUrl || (videoId ? getYouTubeThumbnail(videoId, "maxres") : null)
  );
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setThumbSrc(project.thumbnailUrl || (videoId ? getYouTubeThumbnail(videoId, "maxres") : null));
    setImageError(false);
  }, [project.thumbnailUrl, videoId]);

  const handleImageError = () => {
    if (videoId && thumbSrc?.includes("maxresdefault")) {
      // Fallback to hqdefault
      setThumbSrc(getYouTubeThumbnail(videoId, "hq"));
    } else {
      setImageError(true);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasVideo && videoId && onPlay) {
      onPlay(videoId, project.title, project.subCategory, project.aspectRatio);
    }
  };

  return (
    <div
      className={`video-card ${isPortrait ? "video-card-portrait" : "video-card-landscape"} ${
        hasVideo ? "video-card-has-video" : "video-card-placeholder"
      } ${className}`}
      onClick={hasVideo ? handleClick : undefined}
      data-cursor={hasVideo ? "pointer" : "default"}
      tabIndex={hasVideo ? 0 : undefined}
      role={hasVideo ? "button" : "article"}
      aria-label={`${project.title} - ${project.subCategory}`}
      onKeyDown={(e) => {
        if (hasVideo && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Media / Thumbnail / Placeholder Container */}
      <div className={`video-card-media-wrapper ${isPortrait ? "ratio-9-16" : "ratio-16-9"}`}>
        {thumbSrc && !imageError ? (
          <img
            src={thumbSrc}
            alt={project.title}
            className="video-card-thumbnail"
            loading="lazy"
            decoding="async"
            onError={handleImageError}
          />
        ) : (
          <div className="video-card-empty-placeholder">
            <div className="placeholder-mesh-bg"></div>
            <div className="placeholder-center-badge">
              <div className="placeholder-icon-circle">
                {hasVideo ? <MdPlayArrow size={24} /> : <MdVideocam size={22} />}
              </div>
              <span className="placeholder-status-text">
                {hasVideo ? "CLICK TO PLAY" : "AWAITING VIDEO LINK"}
              </span>
              <span className="placeholder-slot-code">
                SLOT {project.categoryNumber}.{project.order.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        )}

        {/* Top Badges */}
        <div className="video-card-top-bar">
          <span className="video-badge-aspect">
            {isPortrait ? "REEL · 9:16" : "VIDEO · 16:9"}
          </span>
          {project.featured && <span className="video-badge-featured">FEATURED</span>}
        </div>

        {/* Hover Overlay with Play Button if video exists */}
        {hasVideo && (
          <div className="video-card-play-overlay">
            <div className="play-button-glow">
              <MdPlayArrow size={32} />
            </div>
          </div>
        )}
      </div>

      {/* Card Metadata Details */}
      <div className="video-card-body">
        <div className="video-card-meta">
          <span className="video-card-category">{project.subCategory}</span>
          <span className="video-card-slot">SLOT {project.order.toString().padStart(2, "0")}</span>
        </div>
        <h3 className="video-card-title">{project.title}</h3>
        <p className="video-card-desc">{project.description}</p>
        <div className="video-card-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="video-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
