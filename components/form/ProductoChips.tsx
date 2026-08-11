import { productos } from "@/lib/productos";

export default function ProductoChips() {
  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-medium text-brand-900">
        Modelo de interés
      </legend>
      <div className="flex flex-wrap gap-2">
        {productos.map((p) => (
          <label key={p.slug} className="cursor-pointer">
            <input
              type="checkbox"
              name="productos"
              value={p.valorForm}
              className="peer sr-only"
            />
            <span className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm text-brand-800 transition-colors select-none peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
              {p.nombre}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
