import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // 1. Natural hemisphere light (sky soft white, ground subtle purple)
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x1a1228, 1.3);
  scene.add(hemisphereLight);

  // 2. Base ambient light so all PBR materials & textures are readable
  const ambientLight = new THREE.AmbientLight(0xddd0f8, 0.9);
  scene.add(ambientLight);

  // 3. Key Light: Front-right directional light illuminating face & body
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(4, 9, 14);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // 4. Fill Light: Front-left directional light with brand purple hue
  const fillLight = new THREE.DirectionalLight(0xc2a4ff, 1.2);
  fillLight.position.set(-6, 5, 12);
  scene.add(fillLight);

  // 5. Rim / Silhouette Light: Back-left neon accent
  const rimLight = new THREE.DirectionalLight(0xa78bfa, 2.4);
  rimLight.position.set(-2, 7, -4);
  scene.add(rimLight);

  // 6. Monitor Screen Point Light (activated smoothly during What I Do)
  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 2.5);
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
    gsap.to([keyLight, fillLight], {
      intensity: 2.0,
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
