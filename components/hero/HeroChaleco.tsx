'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// three.js nunca entra al bundle inicial: la imagen estatica es el LCP
// y el canvas se monta despues, en el cliente.
const DepthParallax = dynamic(() => import('./DepthParallax'), { ssr: false });

// El parallax reacciona al movimiento del puntero: en pantallas tactiles no se
// aprecia y solo costaria descargar three.js. La misma consulta se usa en CSS
// (variante `con-mouse`) para elegir la imagen, de modo que el <picture>
// descargue una sola de las dos.
const CON_MOUSE = '(hover: hover) and (pointer: fine)';

export default function HeroChaleco() {
  const [conMouse, setConMouse] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(CON_MOUSE);
    const aplicar = () => setConMouse(mq.matches);
    aplicar();
    mq.addEventListener('change', aplicar);
    return () => mq.removeEventListener('change', aplicar);
  }, []);

  return (
    <div className="relative aspect-square w-full max-w-[520px] con-mouse:[filter:saturate(1.15)_brightness(1.48)_contrast(0.9)]">
      {/*
        <picture> en vez de next/image: el navegador resuelve la media query en
        el preload scanner y baja un solo archivo. Ambos webp ya vienen
        optimizados, asi que no hay nada que ganar pasandolos por el optimizador.
        No se declaran width/height porque cada fuente tiene su proporcion: el
        contenedor aspect-square ya reserva el espacio y evita el CLS.
      */}
      <picture>
        <source media={CON_MOUSE} srcSet="/hero/chaleco.webp" />
        <img
          src="/hero/chaleco-aqua.webp"
          alt="Chaleco salvavidas Vidanautica en amarillo fluor, vista frontal"
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
            enhanced ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </picture>

      {conMouse && (
        <DepthParallax
          src="/hero/chaleco.webp"
          depthSrc="/hero/chaleco-depth.png"
          strength={0.015}
          sheen={0.05}
          onReady={() => setEnhanced(true)}
          className={`absolute inset-0 transition-opacity duration-700 ${
            enhanced ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
