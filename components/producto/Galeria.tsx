"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Imagen = { src: string; alt: string };

export default function Galeria({ imagenes }: { imagenes: Imagen[] }) {
  const [index, setIndex] = useState(0);
  const actual = imagenes[index];

  const anterior = () => setIndex((i) => (i - 1 + imagenes.length) % imagenes.length);
  const siguiente = () => setIndex((i) => (i + 1) % imagenes.length);

  return (
    <div className="lg:sticky lg:top-28">
      <div
        className="relative aspect-square overflow-hidden rounded-3xl bg-secondary"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") anterior();
          if (e.key === "ArrowRight") siguiente();
        }}
        tabIndex={0}
        role="group"
        aria-label="Galería de imágenes del producto"
      >
        <Image
          key={actual.src}
          src={actual.src}
          alt={actual.alt}
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-contain p-8"
        />

        {imagenes.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Imagen anterior"
              className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-900 shadow-md transition-colors hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={siguiente}
              aria-label="Imagen siguiente"
              className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-900 shadow-md transition-colors hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {imagenes.length > 1 && (
        <div className="mt-4 flex gap-3">
          {imagenes.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary transition-colors",
                i === index ? "border-brand-600" : "border-transparent hover:border-border"
              )}
            >
              <Image src={img.src} alt="" fill sizes="64px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
