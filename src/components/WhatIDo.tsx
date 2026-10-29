import { useState, KeyboardEvent } from "react";
import "./styles/WhatIDo.css";
import { config } from "../config";
import { MdExpandMore } from "react-icons/md";

interface SkillCardData {
  title: string;
  description: string;
  details: string;
  tools: string[];
}

const WhatIDo = () => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
  });

  const cards: SkillCardData[] = [
    config.skills.develop,
    config.skills.design,
  ];

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCard(index);
    }
  };

  return (
    <div className="whatIDO" id="what-i-do">
      {/* Left Section Heading */}
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            &nbsp;I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      {/* Right Service Cards Container */}
      <div className="what-box">
        <div className="what-box-in">
          {cards.map((card, index) => {
            const isExpanded = Boolean(expandedCards[index]);
            return (
              <div
                key={index}
                className={`what-content ${isExpanded ? "what-content-expanded" : ""}`}
                onClick={() => toggleCard(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${card.title} - Click to toggle tool details`}
                data-cursor="pointer"
              >
                {/* 4 Corner Sci-Fi Brackets */}
                <div className="what-corner"></div>

                {/* Card Content Block */}
                <div className="what-content-in">
                  <h3 className="what-card-title">{card.title}</h3>
                  <h4 className="what-card-subtitle">{card.description}</h4>
                  <p className="what-card-details">{card.details}</p>

                  {/* Expandable Skills Drawer */}
                  <div
                    className={`what-skills-drawer ${
                      isExpanded ? "drawer-open" : ""
                    }`}
                  >
                    <h5 className="what-skills-heading">Skillset &amp; Tools</h5>
                    <div className="what-content-flex">
                      {card.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="what-tags">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Toggle Bar with Animated Arrow */}
                  <div className="what-card-bottom">
                    <span className="what-toggle-label">
                      {isExpanded ? "Hide Skillset" : "View Skillset & Tools"}
                    </span>
                    <div
                      className={`what-arrow-btn ${
                        isExpanded ? "arrow-rotated" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <MdExpandMore size={20} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
