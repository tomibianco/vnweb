export type TipoChaleco = "II" | "III" | "V";

export type Producto = {
  slug: string;
  nombre: string;
  h1: string;
  tipo: TipoChaleco;
  titleSeo: string;
  metaDescription: string;
  intro: string;
  grupos: { titulo?: string; items: string[] }[];
  imagenes: { src: string; alt: string }[];
  valorForm: string;
  tablaTallas?: {
    columnas: string[];
    filas: { talla: string; valores: string[] }[];
  };
};

export const productos: Producto[] = [
  {
    slug: "chaleco-deportivo",
    nombre: "Chaleco Deportivo",
    h1: "Chaleco Salvavidas Deportivo para Adulto",
    tipo: "III",
    titleSeo: "Chaleco Deportivo - Vidanautica",
    metaDescription:
      "Chaleco salvavidas deportivo tipo III para adultos, aprobado por la Armada de Chile. Fabricación nacional, tallas S a XXL y diseños personalizados.",
    intro:
      "Chalecos salvavidas tipo III, para deportes naúticos, bahías y piscinas. Aprobados por la Armada.",
    grupos: [
      {
        items: [
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante.",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u.",
          "4 láminas en parte delantera y 1 lámina en espalda. Trae 3 broches y cintas de 38mm.",
          "Tiene una flotabilidad de 200 kilos.",
          "Incluye silbatos.",
          "Tallas: S, M, L, XL, XXL.",
          "Diseños personalizados.",
          "Variedad de colores.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/deportivo-1.webp", alt: "Chaleco salvavidas deportivo Vidanautica, vista frontal" },
      { src: "/productos/deportivo-2.webp", alt: "Chaleco salvavidas deportivo Vidanautica, vista de espalda" },
      { src: "/productos/deportivo-3.webp", alt: "Detalle de broches y cintas del chaleco salvavidas deportivo" },
      { src: "/productos/deportivo-varios.webp", alt: "Chalecos salvavidas deportivos Vidanautica en varios colores" },
    ],
    valorForm: "SALVAVIDAS DEPORTIVO",
  },
  {
    slug: "chaleco-para-nino",
    nombre: "Chaleco para Niños",
    h1: "Chaleco Salvavidas Deportivo para Niños",
    tipo: "III",
    titleSeo: "Chaleco para Niño - Vidanautica",
    metaDescription:
      "Chaleco salvavidas deportivo tipo III para niños, aprobado por la Armada de Chile. Flotabilidad de 70 kilos, tallas S, M, L y Y.",
    intro:
      "Chalecos salvavidas para Niños tipo III, para deportes naúticos, bahías y piscinas. Aprobados por la Armada.",
    grupos: [
      {
        items: [
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante.",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u.",
          "4 láminas en parte delantera y 1 lámina en espalda.",
          "Trae broches y cintas de 25 mm.",
          "Tiene una flotabilidad de 70 kilos.",
          "Incluye silbatos.",
          "Tallas: S, M, L, Y.",
          "Diseños personalizados.",
          "Variedad de colores.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/nino-1.webp", alt: "Chaleco salvavidas Vidanautica para niños, vista frontal" },
      { src: "/productos/nino-2.webp", alt: "Chaleco salvavidas Vidanautica para niños, en uso" },
    ],
    valorForm: "SALVAVIDAS NIÑO",
  },
  {
    slug: "chaleco-aqua",
    nombre: "Chaleco Aqua",
    h1: "Chaleco Salvavidas Modelo Aqua",
    tipo: "II",
    titleSeo: "Chaleco Aqua - Vidanautica",
    metaDescription:
      "Chaleco salvavidas modelo Aqua tipo II, aprobado como Costero por la DGTM. Alta libertad de movimiento para trabajos y navegación costera.",
    intro:
      "Chaleco Salvavidas Tipo II diseñado para trabajos y navegaciones en entornos acuáticos y costeros. Este salvavidas ha sido fabricado con los materiales de más alta calidad que es posible encontrar en el mercado y se destaca por la simplicidad y facilidad de su uso y por otorgar una alta libertad de movimiento a quien lo utiliza.",
    grupos: [
      {
        items: [
          "Salvavidas aprobado como Costero tipo II por la DGTM",
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante 3M de 50 mm (en parte delantera y espalda).",
          "Cierre diente de perro N°10.",
          "Amplia abertura de brazos.",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u. 4 láminas en parte delantera y 2 láminas en espalda.",
          "Flotabilidad de 70N.",
          "Incluye silbato.",
          "Colores: Rojo, Naranjo y Amarillo Fluor.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/aqua-1.webp", alt: "Chaleco salvavidas modelo Aqua Vidanautica, vista frontal" },
      { src: "/productos/aqua-2.webp", alt: "Chaleco salvavidas modelo Aqua Vidanautica, vista de espalda" },
    ],
    valorForm: "SALVAVIDAS MODELO AQUA",
  },
  {
    slug: "chaleco-costero",
    nombre: "Chaleco Costero",
    h1: "Chaleco Salvavidas Costero",
    tipo: "II",
    titleSeo: "Chaleco Costero - Vidanautica",
    metaDescription:
      "Chaleco salvavidas costero tipo II para embarcaciones costeras, aprobado por la Armada. Flotabilidad de 200 kilos y cinta reflectante 3M.",
    intro:
      "Chalecos salvavidas tipo II, para ser usados en embarcaciones costeras. Aprobados por la Armada.",
    grupos: [
      {
        items: [
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante 3M de 50 mm (en parte delantera y espalda).",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u. 4 láminas en parte delantera y 2 láminas en espalda.",
          "Chaleco trae 3 broches y cintas de 38mm.",
          "Tiene una flotabilidad de 200 kilos.",
          "Incluye silbatos.",
          "Tallas: S, M, L, XL.",
          "Diseños personalizados.",
          "Colores: Rojo, Naranjo y Amarillo Fluor.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/costero-1.webp", alt: "Chaleco salvavidas costero Vidanautica, vista frontal" },
      { src: "/productos/costero-2.webp", alt: "Chaleco salvavidas costero Vidanautica, vista de espalda" },
      { src: "/productos/costero-3.webp", alt: "Detalle de cinta reflectante del chaleco salvavidas costero" },
    ],
    valorForm: "SALVAVIDAS COSTERO",
  },
  {
    slug: "chaleco-para-kayak",
    nombre: "Chaleco para Kayak",
    h1: "Chaleco Salvavidas para Kayak",
    tipo: "III",
    titleSeo: "Chaleco para Kayak - Vidanautica",
    metaDescription:
      "Chaleco salvavidas para kayak tipo III, aprobado por la Armada. Alta maniobrabilidad y ajuste horizontal y vertical.",
    intro:
      "Chalecos salvavidas tipo III, para deportes que requieren alta maniobrabilidad. Aprobados por la Armada.",
    grupos: [
      {
        items: [
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante.",
          "Cierre diente de perro N°10.",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u.",
          "4 láminas en parte delantera, 3 láminas en parte lateral y 2 láminas en espalda.",
          "Cintas y ajustes de 25 mm.",
          "Incluye silbatos.",
          "Diseños personalizados.",
          "Se puede ajustar en forma horizontal y vertical.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/kayak-1.webp", alt: "Chaleco salvavidas para kayak Vidanautica, vista frontal" },
      { src: "/productos/kayak-2.webp", alt: "Chaleco salvavidas para kayak Vidanautica, detalle de cierre" },
      { src: "/productos/kayak-3.webp", alt: "Chaleco salvavidas para kayak Vidanautica en uso" },
      { src: "/productos/kayak-espalda.webp", alt: "Chaleco salvavidas para kayak Vidanautica, vista de espalda" },
    ],
    valorForm: "SALVAVIDAS KAYAK",
  },
  {
    slug: "chalecos-rescate",
    nombre: "Chaleco de Rescate",
    h1: "Chaleco Salvavidas Rescate",
    tipo: "V",
    titleSeo: "Chalecos Rescate - Vidanautica",
    metaDescription:
      "Chalecos de rescate de fabricación nacional aprobados por la DGTM, y modelos importados FIRSTWATCH aprobados por la Guardia Costera de EEUU.",
    intro:
      "Salvavidas de rescate de fabricación nacional y salvavidas importados desde USA aprobados por la Guardia Costera de USA.",
    grupos: [
      {
        titulo: "Salvavida Nacional:",
        items: [
          "Salvavidas aprobado como Costero tipo II por la DGTM",
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante 3M de 50 mm (en parte delantera y espalda).",
          "Cierre diente de perro N°10",
          "Ajuste vertical y lateral",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u. 4 láminas en parte delantera y 2 láminas en espalda.",
          "Broches de tipo V BSR aprobados por Underwriters Labs",
          "Flotabilidad de 200 kilos.",
          "Incluye silbatos.",
          "Colores: Rojo, Naranjo y Amarillo Fluor.",
        ],
      },
      {
        titulo: "Salvavidas Importados:",
        items: [
          "FIRSTWATCH FOUR POCKET: Aprobación de la Guardia Costera de los EEUU bajo la denominación de tipo III",
          "FIRSTWATCH SAR: Chaleco salvavidas aprobado por la Guardia Costera de los EEUU tipo V (USCG)",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/rescate-frente.webp", alt: "Chaleco salvavidas de rescate Vidanautica, vista frontal" },
      { src: "/productos/rescate-espalda.webp", alt: "Chaleco salvavidas de rescate Vidanautica, vista de espalda" },
    ],
    valorForm: "SALVAVIDAS RESCATE",
  },
  {
    slug: "chaleco-para-perro",
    nombre: "Chaleco para Perros",
    h1: "Chaleco Salvavidas para Perros",
    tipo: "III",
    titleSeo: "Chaleco para Perro - Vidanautica",
    metaDescription:
      "Chaleco salvavidas para perros, fabricado en tela Oxford impermeable con espuma de celda cerrada. Tallas S, M, L y XL.",
    intro:
      "Chaleco salvavidas para perros fabricado con los mismos materiales de alta resistencia que el resto de la línea Vidanautica.",
    grupos: [
      {
        items: [
          "Resistentes a hidrocarburos (bencina, parafina, y otros solventes).",
          "Tela Oxford 300/300 impermeable y con filtro UV.",
          "Cinta reflectante.",
          "Chalecos traen broches y cintas de 20mm (talla S), 25 mm (Talla M y L) y 38mm (talla XL).",
          "Espuma de celda cerrada EPE de espesor 10 mm c/u. 3 láminas en parte superior, 2 láminas en parte lateral y 1 lámina en parte inferior.",
          "Tallas S, M, L y XL.",
          "Variedad de Colores.",
        ],
      },
    ],
    imagenes: [
      { src: "/productos/perro-1.webp", alt: "Chaleco salvavidas Vidanautica para perros, vista frontal" },
      { src: "/productos/perro-2.webp", alt: "Chaleco salvavidas Vidanautica para perros en uso" },
      { src: "/productos/perro-3.webp", alt: "Chaleco salvavidas Vidanautica para perros, detalle de broches" },
      { src: "/productos/perro-4.webp", alt: "Chaleco salvavidas Vidanautica para perros, varios colores" },
    ],
    valorForm: "SALVAVIDAS PERRO",
    tablaTallas: {
      columnas: ["Contorno de cuello del perro", "Contorno de pecho del perro", "Largo del chaleco"],
      filas: [
        { talla: "S", valores: ["30 - 45 cm", "35 - 50 cm", "25 cm"] },
        { talla: "M", valores: ["45 - 60 cm", "55 - 75 cm", "27 cm"] },
        { talla: "L", valores: ["40 - 55 cm", "65 - 80 cm", "35 cm"] },
        { talla: "XL", valores: ["55 - 70 cm", "60 - 90 cm", "45 cm"] },
      ],
    },
  },
];

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getProductosRelacionados(slug: string, count = 3): Producto[] {
  const others = productos.filter((p) => p.slug !== slug);
  return others.slice(0, count);
}
