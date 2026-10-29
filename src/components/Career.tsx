import "./styles/Career.css";

interface FocusItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const focusItems: FocusItem[] = [
  {
    number: "01",
    title: "Short-Form Storytelling",
    subtitle: "High-Retention Visual Pacing",
    description:
      "Fast-paced Reels, talking-head edits, and podcast highlights with deliberate pacing, clear visual hierarchy, and strong storytelling.",
    tags: ["Viral Retention", "Speed Ramping", "Hook Architecture", "Pattern Interrupts"],
  },
  {
    number: "02",
    title: "Motion Design & Visual Effects",
    subtitle: "Kinetic Typography & 3D Motion",
    description:
      "Kinetic typography, compositing, 3D elements, and motion graphics that make ideas visually engaging.",
    tags: ["Kinetic Typography", "2D/3D Animation", "VFX Compositing", "Brand Motion"],
  },
  {
    number: "03",
    title: "Long-Form & AI Filmmaking",
    subtitle: "Cinematic Narratives & GenAI",
    description:
      "Case studies, podcast episodes, music videos, SaaS product videos, and AI-assisted visual storytelling.",
    tags: ["Narrative Essays", "Multi-Cam Podcasts", "GenAI Workflows", "Sound Mastering"],
  },
];

const Career = () => {
  return (
    <section className="creative-focus-section career-section section-container" id="creative-focus">
      <div className="creative-focus-container">
        <div className="creative-focus-header">
          <span className="creative-focus-eyebrow">CORE DISCIPLINES</span>
          <h2 className="creative-focus-title">
            Creative <span>Focus</span>
          </h2>
          <p className="creative-focus-subtitle">
            Specialized visual engineering across short-form viral retention, motion branding, and generative cinematic storytelling.
          </p>
        </div>

        <div className="creative-focus-grid">
          {focusItems.map((item) => (
            <div key={item.number} className="creative-focus-card career-info-box">
              <div className="focus-card-top">
                <span className="focus-number-badge">{item.number}</span>
                <span className="focus-subtitle-tag">{item.subtitle}</span>
              </div>

              <h3 className="focus-item-title">{item.title}</h3>
              <p className="focus-item-desc">{item.description}</p>

              <div className="focus-tags-row">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="focus-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
