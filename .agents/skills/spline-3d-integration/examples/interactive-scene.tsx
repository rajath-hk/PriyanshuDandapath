import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

/**
 * Interactive React component demonstrating:
 * 1. Object lookup with `findObjectByName`
 * 2. Emitting trigger events
 * 3. Updating Spline variables dynamically
 * 4. Responding to scene events (mouseDown, mouseHover)
 */
export default function InteractiveSplineScene() {
  const splineRef = useRef<Application | null>(null);
  const [clickedTarget, setClickedTarget] = useState<string>('None');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Called when scene is downloaded and WebGL context is active
  function onLoad(splineApp: Application) {
    splineRef.current = splineApp;

    // Listen for internal Spline interaction events
    splineApp.addEventListener('mouseDown', (e) => {
      console.log('Object clicked in 3D:', e.target.name);
      setClickedTarget(e.target.name || 'Unknown Object');
    });
  }

  // Example: Programmatically trigger an event configured in Spline
  function triggerAction(eventName: string, targetName?: string) {
    if (!splineRef.current) return;
    splineRef.current.emitEvent(eventName as any, targetName);
  }

  // Example: Change numeric Spline variable (e.g., controlling speed or state)
  function handleSpeedChange(newSpeed: number) {
    setRotationSpeed(newSpeed);
    if (!splineRef.current) return;
    try {
      splineRef.current.setVariable('Speed', newSpeed);
    } catch (e) {
      console.warn('Spline variable "Speed" not found in editor:', e);
    }
  }

  // Example: Toggle boolean Spline variable
  function toggleTheme() {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (!splineRef.current) return;
    try {
      splineRef.current.setVariable('IsDarkMode', nextMode);
    } catch (e) {
      console.warn('Spline variable "IsDarkMode" not found in editor:', e);
    }
  }

  return (
    <div className="relative w-full h-[700px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 3D Viewport */}
      <Spline
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        onLoad={onLoad}
      />

      {/* Control Panel Overlay */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-3 bg-slate-950/70 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 text-white min-w-[260px]">
        <h3 className="font-semibold text-sm tracking-wide uppercase text-indigo-400">
          Scene Controls
        </h3>

        <div className="text-xs text-slate-300">
          Last Clicked: <span className="font-mono text-amber-400">{clickedTarget}</span>
        </div>

        <button
          onClick={() => triggerAction('mouseClick', 'InteractiveCube')}
          className="px-3 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition rounded-lg"
        >
          Trigger Cube Animation
        </button>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-xs text-slate-400">
            Variable: Speed ({rotationSpeed}x)
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={rotationSpeed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="mt-1 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 transition rounded-lg border border-slate-700"
        >
          Toggle Mode ({isDarkMode ? 'Dark' : 'Light'})
        </button>
      </div>
    </div>
  );
}
