"use client";

import { useState } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Accordion } from "@base-ui/react/accordion";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { productos } from "@/lib/productos";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="flex size-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50 lg:hidden"
        aria-label="Abrir menú"
      >
        <MenuIcon className="size-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-900/40 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 lg:hidden" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,380px)] flex-col bg-white/95 p-6 backdrop-blur-xl shadow-2xl transition-transform duration-200 ease-out data-ending-style:translate-x-full data-starting-style:translate-x-full lg:hidden">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-heading text-lg font-bold text-brand-900">
              Menú
            </Dialog.Title>
            <Dialog.Close
              className="flex size-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
              aria-label="Cerrar menú"
            >
              <X className="size-6" />
            </Dialog.Close>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Principal">
            {nav.map((item) =>
              item.label === "Productos" ? (
                <Accordion.Root key={item.href}>
                  <Accordion.Item>
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-brand-900 hover:bg-brand-50 group">
                        Productos
                        <ChevronDown className="size-5 transition-transform group-data-panel-open:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel className="flex flex-col gap-1 pl-4">
                      {productos.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/productos/${p.slug}/`}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2.5 text-base text-brand-800 hover:bg-brand-50"
                        >
                          {p.nombre}
                        </Link>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion.Root>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-brand-900 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <Link
            href="/#contacto"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 w-full rounded-full bg-brand-600 text-white hover:bg-brand-700"
            )}
          >
            Cotiza aquí
          </Link>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
