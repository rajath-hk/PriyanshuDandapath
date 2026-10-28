import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {config.developer.name.toUpperCase()}
              {' '}
              <br />
              <span>{config.developer.brandName.toUpperCase()}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Video Editor</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Motion Designer &amp; AI Filmmaker</div>
            </h2>
            <p className="hero-tagline">
              {config.developer.tagline}
            </p>
            <div className="hero-cta-group">
              <a href="#work" className="hero-cta-btn hero-cta-primary" data-cursor="disable">
                EXPLORE MY WORK
              </a>
              <a href={`mailto:${config.social.email}`} className="hero-cta-btn hero-cta-secondary" data-cursor="disable">
                LET'S TALK
              </a>
            </div>
          </div>
          {/* Mobile photo - shown only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src={config.developer.mobilePhoto}
              alt={config.developer.fullName}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
