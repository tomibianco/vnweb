'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// three.js nunca entra al bundle inicial: la imagen estatica es el LCP
// y el canvas se monta despues, en el cliente.
const DepthParallax = dynamic(() => import('./DepthParallax'), { ssr: false });

export default function HeroChaleco() {
  const [enhanced, setEnhanced] = useState(false);

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <Image
        src="/hero/chaleco.webp"
        alt="Chaleco salvavidas de flotabilidad asistida, amarillo fluor y navy"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 520px"
        className={`object-contain transition-opacity duration-700 ${
          enhanced ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <DepthParallax
        src="/hero/chaleco.webp"
        depthSrc="/hero/chaleco-depth.png"
        strength={0.045}
        sheen={0.25}
        onReady={() => setEnhanced(true)}
        className={`absolute inset-0 transition-opacity duration-700 ${
          enhanced ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
