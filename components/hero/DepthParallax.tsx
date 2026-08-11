'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  /** Imagen con fondo transparente (webp/png) */
  src: string;
  /** Mapa de profundidad en escala de grises, mismo encuadre */
  depthSrc: string;
  /** Intensidad del desplazamiento. 0.02–0.06 es el rango util */
  strength?: number;
  /** Brillo que sigue al cursor. 0 lo desactiva */
  sheen?: number;
  /** Amplitud del flotado automatico cuando no hay cursor */
  drift?: number;
  /** Se dispara cuando las texturas cargaron y el canvas ya pinta */
  onReady?: () => void;
  className?: string;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform sampler2D uDepth;
  uniform vec2 uPointer;   // -1..1
  uniform float uStrength;
  uniform float uSheen;
  varying vec2 vUv;

  void main() {
    vec2 dir = uPointer * uStrength;

    // Refinamiento iterativo: cada pasada corrige la profundidad leida
    // en la posicion desplazada, en vez de asumir la del pixel original.
    vec2 uv = vUv;
    for (int i = 0; i < 4; i++) {
      float d = texture2D(uDepth, uv).r;
      uv = vUv - dir * (d - 0.5);
    }

    // Fuera del encuadre no hay dato: transparente en vez de estirar el borde.
    vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
    vec4 color = texture2D(uMap, uv) * inside.x * inside.y;

    if (uSheen > 0.0) {
      // Normal aproximada a partir del gradiente del mapa de profundidad
      float e = 0.004;
      float dx = texture2D(uDepth, uv + vec2(e, 0.0)).r - texture2D(uDepth, uv - vec2(e, 0.0)).r;
      float dy = texture2D(uDepth, uv + vec2(0.0, e)).r - texture2D(uDepth, uv - vec2(0.0, e)).r;
      vec3 normal = normalize(vec3(-dx, -dy, 0.06));
      vec3 light = normalize(vec3(uPointer.x, uPointer.y, 0.9));
      float spec = pow(max(dot(normal, light), 0.0), 2.0);
      color.rgb += spec * uSheen * color.a;
    }

    gl_FragColor = color;
  }
`;

export default function DepthParallax({
  src,
  depthSrc,
  strength = 0.045,
  sheen = 0.25,
  drift = 0.35,
  className,
  onReady,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let pending = 2;
    const settle = () => {
      if (--pending === 0) onReadyRef.current?.();
    };
    const loader = new THREE.TextureLoader();
    const map = loader.load(src, settle, undefined, settle);
    map.colorSpace = THREE.SRGBColorSpace;
    const depth = loader.load(depthSrc, settle, undefined, settle);
    depth.colorSpace = THREE.NoColorSpace;
    for (const t of [map, depth]) {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    }

    const uniforms = {
      uMap: { value: map },
      uDepth: { value: depth },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uStrength: { value: strength },
      uSheen: { value: sheen },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true })
    );
    scene.add(mesh);
    host.appendChild(renderer.domElement);

    // Encaje "contain": la imagen es cuadrada, el contenedor casi nunca lo es.
    const IMAGE_ASPECT = 1;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const boxAspect = w / h;
      const scale =
        boxAspect > IMAGE_ASPECT
          ? new THREE.Vector3(IMAGE_ASPECT / boxAspect, 1, 1)
          : new THREE.Vector3(1, boxAspect / IMAGE_ASPECT, 1);
      mesh.scale.copy(scale);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    // Puntero: objetivo crudo + valor amortiguado. El lerp es lo que separa
    // un efecto agradable de uno nervioso.
    const target = new THREE.Vector2(0, 0);
    const current = new THREE.Vector2(0, 0);
    let pointerActive = false;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointerActive = true;
      const rect = host.getBoundingClientRect();
      target.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };
    const onPointerLeave = () => {
      pointerActive = false;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    // Pausa el loop cuando el hero sale de pantalla.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();

      if (!pointerActive) {
        // Deriva lenta en lissajous: se mueve solo, sin loop obvio.
        target.set(Math.sin(t * 0.4) * drift, Math.sin(t * 0.27) * drift * 0.6);
      }
      current.lerp(target, 0.045);
      uniforms.uPointer.value.copy(current);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      mesh.geometry.dispose();
      (mesh.material as THREE.ShaderMaterial).dispose();
      map.dispose();
      depth.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [src, depthSrc, strength, sheen, drift]);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
