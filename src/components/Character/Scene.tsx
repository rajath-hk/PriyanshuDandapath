import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";
import { killCharTimeline } from "../utils/GsapScroll";
import { getCameraFraming } from "./utils/framing";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const charRef = useRef<THREE.Object3D | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      const containerEl = canvasDiv.current;
      const rect = containerEl.getBoundingClientRect();
      const width = rect.width > 0 ? rect.width : window.innerWidth;
      const height = rect.height > 0 ? rect.height : window.innerHeight;
      const container = { width, height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;
      const isMobileDevice = window.innerWidth <= 768;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2 && !isMobileDevice,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      // Adaptive pixel ratio capped at 1.5 on mobile to eliminate GPU thermal throttling
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      containerEl.appendChild(renderer.domElement);

      const { camY, camZ, scale } = getCameraFraming(aspect, container.height);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, camY, camZ);
      camera.zoom = 1.0;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let isMounted = true;
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (isMounted) {
            handleResize(renderer, camera, canvasDiv, charRef.current || sceneRef.current);
          }
        }, 150);
      };

      loadCharacter().then((gltf) => {
        if (gltf && isMounted) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const charScene = gltf.scene;
          charScene.scale.set(scale, scale, scale);
          charRef.current = charScene;
          scene.add(charScene);
          headBone = charScene.getObjectByName("spine006") || null;
          screenLight = charScene.getObjectByName("screenlight") || null;

          // Turn lights on immediately so character is never a black silhouette
          light.turnOnLights();
          animations.startIntro();

          progress.loaded().then(() => {
            light.turnOnLights();
          });

          window.addEventListener("resize", onResize);
          window.addEventListener("orientationchange", onResize);
        }
      });

      let mouse = { x: 0, y: 0 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = window.setTimeout(() => {
          element?.addEventListener(
            "touchmove",
            (e: TouchEvent) => handleTouchMove(e, (x, y) => (mouse = { x, y })),
            { passive: true }
          );
        }, 150);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y) => {
          mouse = { x, y };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart, { passive: true });
        landingDiv.addEventListener("touchend", onTouchEnd, { passive: true });
      }

      // Performance Optimization: Defer GPU render when offscreen (past About) or tab hidden
      let isVisible = true;
      const checkVisibility = () => {
        const scrolledFar = window.scrollY > window.innerHeight * 2.8;
        isVisible = !document.hidden && !scrolledFar;
      };
      document.addEventListener("visibilitychange", checkVisibility);
      window.addEventListener("scroll", checkVisibility, { passive: true });

      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return; // Skip GPU render when offscreen

        const delta = Math.min(clock.getDelta(), 0.1);
        if (mixer) {
          mixer.update(delta);
        }
        if (headBone) {
          handleHeadRotation(headBone, mouse.x, mouse.y, delta);
          light.setPointLight(screenLight);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationFrameId);
        clearTimeout(debounce);
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        document.removeEventListener("visibilitychange", checkVisibility);
        window.removeEventListener("scroll", checkVisibility);
        killCharTimeline();
        scene.clear();
        renderer.dispose();
        if (containerEl && renderer.domElement && containerEl.contains(renderer.domElement)) {
          containerEl.removeChild(renderer.domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
