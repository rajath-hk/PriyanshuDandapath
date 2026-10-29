import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

/**
 * Applies tailored PBR materials for the 3D character:
 * - Natural soft warm skin tone with peach undertones for face, ears, neck, hands
 * - Glossy deep black hair with subtle violet and magenta highlights
 * - Dark charcoal eyebrows
 * - Expressive rich purple eyes with crisp cornea reflections
 * - Sophisticated charcoal-black outfit with tasteful violet ambient depth
 * - Dark space-titanium laptop and keyboard keys
 */
function applyCharacterMaterials(character: THREE.Object3D) {
  character.traverse((child: any) => {
    if (!child.isMesh) return;
    const mesh = child as THREE.Mesh;
    const name = child.name || "";
    const lower = name.toLowerCase();

    child.castShadow = false;
    child.receiveShadow = false;
    mesh.frustumCulled = true;

    const origMat = mesh.material as THREE.MeshStandardMaterial;

    // 1. Skin: Face (Plane007 / Plane.007), Ears (Ear001 / Ear.001), Neck (Neck), Hands (Hand)
    if (
      name.includes("Plane007") ||
      name.includes("Plane.007") ||
      lower.includes("face") ||
      lower.includes("ear") ||
      lower.includes("neck") ||
      lower.includes("hand")
    ) {
      const skinMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      skinMat.color.set("#dfa48c"); // Soft natural warm skin with peach undertones
      skinMat.roughness = 0.65;      // Diffuse matte surface - eliminates white plastic shine
      skinMat.metalness = 0.0;
      skinMat.emissive.set("#241008"); // Subtle subcutaneous warm undertone in deep shadow
      skinMat.emissiveIntensity = 0.08;
      skinMat.vertexColors = false;   // Ensure uniform skin tone
      skinMat.precision = "mediump";
      mesh.material = skinMat;
    }
    // 2. Hair: Deep black with subtle violet-magenta highlights & glossy reflections
    else if (name === "hair" || lower.includes("hair")) {
      const hairMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      hairMat.color.set("#0c0a10"); // Deep black
      hairMat.roughness = 0.26;     // Glossy, smooth specular reflections
      hairMat.metalness = 0.18;     // Crisp glossy reflections
      hairMat.emissive.set("#250c35"); // Subtle violet-magenta sheen
      hairMat.emissiveIntensity = 0.15;
      hairMat.precision = "mediump";
      mesh.material = hairMat;
    }
    // 3. Eyebrows: Dark charcoal black
    else if (name === "Eyebrow" || lower.includes("eyebrow")) {
      const browMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      browMat.color.set("#131116"); // Dark charcoal black
      browMat.roughness = 0.72;
      browMat.metalness = 0.0;
      browMat.precision = "mediump";
      mesh.material = browMat;
    }
    // 4. Eyes: Expressive, rich purple irises with glossy cornea
    else if (name.includes("EYEs") || lower.includes("eye")) {
      const eyeMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      eyeMat.color.set("#ffffff");
      eyeMat.roughness = 0.08;      // Glassy, crisp cornea reflection
      eyeMat.metalness = 0.0;
      eyeMat.emissive.set("#5c229e"); // Rich violet-purple iris vibrancy
      eyeMat.emissiveIntensity = 0.26;
      eyeMat.precision = "mediump";
      mesh.material = eyeMat;
    }
    // 5. Clothing - Shirt / Hoodie: Sophisticated charcoal-black outfit with tasteful violet accents
    else if (name.includes("BODYSHIRT") || name.includes("BODY.SHIRT") || lower.includes("shirt") || lower.includes("body")) {
      const shirtMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      shirtMat.color.set("#16141c"); // Sophisticated deep charcoal
      shirtMat.roughness = 0.76;     // High-end matte fabric texture
      shirtMat.metalness = 0.06;
      shirtMat.emissive.set("#26143c"); // Tasteful subtle violet ambient depth
      shirtMat.emissiveIntensity = 0.16;
      shirtMat.precision = "mediump";
      mesh.material = shirtMat;
    }
    // 6. Clothing - Pants: Deep midnight charcoal
    else if (name.includes("Pant") || lower.includes("pant")) {
      const pantMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      pantMat.color.set("#100e15");
      pantMat.roughness = 0.82;
      pantMat.metalness = 0.03;
      pantMat.emissive.set("#190c28");
      pantMat.emissiveIntensity = 0.10;
      pantMat.precision = "mediump";
      mesh.material = pantMat;
    }
    // 7. Shoes & Soles
    else if (name.includes("Shoe") || lower.includes("shoe")) {
      const shoeMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      shoeMat.color.set("#14121a");
      shoeMat.roughness = 0.58;
      shoeMat.metalness = 0.12;
      shoeMat.precision = "mediump";
      mesh.material = shoeMat;
    } else if (name.includes("Sole") || lower.includes("sole")) {
      const soleMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      soleMat.color.set("#1e172a");
      soleMat.roughness = 0.65;
      soleMat.metalness = 0.05;
      soleMat.precision = "mediump";
      mesh.material = soleMat;
    }
    // 8. Laptop casing
    else if (name.includes("Cube002") || name.includes("Cube.002")) {
      const laptopMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      laptopMat.color.set("#1c1a24");
      laptopMat.roughness = 0.32;
      laptopMat.metalness = 0.80;
      laptopMat.precision = "mediump";
      mesh.material = laptopMat;
    }
    // 9. Keyboard keys
    else if (name.startsWith("KEYS") || lower.includes("key")) {
      const keyMat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
      keyMat.color.set("#15131d");
      keyMat.roughness = 0.45;
      keyMat.metalness = 0.20;
      keyMat.precision = "mediump";
      mesh.material = keyMat;
    }
    // 10. Screen light and monitor screens
    else if (name === "screenlight" || name.includes("Plane004") || name.includes("Plane.004")) {
      if (mesh.material && !Array.isArray(mesh.material)) {
        (mesh.material as THREE.ShaderMaterial).precision = "mediump";
      }
    }
    // 11. Ground & desk planes
    else if (name === "ground" || name === "Plane" || name.includes("Plane002") || name.includes("Plane003")) {
      if (mesh.material && !Array.isArray(mesh.material)) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.roughness = 0.85;
        mat.metalness = 0.05;
        mat.precision = "mediump";
      }
    } else {
      if (mesh.material && !Array.isArray(mesh.material)) {
        (mesh.material as THREE.ShaderMaterial).precision = "mediump";
      }
    }
  });
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let modelUrl: string;
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          modelUrl = URL.createObjectURL(new Blob([encryptedBlob]));
        } catch (decryptErr) {
          console.warn("Using direct model fallback:", decryptErr);
          modelUrl = "/models/character.glb";
        }

        let character: THREE.Object3D;
        loader.load(
          modelUrl,
          async (gltf) => {
            character = gltf.scene;

            // Apply premium custom PBR materials
            applyCharacterMaterials(character);

            await renderer.compileAsync(character, camera, scene);

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character!.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character!.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
