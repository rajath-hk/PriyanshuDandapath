import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
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

    // Handle navigation links
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

  return (
    <>
      <div className="header">
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
      </div>

      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
