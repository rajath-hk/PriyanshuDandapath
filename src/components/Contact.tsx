import { MdArrowOutward, MdCopyright, MdEmail, MdLocationOn } from "react-icons/md";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline.fromTo(
      ".contact-header-block",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    contactTimeline.fromTo(
      ".contact-card-box",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <footer className="contact-section" id="contact">
      <div className="contact-container">
        {/* Contact Invitation Header */}
        <div className="contact-header-block">
          <span className="contact-eyebrow">START A PROJECT</span>
          <h2 className="contact-title">
            Let's Build Something <span>Exceptional</span>
          </h2>
          <p className="contact-invitation">
            Have an upcoming YouTube channel, brand campaign, motion design, or high-velocity short-form project? Let's bring your vision to life.
          </p>

          {/* Big Direct Email CTA Button */}
          <div className="contact-primary-cta">
            <a
              href={`mailto:${config.social.email}`}
              className="contact-email-btn"
              data-cursor="disable"
              title="Send email to Priyanshu"
            >
              <MdEmail size={22} />
              <span>{config.social.email}</span>
              <MdArrowOutward size={20} className="cta-arrow" />
            </a>
          </div>
        </div>

        {/* Contact Information & Verified Socials Grid */}
        <div className="contact-grid">
          {/* Card 1: Location & Availability */}
          <div className="contact-card-box">
            <h4 className="card-heading">Availability &amp; Location</h4>
            <div className="contact-status-item">
              <span className="status-indicator"></span>
              <span className="status-text">{config.social.availability}</span>
            </div>
            <div className="contact-location-item">
              <MdLocationOn size={18} className="loc-icon" />
              <span>{config.social.location}</span>
            </div>
          </div>

          {/* Card 2: Verified Social Profiles */}
          <div className="contact-card-box">
            <h4 className="card-heading">Verified Social Profiles</h4>
            <div className="contact-social-pills">
              {config.social.instagram && (
                <a
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-link"
                  data-cursor="disable"
                >
                  <FaInstagram size={17} />
                  <span>Instagram</span>
                  <MdArrowOutward size={15} />
                </a>
              )}
              {config.social.linkedin && (
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill-link"
                  data-cursor="disable"
                >
                  <FaLinkedinIn size={17} />
                  <span>LinkedIn</span>
                  <MdArrowOutward size={15} />
                </a>
              )}
            </div>
          </div>

          {/* Card 3: Creative Identity & Monogram */}
          <div className="contact-card-box">
            <h4 className="card-heading">Creative Brand</h4>
            <p className="contact-brand-statement">
              Visual storytelling through rhythm, pacing, and retention. Engineered for high-retention engagement.
            </p>
            <span className="contact-brand-name">{config.developer.brandName}</span>
          </div>
        </div>

        {/* Clean Footer Attribution Bar */}
        <div className="contact-footer-bar">
          <div className="footer-copyright">
            <MdCopyright size={16} />
            <span>
              {new Date().getFullYear()} {config.developer.fullName} ({config.developer.brandName}). All rights reserved.
            </span>
          </div>
          <div className="footer-attribution">
            <span>
              Core 3D experience based on open-source template by Redoyanul Haque (MIT License).
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
