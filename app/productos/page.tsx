import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";

export const metadata: Metadata = {
  title: "Chalecos salvavidas certificados",
  description:
    "Catálogo completo de chalecos salvavidas Vidanautica: deportivo, niños, aqua, costero, kayak, rescate y perros. Fabricación nacional y diseños personalizados.",
  alternates: { canonical: "/productos/" },
};

export default function ProductosHubPage() {
  return (
    <div className="px-5 pt-28 pb-20 md:px-8 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-2xl">
          <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
            Catálogo
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
            Chalecos salvavidas certificados
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Fabricamos chalecos salvavidas certificados y personalizados hace más de 30 años, con
            modelos aprobados por la Armada de Chile, la DGTM y la Guardia Costera de Estados
            Unidos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((p) => (
            <Link
              key={p.slug}
              href={`/productos/${p.slug}/`}
              className="group overflow-hidden rounded-3xl border border-border bg-white transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <Image
                  src={p.imagenes[0].src}
                  alt={p.imagenes[0].alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-brand-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Tipo {p.tipo}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-heading text-lg font-bold text-brand-900">{p.nombre}</h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
