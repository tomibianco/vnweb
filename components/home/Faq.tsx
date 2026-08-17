import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "¿Los chalecos Vidanautica están certificados?",
    a: "Sí. Nuestros salvavidas están aprobados por la Armada de Chile y la Dirección General del Territorio Marítimo (DGTM). Trabajamos para entregar equipos de seguridad confiables y adecuados para las distintas condiciones de uso.",
  },
  {
    q: "¿Qué diferencia hay entre un chaleco tipo II y uno tipo III?",
    a: "La principal diferencia está en su diseño, flotabilidad y uso previsto. Los chalecos Tipo II exigen una mayor resistencia, flotabilidad (70N) y visibilidad (colores visibles y cinta reflectante), están orientados a situaciones donde se requiere mayor capacidad de apoyo y protección en el agua. Mientras que los Tipo III están enfocados en actividades deportivas o de bajo riesgo, con menores exigencias de resistencia y flotabilidad (50N). La elección depende de las condiciones y características de cada operación.",
  },
  {
    q: "¿Se pueden personalizar e incluir el logo de mi empresa?",
    a: "Sí. Podemos personalizar los chalecos incorporando logos, nombres de empresas, embarcaciones y otros elementos de identificación. También podemos realizar modificaciones o incorporación de elementos como bolsillos, cierres, arnés, etc., según las necesidades de cada cliente.",
  },
  {
    q: "¿Pueden desarrollar un chaleco adaptado a las necesidades de mi empresa?",
    a: "Sí. Una de nuestras principales características es trabajar directamente con nuestros clientes para entender cómo y dónde se utilizará el chaleco. A partir de eso, podemos adaptar distintos elementos del diseño para mejorar la comodidad, movilidad y seguridad durante el trabajo.",
  },
  {
    q: "¿Venden al por mayor?",
    a: "Sí. Trabajamos principalmente con empresas e instituciones y podemos fabricar pedidos de distintas cantidades. Para pedidos mayores podemos ofrecer condiciones y precios según el volumen solicitado.",
  },
  {
    q: "¿Dónde se fabrican los chalecos Vidanautica?",
    a: "Nuestros chalecos son diseñados y fabricados en Chile, en nuestro taller ubicado en la Región de O'Higgins. Esto nos permite mantener un control directo sobre el proceso de fabricación y responder de manera flexible a los requerimientos de nuestros clientes.",
  },
  {
    q: "¿Cómo sé qué tipo de chaleco necesito?",
    a: "Depende principalmente de la actividad, las condiciones de navegación y las características de la operación. Si no estás seguro de qué modelo necesitas, podemos orientarte para encontrar una alternativa adecuada según el uso que tendrá el chaleco.",
  },
  {
    q: "¿Cuánto demora la fabricación de un pedido?",
    a: "El plazo depende de la cantidad solicitada, el modelo, el nivel de personalización requerido y los pedidos que se encuentre procesando el taller. Al momento de cotizar, informamos un plazo estimado de fabricación y coordinamos la entrega según las necesidades del cliente.",
  },
  {
    q: "¿Realizan envíos a todo Chile?",
    a: "Sí. Coordinamos despachos a distintas regiones de Chile, utilizando alternativas de transporte según el destino, volumen y características de cada pedido.",
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
