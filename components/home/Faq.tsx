import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Los chalecos Vidanautica están certificados?",
    a: "Sí. Los chalecos salvavidas Vidanautica están aprobados por la Armada de Chile y la Dirección General del Territorio Marítimo (DGTM).",
  },
  {
    q: "¿Qué diferencia hay entre un chaleco tipo II y uno tipo III?",
    a: "Un chaleco tipo II está pensado para navegación costera y ofrece mayor flotabilidad con menos libertad de movimiento, mientras que un chaleco tipo III prioriza la maniobrabilidad para deportes náuticos, kayak y actividades en bahías o piscinas, manteniendo una flotabilidad certificada de 200 kilos.",
  },
  {
    q: "¿Se pueden personalizar con el logo de mi empresa?",
    a: "Sí. Vidanautica ofrece diseños personalizados y variedad de colores para pedidos de empresas de pesca, acuicultura, salmonicultura, fuerzas armadas y turismo.",
  },
  {
    q: "¿Venden al por mayor a empresas salmoneras y pesqueras?",
    a: "Sí. Vidanautica trabaja directamente con empresas de la industria salmonera, pesquera y de acuicultura, entregando cotizaciones según volumen y modelo requerido.",
  },
  {
    q: "¿Dónde se fabrican los chalecos Vidanautica?",
    a: "Los chalecos salvavidas Vidanautica se fabrican en Chile, con materiales de alta resistencia como tela Oxford 300/300 impermeable y espuma de celda cerrada EPE.",
  },
];

export default function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-secondary py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <h2 id="faq-heading" className="text-center font-heading text-3xl font-bold text-brand-900 md:text-4xl">
          Preguntas frecuentes
        </h2>

        <Accordion.Root className="mt-10 flex flex-col gap-3">
          {faqs.map((f) => (
            <Accordion.Item
              key={f.q}
              className="rounded-2xl border border-border bg-white px-5 py-1"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-heading font-bold text-brand-900">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 text-brand-600 transition-transform group-data-panel-open:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
