import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import { MdClose, MdArrowOutward } from "react-icons/md";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.stop();

    // Synchronize Lenis scroll updates directly with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF smoothly via GSAP ticker for frame-perfect lock
    const tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Handle navigation links on desktop
    const links = document.querySelectorAll(".header ul a");
    const onLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section && lenis) {
          const target = document.querySelector(section) as HTMLElement;
          if (target) {
            lenis.scrollTo(target, {
              offset: 0,
              duration: 1.2,
            });
          }
        }
      }
    };

    links.forEach((elem) => elem.addEventListener("click", onLinkClick));

    // Handle brand logo click to smoothly return to top
    const brandTitle = document.querySelector(".navbar-title");
    const onBrandClick = (e: Event) => {
      if (window.innerWidth > 1024 && lenis) {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      }
    };
    brandTitle?.addEventListener("click", onBrandClick);

    // Handle resize
    const onResize = () => {
      lenis?.resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tickerCallback);
      links.forEach((elem) => elem.removeEventListener("click", onLinkClick));
      brandTitle?.removeEventListener("click", onBrandClick);
      window.removeEventListener("resize", onResize);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Lock body scroll when mobile menu is open, handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-active");
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("mobile-menu-active");
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("mobile-menu-active");
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler for mobile menu items
  const handleMobileNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(targetId) as HTMLElement;
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -60, duration: 1.0 });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }, 150);
  };

  return (
    <>
      <header className="header">
        <a href="/#" className="navbar-title" data-cursor="disable" title="PriyansArt Home">
          {config.developer.monogram}
        </a>
        <a
          href={`mailto:${config.social.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.social.email}
        </a>

        {/* Desktop Links (Preserved exactly) */}
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#tools" href="#tools">
              <HoverLinks text="TOOLS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          data-cursor="disable"
        >
          <span className="hamburger-line top-line"></span>
          <span className="hamburger-line bottom-line"></span>
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="mobile-nav-content">
          <div className="mobile-nav-top">
            <span className="mobile-nav-brand">{config.developer.brandName}</span>
            <button
              className="mobile-nav-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              data-cursor="disable"
            >
              <MdClose size={24} />
            </button>
          </div>

          <nav className="mobile-nav-links-list">
            <a
              href="#about"
              className="mobile-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick("#about");
              }}
            >
              <span className="mobile-nav-num">01</span>
              <span className="mobile-nav-label">ABOUT</span>
            </a>
            <a
              href="#work"
              className="mobile-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick("#work");
              }}
            >
              <span className="mobile-nav-num">02</span>
              <span className="mobile-nav-label">WORK</span>
            </a>
            <a
              href="#tools"
              className="mobile-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick("#tools");
              }}
            >
              <span className="mobile-nav-num">03</span>
              <span className="mobile-nav-label">TOOLS</span>
            </a>
            <a
              href="#contact"
              className="mobile-nav-item"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNavClick("#contact");
              }}
            >
              <span className="mobile-nav-num">04</span>
              <span className="mobile-nav-label">CONTACT</span>
            </a>
            <Link
              to="/myworks"
              className="mobile-nav-item mobile-nav-highlight"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="mobile-nav-num">05</span>
              <span className="mobile-nav-label">ALL 16 WORKS</span>
              <MdArrowOutward size={18} className="highlight-arrow" />
            </Link>
          </nav>

          <div className="mobile-nav-bottom">
            <a
              href={`mailto:${config.social.email}`}
              className="mobile-nav-email-link"
            >
              <span>{config.social.email}</span>
            </a>
            <span className="mobile-nav-location">{config.social.location}</span>
          </div>
        </div>
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
