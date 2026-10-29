import { useEffect, useState, useRef } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { config } from "../config";

interface LoadingProps {
  percent: number;
}

// Module-level flag: prevents preloader from re-running on internal page navigation (e.g. returning from /myworks)
let hasInitiallyLoaded = false;

export const hasPageInitiallyLoaded = () => hasInitiallyLoaded;

const Loading = ({ percent }: LoadingProps) => {
  const { setIsLoading } = useLoading();
  const [displayPercent, setDisplayPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const exitTriggeredRef = useRef(false);

  // Sync incoming 3D progress when higher than current display
  useEffect(() => {
    if (percent > displayPercent) {
      setDisplayPercent((prev) => Math.max(prev, percent));
    }
  }, [percent, displayPercent]);

  // Smooth, believable progress timer
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    // Mobile runs snappy (approx 1.1s total); Desktop aligns with 3D model compiling
    const intervalMs = isMobile ? 35 : 45;

    const timer = setInterval(() => {
      setDisplayPercent((current) => {
        if (current >= 100) {
          clearInterval(timer);
          return 100;
        }

        // If incoming 3D percent is ahead, jump to it
        if (percent > current) {
          return percent;
        }

        // Progression stages:
        // 0-45%: rapid initialization
        // 45-85%: compiling shaders & assets
        // 85-92%: holding briefly for final 3D scene compile (unless mobile)
        if (current < 45) {
          return current + Math.floor(Math.random() * 4) + 2;
        } else if (current < 85) {
          return current + Math.floor(Math.random() * 3) + 1;
        } else if (isMobile || percent >= 90) {
          return Math.min(current + 2, 100);
        } else if (current < 92) {
          return current + 1;
        }
        return current;
      });
    }, intervalMs);

    // Guaranteed fallback timeout: prevent trapping visitors indefinitely
    const maxWaitMs = isMobile ? 2200 : 3400;
    const safetyTimer = setTimeout(() => {
      setDisplayPercent(100);
    }, maxWaitMs);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
    };
  }, [percent]);

  // Handle completion and smooth exit
  useEffect(() => {
    if (displayPercent >= 100 && !exitTriggeredRef.current) {
      exitTriggeredRef.current = true;
      setIsDone(true);

      // Brief hold at 100% so user perceives completion
      const exitHoldTimer = setTimeout(() => {
        setIsExiting(true);

        // Trigger entrance animations in the hero section simultaneously
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) {
            module.initialFX();
          }
        });

        // After fade-out transition (700ms), unmount preloader from DOM
        const unmountTimer = setTimeout(() => {
          hasInitiallyLoaded = true;
          setIsLoading(false);
          document.body.style.overflowY = "auto";
        }, 700);

        return () => clearTimeout(unmountTimer);
      }, 350);

      return () => clearTimeout(exitHoldTimer);
    }
  }, [displayPercent, setIsLoading]);

  return (
    <div
      className={`loading-screen ${isExiting ? "loading-exit" : ""}`}
      aria-label="PriyansArt Portfolio Loading"
      role="progressbar"
      aria-valuenow={displayPercent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Dark atmospheric radial glow */}
      <div className="loading-ambient-glow" />

      {/* Minimal Top Brand Bar */}
      <header className="loading-top-bar">
        <div className="loading-brand-id">
          <span className="brand-dot-pulse" />
          <span className="brand-name">{config.developer.brandName.toUpperCase()}</span>
        </div>
        <div className="loading-sys-tag">
          <span>PORTFOLIO SYSTEM</span>
        </div>
      </header>

      {/* Centered Editorial Brand Card */}
      <div className="loading-card-center">
        {/* Glowing Monogram Circle */}
        <div className="loading-monogram-circle">
          <span className="loading-monogram">{config.developer.monogram}</span>
          <div className="monogram-glow-ring" />
        </div>

        {/* Brand Title & Role */}
        <h1 className="loading-brand-title">
          {config.developer.brandName}
        </h1>
        <p className="loading-roles-subtitle">
          VIDEO EDITOR <span className="role-sep">•</span> MOTION DESIGNER <span className="role-sep">•</span> AI FILMMAKER
        </p>

        {/* Precision Progress Track */}
        <div className="loading-progress-box">
          <div className="loading-track">
            <div
              className="loading-track-fill"
              style={{ width: `${displayPercent}%` }}
            />
          </div>

          <div className="loading-status-row">
            <span className="loading-status-label">
              {isDone
                ? "EXPERIENCE READY"
                : displayPercent < 35
                ? "INITIALIZING SYSTEM..."
                : displayPercent < 75
                ? "COMPOSITING VISUALS..."
                : "PREPARING SCENE..."}
            </span>
            <span className="loading-percent-value">{displayPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

/**
 * Connects 3D character loading progress to the preloader.
 * Preserves the exact signature expected by Scene.tsx.
 */
export const setProgress = (callback: (progress: number) => void) => {
  let isDone = false;
  let current = 0;

  const interval = setInterval(() => {
    if (!isDone && current < 92) {
      const step = Math.floor(Math.random() * 4) + 2;
      current = Math.min(current + step, 92);
      callback(current);
    } else if (isDone) {
      clearInterval(interval);
      callback(100);
    }
  }, 80);

  const fallbackTimeout = setTimeout(() => {
    if (!isDone) {
      isDone = true;
      clearInterval(interval);
      callback(100);
    }
  }, 3200);

  return {
    loaded: () => {
      isDone = true;
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
      callback(100);
      return Promise.resolve();
    },
  };
};
