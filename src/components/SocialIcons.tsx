import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdMovie } from "react-icons/md";
import "./styles/SocialIcons.css";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { config } from "../config";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {config.social.instagram && (
          <span>
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </span>
        )}
        {config.social.linkedin && (
          <span>
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </span>
        )}
        {config.social.youtube && (
          <span>
            <a
              href={config.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </span>
        )}
        <span>
          <a
            href={`mailto:${config.social.email}`}
            title="Email PriyansArt"
            aria-label="Email PriyansArt"
          >
            <MdEmail />
          </a>
        </span>
      </div>
      <a className="resume-button" href="#work">
        <HoverLinks text="SHOWCASE" />
        <span>
          <MdMovie />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
