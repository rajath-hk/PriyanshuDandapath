import "./styles/TechStackNew.css";

interface ToolItem {
  name: string;
  role: string;
  icon: string;
  url: string;
}

interface ToolCategory {
  category: string;
  badge: string;
  tools: ToolItem[];
}

const toolCategories: ToolCategory[] = [
  {
    category: "Editing & Color",
    badge: "POST-PRODUCTION",
    tools: [
      {
        name: "Adobe Premiere Pro",
        role: "Rhythm & Pacing",
        icon: "/images/tools/premiere.png",
        url: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "DaVinci Resolve",
        role: "Color Grading & Mix",
        icon: "/images/tools/davinci.png",
        url: "https://www.blackmagicdesign.com/products/davinciresolve",
      },
    ],
  },
  {
    category: "Motion & 3D",
    badge: "VISUAL FX",
    tools: [
      {
        name: "Adobe After Effects",
        role: "Kinetic Motion & VFX",
        icon: "/images/tools/aftereffects.png",
        url: "https://www.adobe.com/products/aftereffects.html",
      },
      {
        name: "Blender",
        role: "3D Animation & Scenes",
        icon: "/images/tools/blender.svg",
        url: "https://www.blender.org",
      },
      {
        name: "Spline 3D",
        role: "Interactive 3D Web",
        icon: "/images/tools/spline.svg",
        url: "https://spline.design",
      },
    ],
  },
  {
    category: "Design",
    badge: "CREATIVE ASSETS",
    tools: [
      {
        name: "Adobe Photoshop",
        role: "Thumbnails & Matte",
        icon: "/images/tools/photoshop.png",
        url: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "Adobe Illustrator",
        role: "Vectors & Brand Marks",
        icon: "/images/tools/illustrator.svg",
        url: "https://www.adobe.com/products/illustrator.html",
      },
    ],
  },
  {
    category: "AI Filmmaking",
    badge: "GENERATIVE VIDEO",
    tools: [
      {
        name: "Midjourney",
        role: "Photoreal Concept Art",
        icon: "/images/tools/midjourney.svg",
        url: "https://www.midjourney.com",
      },
      {
        name: "Runway",
        role: "Gen-3 Cinematic Video",
        icon: "/images/tools/runway.svg",
        url: "https://runwayml.com",
      },
      {
        name: "Kling AI",
        role: "Realistic Motion Control",
        icon: "/images/tools/kling.svg",
        url: "https://klingai.com",
      },
      {
        name: "Luma Dream Machine",
        role: "Camera Movement & 3D",
        icon: "/images/tools/luma.svg",
        url: "https://lumalabs.ai/dream-machine",
      },
      {
        name: "Topaz Video AI",
        role: "4K Motion Upscaling",
        icon: "/images/tools/topaz.svg",
        url: "https://www.topazlabs.com/topaz-video-ai",
      },
      {
        name: "ElevenLabs",
        role: "Cinematic Voice & SFX",
        icon: "/images/tools/elevenlabs.svg",
        url: "https://elevenlabs.io",
      },
    ],
  },
];

const TechStackNew = () => {
  return (
    <section className="techstack-section" id="tools">
      <div className="techstack-container">
        {/* Section Header */}
        <div className="techstack-header">
          <span className="techstack-badge">SOFTWARE &amp; WORKFLOWS</span>
          <h2>Creative Suite &amp; AI Tools</h2>
          <p className="techstack-sub">
            Industry-standard post-production, motion graphics, and generative AI pipelines engineered for premium cinematic delivery.
          </p>
        </div>

        {/* 4 Categorized Studio Cards */}
        <div className="techstack-categories-grid">
          {toolCategories.map((cat, idx) => (
            <div key={idx} className="techstack-category-card">
              <div className="category-card-header">
                <span className="category-badge">{cat.badge}</span>
                <h3 className="category-title">{cat.category}</h3>
              </div>

              <div className="category-tools-list">
                {cat.tools.map((tool, tIdx) => (
                  <a
                    key={tIdx}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-badge-item"
                    title={`Visit ${tool.name} website`}
                    data-cursor="disable"
                  >
                    <div className="tool-icon-wrapper">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        loading="lazy"
                        decoding="async"
                        className="tool-icon-img"
                      />
                    </div>
                    <div className="tool-text-meta">
                      <span className="tool-item-name">{tool.name}</span>
                      <span className="tool-item-role">{tool.role}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackNew;
