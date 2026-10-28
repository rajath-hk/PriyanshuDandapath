import { useState } from "react";
import { MdArrowOutward, MdPlayArrow, MdVideocam } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  image?: string;
  alt?: string;
  video?: string;
  link?: string;
  aspectRatio?: "9:16" | "16:9";
  onPlay?: () => void;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isExternalLink = Boolean(props.link && !props.link.startsWith("/"));
  const isPortrait = props.aspectRatio === "9:16";

  const handleMouseEnter = () => {
    if (props.video) {
      setIsVideo(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
  };

  const content = (
    <>
      <div className="work-link">
        {props.onPlay ? <MdPlayArrow size={18} /> : <MdArrowOutward />}
      </div>
      {props.image && !imgError ? (
        <img
          src={props.image}
          alt={props.alt || "Project Preview"}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 50% 40%, rgba(194, 164, 255, 0.12) 0%, #0d0a12 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "#c2a4ff",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <MdVideocam size={36} opacity={0.8} />
          <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Awaiting Video
          </span>
          <span style={{ fontSize: "10px", color: "#8a8094", fontFamily: "monospace" }}>
            {isPortrait ? "9:16 Reel" : "16:9 Video"}
          </span>
        </div>
      )}
      {isVideo && props.video && (
        <video
          src={props.video}
          autoPlay
          muted
          playsInline
          loop
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </>
  );

  return (
    <div className="work-image" style={{ aspectRatio: isPortrait ? "9/16" : "16/9", maxHeight: "420px" }}>
      {props.onPlay ? (
        <div
          className="work-image-in"
          onClick={props.onPlay}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="pointer"
          style={{ cursor: "pointer" }}
        >
          {content}
        </div>
      ) : props.link ? (
        isExternalLink ? (
          <a
            className="work-image-in"
            href={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
          >
            {content}
          </a>
        ) : (
          <Link
            className="work-image-in"
            to={props.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor="disable"
          >
            {content}
          </Link>
        )
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="disable"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
