const clientes = [
  { slug: "invermar", nombre: "Invermar" },
  { slug: "cooke", nombre: "Cooke Aquaculture" },
  { slug: "foodcorp", nombre: "Foodcorp" },
  { slug: "cermaq", nombre: "Cermaq" },
  { slug: "cgs", nombre: "GCS Seguridad Privada" },
  { slug: "hain", nombre: "Hain" },
  { slug: "patagonia", nombre: "Patagonia Náutica" },
  { slug: "puerto-deportivo", nombre: "Puerto Deportivo" },
  { slug: "camanchaca", nombre: "Camanchaca" },
  { slug: "nautisport", nombre: "Nautisport" },
  { slug: "tecnomar", nombre: "Tecnomar" },
];

export default function Clientes() {
  return (
    <section aria-labelledby="clientes-heading" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <h2
          id="clientes-heading"
          className="text-center font-heading text-2xl font-bold text-brand-900 md:text-3xl"
        >
          Confían en nosotros
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {clientes.map((c) => (
            <div key={c.slug} className="flex h-20 items-center justify-center sm:h-24">
              <div
                role="img"
                aria-label={c.nombre}
                className="h-full w-full bg-brand-600 opacity-60 transition-opacity duration-300 hover:opacity-100"
                style={{
                  WebkitMaskImage: `url(/clientes/mono/${c.slug}.png)`,
                  maskImage: `url(/clientes/mono/${c.slug}.png)`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
