import * as THREE from "three";
import { setCharTimeline, setAllTimeline, killCharTimeline } from "../../utils/GsapScroll";
import { getCameraFraming } from "./framing";

export default function handleResize(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  canvasDiv: React.RefObject<HTMLDivElement>,
  character: THREE.Object3D
) {
  if (!canvasDiv.current) return;
  const canvas3d = canvasDiv.current.getBoundingClientRect();
  const width = canvas3d.width > 0 ? canvas3d.width : window.innerWidth;
  const height = canvas3d.height > 0 ? canvas3d.height : window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  const { camY, camZ, scale } = getCameraFraming(camera.aspect, height);
  if (window.scrollY < 50) {
    camera.position.set(0, camY, camZ);
  }
  if (character) {
    character.scale.set(scale, scale, scale);
  }
  camera.updateProjectionMatrix();

  killCharTimeline();
  setCharTimeline(character, camera);
  setAllTimeline();
}
