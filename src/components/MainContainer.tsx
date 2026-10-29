import { PropsWithChildren, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSplitText();
      }, 150);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <div className="film-grain-overlay" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <SocialIcons />
      {children}
      <main className="main-content">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </main>
    </div>
  );
};

export default MainContainer;
