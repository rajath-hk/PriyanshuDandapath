import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/myworks" className="cta-btn cta-btn-play" data-cursor="disable">
          Explore All 16 Works →
        </Link>
        
        <a 
          href={`mailto:${config.social.email}`} 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Let's Talk →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
