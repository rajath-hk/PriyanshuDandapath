/**
 * Viewport height & aspect-aware camera framing configuration for Hero.
 * Centers the character's head, torso, hands, and keyboard within the visible viewport,
 * providing clean headroom below the fixed navbar and ample breathing room above the floor.
 *
 * PRESERVES 100% of desktop/PC framing values when on wide screens (>1024px and aspect >= 1.05).
 */
export function getCameraFraming(aspect: number, height: number) {
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth > 1024 && aspect >= 1.05;

  if (isDesktop) {
    let camY = 10.38;
    let camZ = 30.0;
    let scale = 0.88;

    if (height <= 720) {
      // Shorter laptop screens (e.g. 1280x720)
      camY = 10.35;
      camZ = 30.8;
      scale = 0.86;
    } else if (height <= 800) {
      // Standard 768p laptop screens (e.g. 1366x768)
      camY = 10.38;
      camZ = 30.2;
      scale = 0.88;
    } else if (height <= 950) {
      // 900p laptop/desktop screens (1440x900)
      camY = 10.38;
      camZ = 30.0;
      scale = 0.88;
    } else {
      // Large 1080p+ desktop displays (1920x1080)
      camY = 10.38;
      camZ = 29.8;
      scale = 0.88;
    }

    return { camY, camZ, scale };
  }

  // MOBILE / TABLET PORTRAIT FRAMING (aspect < 1.05 or width <= 1024)
  // Perfectly balanced between the top name header and bottom role info / CTAs
  let camY = 10.0;
  let camZ = 37.5;
  let scale = 0.72;

  if (aspect <= 0.52) {
    // Modern narrow phones (e.g. 360x800, 390x844, 430x932)
    camY = 9.90;
    camZ = 37.5;
    scale = 0.70;
  } else if (aspect <= 0.65) {
    // Compact phones (e.g. 320x568, 375x667)
    camY = 9.95;
    camZ = 36.5;
    scale = 0.68;
  } else {
    // Tablets (e.g. 768x1024)
    camY = 10.25;
    camZ = 34.0;
    scale = 0.78;
  }

  return { camY, camZ, scale };
}

/**
 * Viewport height & aspect-aware camera framing and subject positioning for About section.
 * Positions character gracefully:
 * - Desktop: in left half of layout (-25%) with hands, keyboard, torso fully in frame.
 * - Mobile: centered in upper portion of screen (0%) above the frosted-glass About content card.
 *
 * PRESERVES 100% of desktop/PC framing values when on wide screens (>1024px and aspect >= 1.05).
 */
export function getAboutCameraFraming(aspect: number, height: number) {
  const isDesktop =
    typeof window !== "undefined" && window.innerWidth > 1024 && aspect >= 1.05;

  if (isDesktop) {
    let aboutCamY = 10.30;
    let aboutCamZ = 28.5;
    let aboutModelX = "-25%";
    let charRotY = 0.62;

    if (height <= 720) {
      aboutCamY = 10.22;
      aboutCamZ = 29.8;
      aboutModelX = "-25%";
      charRotY = 0.60;
    } else if (height <= 800) {
      aboutCamY = 10.26;
      aboutCamZ = 29.2;
      aboutModelX = "-25%";
      charRotY = 0.62;
    } else if (height <= 950) {
      aboutCamY = 10.28;
      aboutCamZ = 28.8;
      aboutModelX = "-25%";
      charRotY = 0.62;
    } else {
      aboutCamY = 10.30;
      aboutCamZ = 28.5;
      aboutModelX = "-25%";
      charRotY = 0.62;
    }

    return { aboutCamY, aboutCamZ, aboutModelX, charRotY };
  }

  // MOBILE / TABLET ABOUT FRAMING
  // Keeps character centered in top portion without clipping at screen edges
  let aboutCamY = 9.55;
  let aboutCamZ = 37.0;
  let aboutModelX = "0%";
  let charRotY = 0.16;

  if (aspect <= 0.52) {
    // Narrow phones
    aboutCamY = 9.50;
    aboutCamZ = 38.0;
    aboutModelX = "0%";
    charRotY = 0.14;
  } else if (aspect <= 0.65) {
    // Compact phones
    aboutCamY = 9.52;
    aboutCamZ = 36.5;
    aboutModelX = "0%";
    charRotY = 0.14;
  } else {
    // Tablets
    aboutCamY = 9.95;
    aboutCamZ = 32.0;
    aboutModelX = "-14%";
    charRotY = 0.38;
  }

  return { aboutCamY, aboutCamZ, aboutModelX, charRotY };
}
