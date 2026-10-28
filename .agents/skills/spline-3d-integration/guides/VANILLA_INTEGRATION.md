# Vanilla HTML / JavaScript Spline Integration Guide

This guide covers how to integrate Spline 3D scenes into standard HTML/JS applications without frontend frameworks.

---

## Method 1: Web Component (`<spline-viewer>`)

The fastest and simplest embed method.

### 1. Include Script Tag

Add the Spline Viewer Web Component script to your `<head>` or before `</body>`:

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
```

### 2. Add Component to HTML

```html
<div class="spline-container">
  <spline-viewer 
    url="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode"
    loading-anim-type="spinner-small-dark">
  </spline-viewer>
</div>
```

### 3. Styling the Container

```css
.spline-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

spline-viewer {
  width: 100%;
  height: 100%;
  display: block;
}
```

---

## Method 2: Programmatic Control with `@splinetool/runtime`

Use this method when you need full JavaScript control (events, camera manipulation, variable changes, scene triggers).

### 1. Installation or CDN

**Via npm / bundler (Vite, Rollup, Webpack):**
```bash
npm install @splinetool/runtime
```

**Via ES Modules CDN:**
```html
<script type="module">
  import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';
</script>
```

### 2. HTML Canvas Setup

```html
<div class="canvas-wrapper">
  <canvas id="canvas3d"></canvas>
  <div id="loader" class="loader">Loading 3D experience...</div>
</div>
```

### 3. JavaScript Initialization & Runtime Control

```javascript
import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d');
const loader = document.getElementById('loader');

const app = new Application(canvas);

app.load('https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode')
  .then(() => {
    if (loader) loader.style.display = 'none';

    // 1. Finding Objects in the Scene
    const cube = app.findObjectByName('Cube');
    const camera = app.findObjectByName('Camera');

    // 2. Listening to Spline Scene Events
    app.addEventListener('mouseDown', (e) => {
      console.log('Clicked object:', e.target.name);
      if (e.target.name === 'Button') {
        app.emitEvent('mouseClick', 'InteractiveObject');
      }
    });

    // 3. Setting Spline Variables
    // Spline variables created in editor (Numbers, Booleans, Strings)
    app.setVariable('ColorMode', 2);
    app.setVariable('IsOpen', true);

    // 4. Reading Spline Variables
    const currentScore = app.getVariable('Score');

    // 5. Triggering Object Animations / Transitions
    // Emits an event targeted at an object or global event name
    app.emitEvent('keyDown', 'Character');
  })
  .catch((err) => {
    console.error('Failed to load Spline scene:', err);
    if (loader) loader.innerText = 'Failed to load 3D scene.';
  });

// Handle window resizing
window.addEventListener('resize', () => {
  // Runtime automatically adjusts canvas size if canvas CSS is 100%
});
```

---

## Cleaning Up / Disposing

When removing the canvas or navigating between pages:

```javascript
// Clean up canvas and WebGL resources
if (app) {
  app.dispose();
}
```
