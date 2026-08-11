import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // Variantes sin prefijo /productos/ que la web WordPress servia con 200
      // (contenido duplicado). Se consolidan bajo /productos/<slug>/.
      // Los destinos ya incluyen la barra final para evitar un segundo salto
      // por trailingSlash.
      { source: "/chaleco-deportivo", destination: "/productos/chaleco-deportivo/", permanent: true },
      { source: "/chaleco-para-nino", destination: "/productos/chaleco-para-nino/", permanent: true },
      { source: "/chaleco-aqua", destination: "/productos/chaleco-aqua/", permanent: true },
      { source: "/chaleco-costero", destination: "/productos/chaleco-costero/", permanent: true },
      { source: "/chaleco-para-kayak", destination: "/productos/chaleco-para-kayak/", permanent: true },
      { source: "/chalecos-rescate", destination: "/productos/chalecos-rescate/", permanent: true },
      { source: "/chaleco-para-perro", destination: "/productos/chaleco-para-perro/", permanent: true },
      // Variantes singular/plural de cortesia
      { source: "/chaleco-rescate", destination: "/productos/chalecos-rescate/", permanent: true },
      { source: "/chalecos-para-perro", destination: "/productos/chaleco-para-perro/", permanent: true },
      { source: "/chaleco-para-ninos", destination: "/productos/chaleco-para-nino/", permanent: true },
      { source: "/productos/chaleco-para-ninos", destination: "/productos/chaleco-para-nino/", permanent: true },
      // Sitemaps de WordPress/Yoast
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
