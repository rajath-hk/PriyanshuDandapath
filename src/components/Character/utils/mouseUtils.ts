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
 * Delta-time damped head rotation that responds smoothly to mouse and scroll position.
 * Eliminates sudden jumps, jitter, and frame-rate discrepancies across 60Hz/120Hz/144Hz displays.
 * Respects prefers-reduced-motion by remaining stable.
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
  const scrollY = window.scrollY;

  let targetX = 0;
  let targetY = 0;

  if (scrollY < vh * 0.7) {
    // 1. Hero section: subtle, responsive gaze toward cursor
    const clampedMouseX = Math.max(-0.8, Math.min(0.8, mouseX));
    const clampedMouseY = Math.max(-0.7, Math.min(0.7, mouseY));
    targetY = clampedMouseX * 0.24;
    targetX = -clampedMouseY * 0.18;
  } else if (scrollY < vh * 1.8) {
    // 2. About section: character gracefully glances toward the About text with subtle micro-tracking
    const clampedMouseX = Math.max(-0.6, Math.min(0.6, mouseX));
    const clampedMouseY = Math.max(-0.5, Math.min(0.5, mouseY));
    targetY = 0.06 + clampedMouseX * 0.05;
    targetX = -0.04 - clampedMouseY * 0.04;
  } else {
    // 3. Lower sections: gaze settles naturally toward workspace/monitor
    targetY = -0.15;
    targetX = -0.32;
  }

  headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetX, dampFactor);
  headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetY, dampFactor);
};
