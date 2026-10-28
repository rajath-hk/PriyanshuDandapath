import React, { useState, Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import SplineErrorBoundary from './SplineErrorBoundary';

// Resolves relative asset URLs dynamically for local fallback
const getAssetUrl = (path) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanBase}${cleanPath}`;
};

/**
 * SplineHeroScene Component
 * 
 * Embeds the user's exported production Spline 3D scene using native @splinetool/react-spline
 * on a transparent WebGL canvas.
 * 
 * Guarantees:
 * 1. Uses exact prod export: https://prod.spline.design/HiDA36ugzAdN7dr3/scene.splinecode
 * 2. Wrapped in SplineErrorBoundary: If any WebGL or network error occurs, the rest of the
 *    page NEVER crashes and stays 100% visible and interactive.
 * 3. Zero white background: 100% transparent canvas sitting seamlessly in the dark
 *    cinematic atmosphere.
 * 4. Preserves 3D interactive controls: orbit, mouse look-at, and idle animation.
 * 5. Intentional framing preserving thigh geometry without awkward stretching or clipping.
 */
export default function SplineHeroScene({ 
    sceneUrl = "https://prod.spline.design/HiDA36ugzAdN7dr3/scene.splinecode",
    className = "",
    onLoad
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [activeUrl, setActiveUrl] = useState(sceneUrl);

    const handleLoad = (splineApp) => {
        setIsLoaded(true);
        if (typeof window !== 'undefined') {
            window.__spline = splineApp;
        }

        // Ensure WebGL transparent clear color and null scene background for continuous blending
        try {
            if (splineApp._renderer) {
                splineApp._renderer.setClearColor(0x000000, 0);
            }
            if (splineApp._scene) {
                splineApp._scene.background = null;
            }
        } catch (_) {}

        // Responsive camera positioning:
        // Desktop: Center-right, head & upper body prominent beneath/integrated with PriyansArt
        // Mobile: Centered, pulled back for natural framing without cropping or distortion
        const updateCamera = () => {
            try {
                if (!splineApp || !splineApp._camera) return;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                if (isMobile) {
                    splineApp._camera.position.set(10, 162, 155);
                    if (splineApp._controls && splineApp._controls.target) {
                        splineApp._controls.target.set(10, 142, 0);
                    }
                } else {
                    splineApp._camera.position.set(10, 162, 138);
                    if (splineApp._controls && splineApp._controls.target) {
                        splineApp._controls.target.set(10, 142, 0);
                    }
                }
                splineApp._camera.updateProjectionMatrix();
            } catch (e) {
                console.warn("Spline camera framing note:", e);
            }
        };

        updateCamera();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateCamera);
        }

        if (onLoad) onLoad(splineApp);
    };

    const handleError = (err) => {
        console.warn("Spline production load warning, attempting local mirror:", err);
        // If external CDN fails, fallback to verified local copy
        const localPath = getAssetUrl('models/scene.splinecode');
        if (activeUrl !== localPath) {
            setActiveUrl(localPath);
        } else {
            setHasError(true);
        }
    };

    return (
        <div className={`relative w-full h-full flex items-center justify-center select-none bg-transparent overflow-visible ${className}`}>

            {/* Dark Atmospheric Loading State (Zero White Flicker) */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 bg-transparent">
                    <div className="relative flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-[#8B7CFF]/20 border-t-[#6EA8FF] animate-spin" />
                        <div className="absolute w-6 h-6 rounded-full bg-[#8B7CFF]/25 blur-md animate-pulse" />
                    </div>
                    <span className="mt-3 text-[10px] font-mono tracking-[0.25em] text-[#A6AFBF] uppercase">
                        CONNECTING 3D RUNTIME...
                    </span>
                </div>
            )}

            {/* Native Spline WebGL Canvas wrapped in Error Boundary */}
            <div className={`relative z-10 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <SplineErrorBoundary
                    onError={handleError}
                    fallback={
                        <div className="w-full h-full flex flex-col items-center justify-center pointer-events-none p-4">
                            <span className="text-[10px] font-mono tracking-widest text-[#A6AFBF] uppercase">
                                3D CHARACTER STANDBY
                            </span>
                        </div>
                    }
                >
                    <Suspense fallback={null}>
                        <Spline
                            scene={activeUrl}
                            onLoad={handleLoad}
                            onError={handleError}
                            className="w-full h-full block bg-transparent"
                            style={{
                                background: 'transparent',
                                backgroundColor: 'transparent',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Suspense>
                </SplineErrorBoundary>
            </div>
        </div>
    );
}
