import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.242 0-1.63.775-1.63 1.57v1.889h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.24 8.25h4.31v2.01h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.34c0-1.51-.03-3.46-2.11-3.46-2.11 0-2.43 1.65-2.43 3.35V23h-4.5V8.25Z" />
    </svg>
  );
}

const socialLinks = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src="/marca/logo-nombre.webp"
              alt="Vidanautica"
              width={160}
              height={64}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              Fabricando chalecos salvavidas certificados en Chile desde hace más de 30 años.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
              Productos
            </h2>
            <ul className="mt-4 space-y-2.5">
              {productos.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/productos/${p.slug}/`}
                    className="text-sm text-brand-200 transition-colors hover:text-white"
                  >
                    {p.nombre.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                  Correo: {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="transition-colors hover:text-white"
                >
                  Teléfono: {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
              ¿Necesitas una cotización?
            </h2>
            <p className="mt-4 text-sm text-brand-200">
              Cuéntanos qué modelo necesitas y te respondemos a la brevedad.
            </p>
            <Link
              href="/#contacto"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-4 rounded-full bg-white text-brand-900 hover:bg-brand-50"
              )}
            >
              Cotiza aquí
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-brand-300">
            © 2026 Todos los derechos reservados para Vidanautica
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-white/5 text-brand-100 transition-colors hover:bg-white/15 hover:text-white"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
