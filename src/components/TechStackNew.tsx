import "./styles/TechStackNew.css";

interface ToolItem {
  name: string;
  category: string;
  icon: string;
  url: string;
}

// Inverted pyramid layout for creative & AI filmmaking tools
const creativeStack: ToolItem[][] = [
  // Row 1 - 5 items: Core Post-Production & 3D
  [
    { name: "Premiere Pro", category: "Editing", icon: "/images/tools/premiere.png", url: "https://www.adobe.com/products/premiere.html" },
    { name: "After Effects", category: "Motion VFX", icon: "/images/tools/aftereffects.png", url: "https://www.adobe.com/products/aftereffects.html" },
    { name: "DaVinci Resolve", category: "Color & Audio", icon: "/images/tools/davinci.png", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
    { name: "Blender", category: "3D Motion", icon: "/images/tools/blender.svg", url: "https://www.blender.org" },
    { name: "Spline 3D", category: "3D Web", icon: "/images/tools/spline.svg", url: "https://spline.design" },
  ],
  // Row 2 - 4 items: Design, Concept & Generative Art
  [
    { name: "Photoshop", category: "Thumbnails", icon: "/images/tools/photoshop.png", url: "https://www.adobe.com/products/photoshop.html" },
    { name: "Illustrator", category: "Graphics", icon: "/images/tools/illustrator.svg", url: "https://www.adobe.com/products/illustrator.html" },
    { name: "Midjourney", category: "AI Visuals", icon: "/images/tools/midjourney.svg", url: "https://www.midjourney.com" },
    { name: "Runway Gen-3", category: "AI Video", icon: "/images/tools/runway.svg", url: "https://runwayml.com" },
  ],
  // Row 3 - 3 items: Generative Video & Cinematic AI
  [
    { name: "Kling AI", category: "AI Motion", icon: "/images/tools/kling.svg", url: "https://klingai.com" },
    { name: "Luma Dream Machine", category: "AI Camera", icon: "/images/tools/luma.svg", url: "https://lumalabs.ai/dream-machine" },
    { name: "Topaz Video AI", category: "Upscaling", icon: "/images/tools/topaz.svg", url: "https://www.topazlabs.com/topaz-video-ai" },
  ],
  // Row 4 - 2 items: Sound Design & AI Voice
  [
    { name: "ElevenLabs", category: "Voice & SFX", icon: "/images/tools/elevenlabs.svg", url: "https://elevenlabs.io" },
    { name: "Sound Design", category: "Mastering", icon: "/images/tools/aftereffects.png", url: "#" },
  ],
];

const TechStackNew = () => {
  return (
    <div className="techstack-new" id="tools">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="techstack-video"
        >
          <source src="/videos/Banner-My-photoo.webm" type="video/webm" />
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Cinematic Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>Creative Suite &amp; AI Tools</h2>
        <p style={{ color: "#c4b5fd", opacity: 0.85, fontSize: "14px", marginTop: "-10px", marginBottom: "25px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Industry-Standard Post-Production · Motion Design · Generative AI
        </p>

        <div className="techstack-pyramid">
          {creativeStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target={tech.url !== "#" ? "_blank" : undefined}
                  rel={tech.url !== "#" ? "noopener noreferrer" : undefined}
                  className="techstack-item"
                  title={`${tech.name} (${tech.category})`}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
