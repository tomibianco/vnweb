import Image from "next/image";

export default function Nosotros() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-heading" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/hero/chaleco-banner.webp"
            alt="Persona cosiendo con máquina un chaleco salvavidas con el logo de Vidanautica"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-600/25 mix-blend-color" />
        </div>

        <div>
          <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-600 uppercase">
            ¿Quiénes Somos?
          </p>
          <h2 id="nosotros-heading" className="mt-3 font-heading text-3xl font-bold text-brand-900 md:text-4xl">
            Tres décadas protegiendo a quienes trabajan en el mar
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Con tres décadas de experiencia, en Vidanautica nos especializamos en crear chalecos
            salvavidas personalizados y certificados. Ofrecemos soluciones innovadoras diseñadas
            para cumplir con las necesidades específicas de clientes en pesca, acuicultura,
            fuerzas armadas y turismo. Nuestra misión es brindar seguridad y comodidad,
            garantizando la excelencia en cada producto.
          </p>
        </div>
      </div>
    </section>
  );
}
