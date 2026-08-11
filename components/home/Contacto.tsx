import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import ContactForm from "@/components/form/ContactForm";

export default function Contacto() {
  return (
    <section id="contacto" aria-labelledby="contacto-heading" className="bg-brand-800 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 md:px-8 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="font-heading text-sm font-bold tracking-[0.2em] text-brand-200 uppercase">
            Contacto
          </p>
          <h2 id="contacto-heading" className="mt-3 font-heading text-3xl font-bold text-white md:text-4xl">
            Cotiza tu pedido
          </h2>
          <p className="mt-4 text-brand-200">
            Cuéntanos qué modelo necesitas y el volumen de tu pedido. Te respondemos a la brevedad.
          </p>

          <ul className="mt-8 space-y-4 text-brand-100">
            <li className="flex items-center gap-3">
              <Mail className="size-5 shrink-0 text-brand-300" />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-5 shrink-0 text-brand-300" />
              <a href={`tel:${site.phoneE164}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-brand-300" />
              {site.location}
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10 lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
