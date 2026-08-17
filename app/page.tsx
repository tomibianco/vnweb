import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Nosotros from "@/components/home/Nosotros";
import Pilares from "@/components/home/Pilares";
import ProductosGrid from "@/components/home/ProductosGrid";
import Clientes from "@/components/home/Clientes";
import Faq from "@/components/home/Faq";
import Contacto from "@/components/home/Contacto";

export const metadata: Metadata = {
  title: "Vidanautica | Chalecos salvavidas certificados en Chile",
  description:
    "Fabricamos y diseñamos chalecos salvavidas certificados en Chile, para la industria, fuerzas armadas, turismo, tiendas deportivas y escuelas náuticas.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clientes />
      <Nosotros />
      <Pilares />
      <ProductosGrid />
      <Faq />
      <Contacto />
    </>
  );
}
