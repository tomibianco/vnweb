import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { productos } from "@/lib/productos";

export default function ProductosGrid() {
  return (
    <section aria-labelledby="productos-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
            Catálogo
          </p>
          <h2 id="productos-heading" className="mt-3 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
            Chalecos salvavidas para cada actividad
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((p) => (
            <Link
              key={p.slug}
              href={`/productos/${p.slug}/`}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src={p.imagenes[0].src}
                  alt={p.imagenes[0].alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-brand-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Tipo {p.tipo}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-5">
                <h3 className="font-heading text-base font-bold text-brand-900">{p.nombre}</h3>
                <ArrowRight className="size-5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
