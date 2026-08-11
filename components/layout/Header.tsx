"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { productos } from "@/lib/productos";
import { nav } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={cn(
          "mt-0 flex w-full items-center justify-between border-b border-transparent bg-white/85 px-5 backdrop-blur-md transition-all duration-300 ease-out md:px-8",
          scrolled &&
            "mt-3 w-[min(1100px,94vw)] rounded-full border-white/60 bg-white/75 px-4 shadow-[0_8px_30px_-12px_rgba(14,27,54,0.25)] backdrop-blur-xl md:px-6"
        )}
      >
        <Link href="/" className="flex items-center gap-2 py-3" aria-label="Vidanautica, inicio">
          <Image
            src="/marca/logo.webp"
            alt="Vidanautica"
            width={130}
            height={100}
            priority
            className={cn(
              "h-11 w-auto transition-all duration-300",
              scrolled && "h-9"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((item) =>
            item.label === "Productos" ? (
              <Menu.Root key={item.href}>
                <Menu.Trigger className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-brand-900 outline-none transition-colors hover:bg-brand-50 hover:text-brand-700 data-popup-open:bg-brand-50 data-popup-open:text-brand-700">
                  Productos
                  <ChevronDown className="size-4 transition-transform data-[popup-open]:rotate-180" />
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner sideOffset={12} align="start" className="outline-hidden z-50">
                    <Menu.Popup className="min-w-64 origin-[var(--transform-origin)] rounded-2xl border border-border bg-white/95 p-2 text-brand-900 shadow-xl backdrop-blur-xl transition-[scale,opacity] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                      {productos.map((p) => (
                        <Menu.LinkItem
                          key={p.slug}
                          closeOnClick
                          render={<Link href={`/productos/${p.slug}/`} />}
                          className="block cursor-default rounded-xl px-3 py-2.5 text-sm outline-hidden select-none data-highlighted:bg-brand-50 data-highlighted:text-brand-700"
                        >
                          {p.nombre}
                        </Menu.LinkItem>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/#contacto"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden rounded-full bg-brand-600 px-5 text-white hover:bg-brand-700 lg:inline-flex"
          )}
        >
          Cotiza aquí
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
