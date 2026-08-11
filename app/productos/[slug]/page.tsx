import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { productos, getProducto } from "@/lib/productos";
import { buttonVariants } from "@/components/ui/button";
import Breadcrumb from "@/components/producto/Breadcrumb";
import Galeria from "@/components/producto/Galeria";
import Specs from "@/components/producto/Specs";
import Relacionados from "@/components/producto/Relacionados";
import TablaTallas from "@/components/producto/TablaTallas";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) return {};

  return {
    title: { absolute: producto.titleSeo },
    description: producto.metaDescription,
    alternates: { canonical: `/productos/${producto.slug}/` },
    openGraph: {
      title: producto.titleSeo,
      description: producto.metaDescription,
      url: `/productos/${producto.slug}/`,
      images: [{ url: producto.imagenes[0].src }],
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.h1,
    description: producto.metaDescription,
    image: producto.imagenes.map((img) => `${site.url}${img.src}`),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name },
    material: "Tela Oxford 300/300, espuma de celda cerrada EPE",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Tipo de chaleco", value: producto.tipo },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${site.url}/productos/` },
      {
        "@type": "ListItem",
        position: 3,
        name: producto.nombre,
        item: `${site.url}/productos/${producto.slug}/`,
      },
    ],
  };

  return (
    <div className="px-5 pt-28 pb-8 md:px-8 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-[1240px]">
        <Breadcrumb nombre={producto.nombre} />

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Galeria imagenes={producto.imagenes} />

          <div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              Tipo {producto.tipo}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
              {producto.h1}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{producto.intro}</p>

            <div className="mt-8">
              <Specs producto={producto} />
            </div>

            {producto.tablaTallas && <TablaTallas tabla={producto.tablaTallas} />}

            <Link
              href={`/?producto=${encodeURIComponent(producto.valorForm)}#contacto`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-10 w-full rounded-full bg-brand-600 px-6 py-3 text-base text-white hover:bg-brand-700 sm:w-auto"
              )}
            >
              Cotiza aquí
            </Link>
          </div>
        </div>
      </div>

      <Relacionados slug={producto.slug} />
    </div>
  );
}
