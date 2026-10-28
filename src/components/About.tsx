import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p className="para">
          {config.about.description}
        </p>
        {config.about.philosophy && (
          <p className="para" style={{ marginTop: "1rem", opacity: 0.85, fontSize: "0.95em" }}>
            {config.about.philosophy}
          </p>
        )}
      </div>
    </div>
  );
};

export default About;
