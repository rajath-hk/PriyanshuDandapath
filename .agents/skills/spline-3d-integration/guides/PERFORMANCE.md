# Spline 3D Performance & Mobile Optimization Guide

Real-time 3D consumes significant GPU, memory, and battery. Following these optimization steps guarantees 60fps and smooth performance across mobile and desktop.

---

## 1. Spline Editor Settings (Before Export)

Most performance gains happen directly in the Spline editor before generating your `.splinecode` URL:

1. **Geometry Quality**:
   - In Spline Editor → **Export** → **Play Settings** → set **Quality** to **Performance** or **Medium** rather than High.
2. **Polycount and Subdivisions**:
   - Avoid excessive subdivisions or rounded mesh extrusions.
   - Decimate high-poly models into low-poly meshes.
3. **Texture Resolution**:
   - Keep textures to 1024x1024 or 512x512 where possible. Avoid 4K textures in web scenes.
4. **Lighting & Shadows**:
   - Real-time soft shadows and multiple point lights are expensive.
   - Bake shadows or lighting into textures if possible.
5. **Post-Processing Effects**:
   - Disable Bloom, Depth of Field, or Motion Blur unless strictly necessary.

---

## 2. Lazy Loading & Intersection Observer

Never load 3D scenes below the fold until the user scrolls near them.

```tsx
import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export function LazySpline({ sceneUrl }: { sceneUrl: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before appearing
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[500px] relative">
      {isVisible ? (
        <Spline scene={sceneUrl} />
      ) : (
        <div className="w-full h-full bg-slate-900 animate-pulse rounded-xl" />
      )}
    </div>
  );
}
```

---

## 3. Pause Rendering When Offscreen

When the canvas is scrolled out of view, you should pause rendering or limit animation overhead to conserve GPU and battery life:

```javascript
const observer = new IntersectionObserver(([entry]) => {
  if (!entry.isIntersecting) {
    // When out of view, set quality lower or stop animations
    app.setQuality(0.5);
  } else {
    app.setQuality(1);
  }
});

observer.observe(canvas);
```

---

## 4. Mobile Fallbacks & Responsive Strategy

On low-tier mobile devices, interactive 3D can cause stuttering or overheating. Use fallback posters:

1. **Export a WebP poster image or lightweight WebM loop** from the Spline scene.
2. **Detect mobile / low-power mode:**

```tsx
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export function ResponsiveSplineScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 2 && window.innerWidth < 1024));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-[400px] relative overflow-hidden flex items-center justify-center">
        <img 
          src="/images/3d-scene-poster.webp" 
          alt="3D Preview" 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] relative">
      <Spline scene="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode" />
    </div>
  );
}
```

---

## 5. WebGL Context Loss Handling

Devices with limited VRAM may terminate the WebGL context. Listen for context loss to prevent blank screens or hard crashes:

```javascript
const canvas = document.getElementById('canvas3d');

canvas.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  console.warn('WebGL context lost. Pausing Spline...');
  // Display fallback poster image
});

canvas.addEventListener('webglcontextrestored', () => {
  console.info('WebGL context restored. Reloading scene...');
  app.load(sceneUrl);
});
```
