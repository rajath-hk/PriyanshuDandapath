import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0);
  }, 1000);
};

/**
 * Continuous, smoothly blended head rotation that responds to mouse cursor and normalized scroll progress.
 * Uses piecewise continuous curves to prevent abrupt target jumps during rapid scroll reversals.
 * Delta-time exponential damping eliminates stutter across 60Hz/120Hz/144Hz displays.
 */
export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  delta: number
) => {
  if (!headBone) return;

  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Frame-rate independent exponential damping factor
  const clampedDelta = Math.min(delta, 0.1);
  const dampFactor = isReducedMotion
    ? 1 - Math.exp(-4 * clampedDelta)
    : 1 - Math.exp(-6 * clampedDelta);

  if (isReducedMotion) {
    headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, 0, dampFactor);
    headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, 0, dampFactor);
    return;
  }

  const vh = window.innerHeight || 900;
  const scrollY = window.scrollY || 0;

  // 1. Hero gaze: responsive to cursor
  const clampedMouseX = Math.max(-0.8, Math.min(0.8, mouseX));
  const clampedMouseY = Math.max(-0.7, Math.min(0.7, mouseY));
  const heroTargetY = clampedMouseX * 0.24;
  const heroTargetX = -clampedMouseY * 0.18;

  // 2. About glance: subtle gaze toward right-side about text
  const aboutTargetY = 0.06 + clampedMouseX * 0.05;
  const aboutTargetX = -0.04 - clampedMouseY * 0.04;

  // 3. Workspace gaze: focused down on monitor / typing keyboard
  const workTargetY = -0.15;
  const workTargetX = -0.32;

  let targetX = heroTargetX;
  let targetY = heroTargetY;

  if (scrollY <= vh * 0.5) {
    // Pure Hero section
    targetX = heroTargetX;
    targetY = heroTargetY;
  } else if (scrollY <= vh * 1.1) {
    // Smooth continuous blend: Hero -> About
    const t = (scrollY - vh * 0.5) / (vh * 0.6);
    targetX = THREE.MathUtils.lerp(heroTargetX, aboutTargetX, t);
    targetY = THREE.MathUtils.lerp(heroTargetY, aboutTargetY, t);
  } else if (scrollY <= vh * 1.4) {
    // Stable About reading zone
    targetX = aboutTargetX;
    targetY = aboutTargetY;
  } else if (scrollY <= vh * 2.0) {
    // Smooth continuous blend: About -> Workspace
    const t = (scrollY - vh * 1.4) / (vh * 0.6);
    targetX = THREE.MathUtils.lerp(aboutTargetX, workTargetX, t);
    targetY = THREE.MathUtils.lerp(aboutTargetY, workTargetY, t);
  } else {
    // Lower sections
    targetX = workTargetX;
    targetY = workTargetY;
  }

  headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetX, dampFactor);
  headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetY, dampFactor);
};
