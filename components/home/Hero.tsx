import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import HeroChaleco from "@/components/hero/HeroChaleco";

const credenciales = [
  "30+ años fabricando en Chile",
  "Aprobados por la Armada / DGTM",
  "Diseños personalizados",
  "Fabricación nacional",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/fondo-mar.webp" />
          <Image
            src="/hero/fondo-mar.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/30" />
      </div>

      <div className="mx-auto flex min-h-[88svh] max-w-[1240px] flex-col justify-center px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-200 uppercase">
              Vidanautica
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-6xl">
              Diseñados para proteger, hechos para durar
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
              +30 años fabricando chalecos salvavidas certificados en Chile para la
              industria salmonera, pesca, acuicultura y fuerzas armadas.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/#contacto"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-brand-600 px-7 py-3 text-base text-white hover:bg-brand-500"
                )}
              >
                Cotiza aquí
              </Link>
              <Link
                href="/productos/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/40 bg-white/5 px-7 py-3 text-base text-white hover:bg-white/15"
                )}
              >
                Ver productos
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <HeroChaleco />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-brand-900/60 backdrop-blur-sm">
        <ul className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-center text-sm font-medium text-brand-100 md:justify-between md:px-8">
          {credenciales.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
