import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gracias por contactarnos",
  robots: { index: false, follow: false },
  alternates: { canonical: "/confirmacion/" },
};

export default function ConfirmacionPage() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center px-5 py-24 text-center">
      <div className="max-w-lg">
        <h1 className="font-heading text-3xl font-bold text-brand-900 md:text-4xl">
          Gracias por contactarnos.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hemos recibido tu solicitud y la estamos revisando. Nos pondremos en contacto contigo a la
          brevedad.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 rounded-full bg-brand-600 px-6 text-white hover:bg-brand-700"
          )}
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
