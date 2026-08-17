import type { Producto } from "@/lib/productos";

export default function TablaTallas({ tabla }: { tabla: NonNullable<Producto["tablaTallas"]> }) {
  return (
    <div className="mt-10 min-w-0">
      <h2 className="mb-4 font-heading text-lg font-bold text-brand-900">Tabla de tallas</h2>
      <div className="w-full min-w-0 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[440px] border-collapse text-sm">
          <thead>
            <tr className="bg-brand-800 text-white">
              <th scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-semibold">
                Talla
              </th>
              {tabla.columnas.map((col) => (
                <th key={col} scope="col" className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabla.filas.map((fila, i) => (
              <tr key={fila.talla} className={i % 2 === 0 ? "bg-secondary" : "bg-white"}>
                <th scope="row" className="px-3 py-2.5 sm:px-4 sm:py-3 text-left font-semibold text-brand-900">
                  {fila.talla}
                </th>
                {fila.valores.map((valor, j) => (
                  <td key={j} className="px-3 py-2.5 sm:px-4 sm:py-3 text-brand-800">
                    {valor}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
