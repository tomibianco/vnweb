"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[70svh] items-center justify-center px-5 py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
          Algo salió mal
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
          No pudimos cargar esta sección
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ocurrió un error inesperado. Puedes reintentar o escribirnos directamente a{" "}
          <a href="mailto:ventas@vidanautica.cl" className="text-brand-600 underline">
            ventas@vidanautica.cl
          </a>
          .
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-700"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-base font-medium text-brand-900 transition-colors hover:bg-secondary"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
