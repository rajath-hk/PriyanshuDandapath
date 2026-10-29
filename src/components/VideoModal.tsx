import React, { useEffect } from "react";
import { getYouTubeEmbedUrl } from "../utils/youtube";
import { MdClose } from "react-icons/md";
import "./styles/VideoModal.css";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string | null;
  title: string;
  category: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId,
  title,
  category,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoId) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <div className="video-modal-info">
            <span className="video-modal-tag">{category}</span>
            <h3 className="video-modal-title">{title}</h3>
          </div>
          <button
            className="video-modal-close"
            onClick={onClose}
            aria-label="Close video player"
            data-cursor="disable"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="video-modal-iframe-wrapper">
          <iframe
            src={getYouTubeEmbedUrl(videoId, true)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;

