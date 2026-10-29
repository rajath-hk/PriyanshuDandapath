/**
 * Viewport height & aspect-aware camera framing configuration.
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
