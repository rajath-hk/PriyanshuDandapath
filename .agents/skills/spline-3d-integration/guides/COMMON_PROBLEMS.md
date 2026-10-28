# Spline 3D Debugging & Common Problems Guide

Troubleshooting guide for the most frequent issues encountered when embedding Spline 3D into web apps.

---

## 1. Scroll Hijacking (Page Cannot Scroll Over Spline Canvas)

### Problem
When users try to scroll down the page on touch devices or trackpads, the cursor lands on the Spline canvas and the page gets stuck because Spline captures wheel/touch events.

### Solution A: Disable Orbit / Pan / Zoom in Spline Editor
1. In Spline Editor, go to **Export** → **Play Settings**.
2. Turn OFF **Page Scroll**, **Orbit Controls**, **Zoom**, and **Pan** if not strictly necessary.
3. Click **Update** / **Generate Draft**.

### Solution B: CSS `pointer-events: none` with Targeted Overlays
If you only need background visuals without user interaction:
```css
.spline-background {
  position: absolute;
  inset: 0;
  pointer-events: none; /* Allow clicks and scrolling to pass through */
  z-index: 0;
}
```

If you only want clicks on specific UI buttons placed above Spline:
```css
.ui-layer {
  position: relative;
  z-index: 10;
  pointer-events: auto;
}
```

---

## 2. Layout Shift & Canvas Sizing Bugs (CLS)

### Problem
When the page loads, the canvas height collapses to 0px or jumps erratically, causing Cumulative Layout Shift (CLS).

### Solution
Always assign an explicit aspect ratio or defined dimensions to the wrapper container:
```css
.spline-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; /* or min-height: 500px */
  overflow: hidden;
}

.spline-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
```

---

## 3. Watermark / Spline Logo

### Spline Editor Play Settings
- If on a Spline paid plan, disable the watermark in **Play Settings** → **Hide Spline Logo**.

### CSS Shadow DOM Styling (When using `<spline-viewer>`)
The `<spline-viewer>` web component embeds a shadow root. If you need to hide the logo programmatically:
```css
/* In modern browsers supporting shadow parts */
spline-viewer::part(logo) {
  display: none !important;
}
```
Or via script:
```javascript
const viewer = document.querySelector('spline-viewer');
viewer.addEventListener('load', () => {
  const shadow = viewer.shadowRoot;
  const logo = shadow?.querySelector('#logo');
  if (logo) logo.remove();
});
```

---

## 4. Black / Unwanted Background Color

### Problem
The 3D scene renders with a solid grey or black background instead of blending transparently with your website's background.

### Solution
1. In Spline Editor → **Export** → **Play Settings** → enable **Hide Background**.
2. Click **Update** / **Generate Draft**.
3. In CSS, ensure the canvas background is transparent:
```css
canvas {
  background: transparent !important;
}
```

---

## 5. Next.js / SSR "window is not defined" Error

### Problem
Spline imports fail during server-side rendering or static generation:
`ReferenceError: window is not defined`

### Solution
Always use `next/dynamic` with `ssr: false`:
```tsx
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});
```

---

## 6. Memory Leaks on Page Navigation (SPA / Next.js)

### Problem
Navigating back and forth between pages creates multiple WebGL contexts and crashes mobile Safari with `WebGL: context lost`.

### Solution
Ensure the Spline application is properly disposed of when the component unmounts:
```tsx
useEffect(() => {
  let appInstance: Application | null = null;

  // When onLoad sets appInstance
  return () => {
    if (appInstance) {
      appInstance.dispose();
    }
  };
}, []);
```
