// Tubes Cursor — CC BY-NC-SA 4.0
// Kevin Levron — https://www.framer.com/@kevin-levron/

const TUBE_COLORS = ['#6900c5', '#ff7b0f', '#de0067'];
const LIGHT_COLORS = ['#cf40ff', '#f70ab8', '#ff7b0f', '#9b43f0'];

function randomColors(count) {
  return Array.from({ length: count }, () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')}`
  );
}

function transparentizeRenderer(root) {
  const queue = [root];
  const seen = new Set();

  while (queue.length) {
    const obj = queue.shift();
    if (!obj || typeof obj !== 'object' || seen.has(obj)) continue;
    seen.add(obj);

    if (obj.isWebGLRenderer && typeof obj.setClearColor === 'function') {
      obj.setClearColor(0x000000, 0);
      if (typeof obj.setClearAlpha === 'function') obj.setClearAlpha(0);
      if (obj.domElement) obj.domElement.style.background = 'transparent';
      return true;
    }

    for (const key of Object.keys(obj)) {
      if (key === 'domElement' || key === 'parent') continue;
      try {
        queue.push(obj[key]);
      } catch {
        /* ignore */
      }
    }
  }
  return false;
}

async function initTubesCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('tubes-canvas');
  if (!canvas) return;

  try {
    const { default: TubesCursor } = await import(
      'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
    );

    const app = TubesCursor(canvas, {
      tubes: {
        colors: TUBE_COLORS,
        lights: {
          intensity: 200,
          colors: LIGHT_COLORS,
        },
      },
    });

    const applyTransparent = () => transparentizeRenderer(app);
    applyTransparent();
    requestAnimationFrame(applyTransparent);
    setTimeout(applyTransparent, 150);

    document.body.classList.add('tubes-cursor-enabled');

    document.body.addEventListener('click', () => {
      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    });
  } catch (err) {
    console.warn('Tubes cursor could not load:', err);
  }
}

function scheduleTubesCursor() {
  const run = () => initTubesCursor();
  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.addEventListener('load', () => setTimeout(run, 400), { once: true });
  }
}

if (document.readyState === 'complete') {
  scheduleTubesCursor();
} else {
  window.addEventListener('load', scheduleTubesCursor, { once: true });
}
