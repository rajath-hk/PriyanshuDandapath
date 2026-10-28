# React, Next.js & Vue Spline Integration Guide

This guide details best practices for integrating Spline 3D into modern reactive frontend frameworks.

---

## 1. React & Vite Integration

### Installation

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

### Basic Component

```tsx
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

export default function HeroScene() {
  const splineRef = useRef<Application | null>(null);

  function onLoad(splineApp: Application) {
    splineRef.current = splineApp;
    console.log('Spline scene initialized');
  }

  function handleTrigger() {
    if (!splineRef.current) return;
    // Programmatically trigger events or modify variables
    splineRef.current.emitEvent('mouseClick', 'InteractiveBox');
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <Spline
        scene="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode"
        onLoad={onLoad}
      />
      <button 
        onClick={handleTrigger}
        className="absolute bottom-6 left-6 z-10 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Trigger Animation
      </button>
    </div>
  );
}
```

---

## 2. Next.js (App Router & Pages Router)

Spline relies directly on WebGL and the browser `window` object. **It must NOT be rendered on the server during SSR.**

### Next.js App Router (Client Component with Dynamic Import)

```tsx
'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamic import with ssr: false
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-900 text-slate-400">
      <div className="animate-pulse">Loading 3D Scene...</div>
    </div>
  ),
});

export default function SplineClientHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-screen bg-slate-950">
      <Spline
        scene="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-white">
          <span>Preparing 3D experience...</span>
        </div>
      )}
    </div>
  );
}
```

### Alternative: `@splinetool/react-spline/next`

The Spline library also exposes a dedicated Next.js export:

```tsx
'use client';
import Spline from '@splinetool/react-spline/next';

export default function Page() {
  return (
    <Spline scene="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode" />
  );
}
```

---

## 3. Vue 3 Integration

### Installation

```bash
npm install @splinetool/vue-spline @splinetool/runtime
```

### Vue Component

```vue
<script setup>
import { ref } from 'vue';
import Spline from '@splinetool/vue-spline';

const splineApp = ref(null);

const onLoad = (app) => {
  splineApp.value = app;
};

const triggerAction = () => {
  if (splineApp.value) {
    splineApp.value.emitEvent('mouseClick', 'InteractiveButton');
  }
};
</script>

<template>
  <div class="spline-wrapper">
    <Spline 
      scene="https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode"
      :onLoad="onLoad"
    />
  </div>
</template>

<style scoped>
.spline-wrapper {
  width: 100%;
  height: 100vh;
}
</style>
```

---

## 4. Key React Best Practices

1. **Keep references stable**: Store the `Application` instance in a React `useRef` rather than state to avoid unnecessary re-renders.
2. **Clean up listeners**: If you attach custom `window.addEventListener` or external observer listeners tied to the scene, remove them in `useEffect` cleanup.
3. **Handle unmounts**: `@splinetool/react-spline` handles internal disposal automatically when unmounted.
