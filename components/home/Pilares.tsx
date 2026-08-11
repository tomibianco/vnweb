import { ShieldCheck, BadgeCheck, Settings2 } from "lucide-react";

const pilares = [
  {
    icon: ShieldCheck,
    title: "Calidad",
    text: "Compromiso con la calidad: Fabricamos chalecos salvavidas seguros y duraderos, empleando materiales de alta resistencia y tecnología avanzada. Desde el diseño hasta la entrega, garantizamos que nuestros productos sean seguros y cumplan con las expectativas más rigurosas.",
  },
  {
    icon: BadgeCheck,
    title: "Seguridad",
    text: "Fabricamos salvavidas que cumplen con los más altos estándares de seguridad. Cada producto pasa por controles de calidad y pruebas de certificación rigurosas, asegurando protección confiable en cualquier situación. Nuestros chalecos están certificados según normativas vigentes, brindando a los clientes la tranquilidad de usar equipos de seguridad de alta calidad.",
  },
  {
    icon: Settings2,
    title: "Personalización",
    text: "Sabemos que las necesidades de cada industria son únicas. Por ello, ofrecemos un servicio integral de personalización, trabajando estrechamente con nuestros clientes para identificar y entender sus requerimientos particulares. Así, ofrecemos soluciones innovadoras que cumplen con sus demandas específicas.",
  },
];

export default function Pilares() {
  return (
    <section aria-label="Nuestros pilares" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 md:px-8 md:grid-cols-3">
        {pilares.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-3xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(14,27,54,0.04)]"
          >
            <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold text-brand-900">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
