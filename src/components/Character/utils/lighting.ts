import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // 1. Natural hemisphere light (sky soft icy blue, ground deep charcoal)
  const hemisphereLight = new THREE.HemisphereLight(0xe8f0ff, 0x0b0910, 1.35);
  scene.add(hemisphereLight);

  // 2. Base ambient light so all PBR materials & textures are clear
  const ambientLight = new THREE.AmbientLight(0xdcd4f8, 0.95);
  scene.add(ambientLight);

  // 3. Key Light: Crisp white with icy hint illuminating face & body
  const keyLight = new THREE.DirectionalLight(0xf4f7ff, 1.85);
  keyLight.position.set(4, 9, 14);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // 4. Fill Light: Front-left electric cobalt & indigo hue
  const fillLight = new THREE.DirectionalLight(0x4b3bff, 1.35);
  fillLight.position.set(-6, 5, 12);
  scene.add(fillLight);

  // 5. Rim / Silhouette Light: Back-left rich ultraviolet accent
  const rimLight = new THREE.DirectionalLight(0x7654ff, 2.6);
  rimLight.position.set(-2.5, 7.5, -4);
  scene.add(rimLight);

  // 6. Chromatic Kicker Light: Back-right fiery red-orange edge rim
  const chromaticKicker = new THREE.DirectionalLight(0xff4a35, 1.25);
  chromaticKicker.position.set(3.5, 6, -3);
  scene.add(chromaticKicker);

  // 7. Monitor Screen Point Light (ultraviolet/electric blue)
  const pointLight = new THREE.PointLight(0x7654ff, 0, 100, 2.5);
  pointLight.position.set(0, 10.5, 4);
  scene.add(pointLight);

  // 7. Equirectangular HDR reflection environment
  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0.75;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.1) {
      // Soft, cinematic computer screen glow on character's face & desk
      pointLight.intensity = (screenLight.material.opacity || 1) * 2.2;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 1.5;
  const ease = "power2.out";

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.85,
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
