export const site = {
  name: "Vidanautica",
  legalName: "Vidanautica",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vidanautica.cl",
  email: "ventas@vidanautica.cl",
  phone: "+56 9 3014 3511",
  phoneE164: "+56930143511",
  whatsappNumber: "56930143511",
  whatsappMessage: "Hola, quiero cotizar chalecos salvavidas",
  location: "Lago Rapel, Región de O'Higgins, Chile",
  social: {
    facebook: "https://www.facebook.com/100083738471780",
    instagram: "https://www.instagram.com/chalecos.salvavidas/",
    linkedin: "https://cl.linkedin.com/company/vidanautica",
  },
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Productos", href: "/productos/" },
] as const;
