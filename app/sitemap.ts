import type { MetadataRoute } from "next";
import { productos } from "@/lib/productos";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/productos/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productos.map((p) => ({
      url: `${site.url}/productos/${p.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
