import { Check } from "lucide-react";
import type { Producto } from "@/lib/productos";

export default function Specs({ producto }: { producto: Producto }) {
  return (
    <div className="space-y-8">
      {producto.grupos.map((grupo, i) => (
        <div key={i}>
          {grupo.titulo && (
            <h2 className="mb-3 font-heading text-lg font-bold text-brand-900">{grupo.titulo}</h2>
          )}
          <ul className="space-y-2.5">
            {grupo.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-brand-800">
                <Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
