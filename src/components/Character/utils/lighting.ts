import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // 1. Natural hemisphere light (soft lavender sky, deep charcoal ground)
  // Balanced intensity prevents top-down white wash
  const hemisphereLight = new THREE.HemisphereLight(0xcac0f0, 0x08060c, 0.70);
  scene.add(hemisphereLight);

  // 2. Base ambient light: muted indigo-violet so shadows retain depth and contrast
  const ambientLight = new THREE.AmbientLight(0x3e305e, 0.42);
  scene.add(ambientLight);

  // 3. Key Light: Warm ivory-peach directional light illuminating face & body with soft warmth
  const keyLight = new THREE.DirectionalLight(0xfff4eb, 1.15);
  keyLight.position.set(3.5, 8.5, 12.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // 4. Fill Light: Front-left electric cobalt & indigo hue for subtle shadow color
  const fillLight = new THREE.DirectionalLight(0x4332c8, 0.75);
  fillLight.position.set(-5.5, 5, 11);
  scene.add(fillLight);

  // 5. Rim / Silhouette Light: Back-left rich ultraviolet accent
  const rimLight = new THREE.DirectionalLight(0x7654ff, 2.4);
  rimLight.position.set(-2.8, 7.5, -4);
  scene.add(rimLight);

  // 6. Chromatic Kicker Light: Back-right fiery red-orange edge rim
  const chromaticKicker = new THREE.DirectionalLight(0xff4a35, 1.10);
  chromaticKicker.position.set(3.5, 6, -3);
  scene.add(chromaticKicker);

  // 7. Monitor Screen Point Light (ultraviolet/electric blue)
  const pointLight = new THREE.PointLight(0x7654ff, 0, 100, 2.0);
  pointLight.position.set(0, 10.5, 4);
  scene.add(pointLight);

  // 8. Equirectangular HDR reflection environment
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0.42;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.1) {
      // Soft, cinematic computer screen glow on character's face & desk
      pointLight.intensity = (screenLight.material.opacity || 1) * 1.8;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 1.5;
  const ease = "power2.out";

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.45,
      duration: duration,
      ease: ease,
    });
    gsap.to([keyLight, fillLight, rimLight, chromaticKicker], {
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.1,
      duration: 1.5,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
