/**
 * Viewport height & aspect-aware camera framing configuration for Hero.
 * Centers the character's head, torso, hands, and keyboard within the visible viewport,
 * providing clean headroom below the fixed navbar and ample breathing room above the floor.
 */
export function getCameraFraming(_aspect: number, height: number) {
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

/**
 * Viewport height & aspect-aware camera framing and subject positioning for About section.
 * Positions character gracefully in left half of layout with hands, keyboard, and torso fully in frame,
 * eliminating excessive headroom and preventing bottom clipping.
 */
export function getAboutCameraFraming(_aspect: number, height: number) {
  let aboutCamY = 10.30;
  let aboutCamZ = 28.5;
  let aboutModelX = "-25%";
  let charRotY = 0.62;

  if (height <= 720) {
    // Shorter laptop screens (e.g. 1280x720)
    aboutCamY = 10.22;
    aboutCamZ = 29.8;
    aboutModelX = "-25%";
    charRotY = 0.60;
  } else if (height <= 800) {
    // Standard 768p laptop screens (e.g. 1366x768)
    aboutCamY = 10.26;
    aboutCamZ = 29.2;
    aboutModelX = "-25%";
    charRotY = 0.62;
  } else if (height <= 950) {
    // 900p laptop/desktop screens (1440x900)
    aboutCamY = 10.28;
    aboutCamZ = 28.8;
    aboutModelX = "-25%";
    charRotY = 0.62;
  } else {
    // Large 1080p+ desktop displays (1920x1080)
    aboutCamY = 10.30;
    aboutCamZ = 28.5;
    aboutModelX = "-25%";
    charRotY = 0.62;
  }

  return { aboutCamY, aboutCamZ, aboutModelX, charRotY };
}
