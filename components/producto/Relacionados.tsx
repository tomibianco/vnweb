import Link from "next/link";
import Image from "next/image";
import { getProductosRelacionados } from "@/lib/productos";

export default function Relacionados({ slug }: { slug: string }) {
  const relacionados = getProductosRelacionados(slug);

  return (
    <section aria-labelledby="relacionados-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <h2 id="relacionados-heading" className="font-heading text-2xl font-bold text-brand-900 md:text-3xl">
          Otros modelos
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relacionados.map((p) => (
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
                  sizes="(max-width: 640px) 90vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-base font-bold text-brand-900">{p.nombre}</h3>
                {p.tipo && (
                  <p className="mt-1 text-sm text-muted-foreground">Tipo {p.tipo}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
