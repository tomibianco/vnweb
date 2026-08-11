import { whatsappHref } from "@/lib/site";

export default function WhatsappButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-105 md:right-6 md:bottom-6"
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-brand-900 px-3 py-1.5 text-sm text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 md:block">
        Escríbenos por WhatsApp
      </span>
      <svg viewBox="0 0 32 32" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.65 4.53 1.78 6.4L4 29l7.78-1.74A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 17.03c-.29.82-1.45 1.5-2.37 1.7-.63.13-1.45.24-4.23-.91-3.55-1.47-5.84-5.07-6.02-5.31-.18-.24-1.43-1.9-1.43-3.63 0-1.73.9-2.57 1.23-2.92.33-.35.71-.44.95-.44.24 0 .48.002.68.012.22.01.51-.083.8.61.29.7.98 2.42 1.06 2.6.09.18.14.39.03.63-.11.24-.16.39-.32.6-.16.2-.34.45-.48.6-.16.17-.33.36-.14.71.19.35.86 1.42 1.85 2.31 1.27 1.13 2.34 1.48 2.69 1.65.35.17.55.14.75-.08.2-.22.86-1.0 1.09-1.35.22-.35.45-.29.75-.17.31.11 1.94.92 2.27 1.08.33.17.55.25.63.39.08.13.08.79-.21 1.61Z" />
      </svg>
    </a>
  );
}
