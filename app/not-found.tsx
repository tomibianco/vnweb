import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { productos } from "@/lib/productos";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center px-5 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
          Error 404
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
          No encontramos esta página
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Es posible que el enlace haya cambiado o que la página ya no exista. Te dejamos los
          accesos principales para que sigas navegando.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-brand-600 px-6 text-white hover:bg-brand-700"
            )}
          >
            Volver al inicio
          </Link>
          <Link
            href="/productos/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-6"
            )}
          >
            Ver productos
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-left">
          <p className="mb-4 text-center text-sm font-semibold text-brand-900">
            Nuestros chalecos salvavidas
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {productos.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/productos/${p.slug}/`}
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-brand-600 hover:underline"
                >
                  {p.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
