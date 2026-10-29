import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCameraFraming, getAboutCameraFraming } from "../Character/utils/framing";

gsap.registerPlugin(ScrollTrigger);

export function killCharTimeline() {
  ScrollTrigger.getById("char-master")?.kill();
  ScrollTrigger.getById("char-tl1")?.kill();
  ScrollTrigger.getById("char-tl2")?.kill();
  ScrollTrigger.getById("char-tl3")?.kill();
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  killCharTimeline();

  if (!character) return;

  const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;
  if (!isDesktop) {
    const tM2 = gsap.timeline({
      scrollTrigger: {
        id: "char-tl1",
        trigger: ".what-box-in",
        start: "top 70%",
        end: "bottom top",
      },
    });
    tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
    return;
  }

  // Pre-calculate responsive framing for current viewport
  const { camY, camZ } = getCameraFraming(camera.aspect, window.innerHeight);
  const { aboutCamY, aboutCamZ, aboutModelX, charRotY } = getAboutCameraFraming(
    camera.aspect,
    window.innerHeight
  );

  let screenLight: any, monitor: any;
  character.children.forEach((object: any) => {
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

  const neckBone = character.getObjectByName("spine005");

  // Reset initial Hero values cleanly
  if (window.scrollY < 50) {
    camera.position.set(0, camY, camZ);
    character.rotation.set(0, 0, 0);
  }

  // Master unified timeline: controls the entire 3D character & camera journey
  // Eliminates competing timelines, race conditions, and rapid scroll desync
  const masterTl = gsap.timeline({
    scrollTrigger: {
      id: "char-master",
      trigger: ".landing-section",
      start: "top top",
      endTrigger: ".whatIDO",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // Total timeline duration: 10 units
  // Phase 1 (0.0 -> 3.2): Hero to About transition
  masterTl
    .fromTo(
      character.rotation,
      { y: 0, x: 0 },
      { y: charRotY, x: 0, duration: 3.2, ease: "power1.inOut" },
      0
    )
    .fromTo(
      camera.position,
      { x: 0, y: camY, z: camZ },
      { x: 0, y: aboutCamY, z: aboutCamZ, duration: 3.2, ease: "power1.inOut" },
      0
    )
    .fromTo(
      ".character-model",
      { x: 0, y: 0, opacity: 1, pointerEvents: "inherit" },
      { x: aboutModelX, y: 0, opacity: 1, pointerEvents: "inherit", duration: 3.2, ease: "power1.inOut" },
      0
    )
    .to(".landing-container", { opacity: 0, duration: 1.6, ease: "power1.out" }, 0)
    .to(".landing-container", { y: "40%", duration: 2.8, ease: "power1.in" }, 0)
    .fromTo(
      ".about-me",
      { y: "-30%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 2.4, ease: "power1.out" },
      0.8
    );

  // Phase 2 (3.2 -> 4.4): Stable hold in About section (Reading zone)
  // Character remains stably framed while user reads About content

  // Phase 3 (4.4 -> 7.8): About to What I Do (Workspace transition)
  masterTl
    .to(
      camera.position,
      { z: 75, y: 8.4, duration: 3.4, ease: "power2.inOut" },
      4.4
    )
    .to(".about-section", { y: "30%", opacity: 0, duration: 2.8, ease: "power1.in" }, 4.4)
    .to(
      ".character-model",
      { x: "-6%", duration: 3.4, ease: "power2.inOut" },
      4.4
    )
    .to(character.rotation, { y: 0.92, x: 0.12, duration: 3.4, ease: "power2.inOut" }, 4.4);

  if (neckBone) {
    masterTl.to(neckBone.rotation, { x: 0.6, duration: 3.0, ease: "power2.inOut" }, 4.6);
  }
  if (monitor && monitor.material) {
    masterTl.to(monitor.material, { opacity: 1, duration: 1.5, ease: "power1.out" }, 5.2);
  }
  if (screenLight && screenLight.material) {
    masterTl.to(screenLight.material, { opacity: 1, duration: 1.8, ease: "power1.out" }, 5.4);
  }
  if (monitor) {
    masterTl.fromTo(
      monitor.position,
      { y: -10, z: 2 },
      { y: 0, z: 0, duration: 2.4, ease: "power2.out", immediateRender: false },
      4.8
    );
  }
  masterTl
    .fromTo(
      ".what-box-in",
      { display: "none" },
      { display: "flex", duration: 0.1, immediateRender: false },
      6.0
    )
    .fromTo(
      ".character-rim",
      { opacity: 1, scaleX: 1.4 },
      { opacity: 0, scale: 0, y: "-70%", duration: 3.0, immediateRender: false },
      4.5
    );

  // Phase 4 (7.8 -> 10.0): What I Do to Lower sections exit
  masterTl
    .to(".character-model", { opacity: 0, y: "-35%", duration: 2.2, ease: "power2.in" }, 7.8)
    .to(character.rotation, { x: -0.04, duration: 2.2, ease: "power1.inOut" }, 7.8)
    .set(".character-model", { pointerEvents: "none" }, 8.0);
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
