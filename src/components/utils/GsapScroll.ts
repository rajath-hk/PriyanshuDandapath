import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCameraFraming, getAboutCameraFraming } from "../Character/utils/framing";

gsap.registerPlugin(ScrollTrigger);

export function killCharTimeline() {
  ScrollTrigger.getById("char-tl1")?.kill();
  ScrollTrigger.getById("char-tl2")?.kill();
  ScrollTrigger.getById("char-tl3")?.kill();
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  killCharTimeline();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrubSpeed = prefersReducedMotion ? false : 0.8;

  const tl1 = gsap.timeline({
    scrollTrigger: {
      id: "char-tl1",
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: scrubSpeed,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      id: "char-tl2",
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: scrubSpeed,
      invalidateOnRefresh: true,
    },
  });
  const tl3 = gsap.timeline({
    scrollTrigger: {
      id: "char-tl3",
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: scrubSpeed,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#7654FF");
      object.material.emissiveIntensity = 1.35;
      // Gentle subtle breathing animation, NOT random flashing
      gsap.to(object.material, {
        emissiveIntensity: 1.6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      screenLight = object;
    }
  });
  const neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    if (character) {
      const { camY, camZ } = getCameraFraming(camera.aspect, window.innerHeight);
      const { aboutCamY, aboutCamZ, aboutModelX, charRotY } = getAboutCameraFraming(
        camera.aspect,
        window.innerHeight
      );

      tl1
        .fromTo(character.rotation, { y: 0 }, { y: charRotY, duration: 1 }, 0)
        .fromTo(camera.position, { y: camY, z: camZ }, { y: aboutCamY, z: aboutCamZ, duration: 1 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: aboutModelX, duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-30%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.8 }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .to(
          ".character-model",
          { pointerEvents: "none", x: "-6%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6, immediateRender: false },
          0
        )
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3, immediateRender: false },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2, immediateRender: false },
          0.3
        );

      tl3
        .to(
          ".character-model",
          { opacity: 0, y: "-35%", duration: 2, ease: "power2.in" },
          0
        )
        .to(character.rotation, { x: -0.04, duration: 2 }, 0);
    }
  } else {
    if (character) {
      const tM2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".what-box-in",
          start: "top 70%",
          end: "bottom top",
        },
      });
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    }
  }
}

export function setAllTimeline() {
  ScrollTrigger.getById("creative-focus-tl")?.kill();
  const focusTimeline = gsap.timeline({
    scrollTrigger: {
      id: "creative-focus-tl",
      trigger: ".creative-focus-section",
      start: "top 75%",
      end: "bottom 30%",
      toggleActions: "play none none reverse",
    },
  });
  focusTimeline.fromTo(
    ".creative-focus-card",
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
  );
}
