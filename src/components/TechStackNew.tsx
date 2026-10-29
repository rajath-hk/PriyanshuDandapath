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
        icon: "/images/tools/premiere.svg",
        url: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "DaVinci Resolve",
        role: "Color Grading & Mix",
        icon: "/images/tools/davinci.png",
        url: "https://www.blackmagicdesign.com/products/davinciresolve",
      },
      {
        name: "CapCut",
        role: "Short-Form Editing",
        icon: "/images/tools/capcut.svg",
        url: "https://www.capcut.com",
      },
    ],
  },
  {
    category: "Motion Design",
    badge: "ANIMATION & 3D",
    tools: [
      {
        name: "Adobe After Effects",
        role: "Motion Graphics & Animation",
        icon: "/images/tools/aftereffects.svg",
        url: "https://www.adobe.com/products/aftereffects.html",
      },
      {
        name: "Blender",
        role: "3D Modeling & Animation",
        icon: "/images/tools/blender.svg",
        url: "https://www.blender.org",
      },
      {
        name: "Duik Angela",
        role: "Character Rigging & Animation",
        icon: "/images/tools/duik.svg",
        url: "https://rxlaboratory.org/tools/duik-angela/",
      },
      {
        name: "Adobe Illustrator",
        role: "Vector Assets & Design",
        icon: "/images/tools/illustrator.svg",
        url: "https://www.adobe.com/products/illustrator.html",
      },
    ],
  },
  {
    category: "AI Filmmaking",
    badge: "GENERATIVE AI & PRODUCTION",
    tools: [
      {
        name: "Flow",
        role: "Generative Video & Prompts",
        icon: "/images/tools/flow.svg",
        url: "https://labs.google/flow",
      },
      {
        name: "Higgsfield AI",
        role: "Character & World Motion",
        icon: "/images/tools/higgsfield.png",
        url: "https://higgsfield.ai",
      },
      {
        name: "Kling AI",
        role: "Realistic Motion Control",
        icon: "/images/tools/kling.svg",
        url: "https://klingai.com",
      },
      {
        name: "Adobe Photoshop",
        role: "Generative Fill & Concepts",
        icon: "/images/tools/photoshop.svg",
        url: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "ElevenLabs",
        role: "Voice & Sound FX",
        icon: "/images/tools/elevenlabs.svg",
        url: "https://elevenlabs.io",
      },
    ],
  },
  {
    category: "Design",
    badge: "DIGITAL ART & GRAPHICS",
    tools: [
      {
        name: "Adobe Illustrator",
        role: "Vectors & Brand Marks",
        icon: "/images/tools/illustrator.svg",
        url: "https://www.adobe.com/products/illustrator.html",
      },
      {
        name: "Adobe Photoshop",
        role: "Thumbnails & Matte",
        icon: "/images/tools/photoshop.svg",
        url: "https://www.adobe.com/products/photoshop.html",
      },
      {
        name: "Procreate",
        role: "Digital Illustration & Art",
        icon: "/images/tools/procreate.png",
        url: "https://procreate.com",
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
