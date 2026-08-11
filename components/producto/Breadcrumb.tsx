import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ nombre }: { nombre: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand-700">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li>
          <Link href="/productos/" className="hover:text-brand-700">
            Productos
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="size-3.5" />
        </li>
        <li className="font-medium text-brand-900" aria-current="page">
          {nombre}
        </li>
      </ol>
    </nav>
  );
}
