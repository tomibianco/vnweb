import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Cabeceras de seguridad. El sitio es estatico y no renderiza contenido
// generado por usuarios, asi que la superficie de XSS es minima; esto es
// defensa en profundidad. Se usa 'unsafe-inline' en script-src porque Next
// inyecta scripts inline (hidratacion, JSON-LD) y usar nonces obligaria a
// renderizado dinamico via middleware, perdiendo el prerender estatico.
// Vercel Analytics se sirve same-origin desde /_vercel/insights/, pero en
// algunos entornos cae al CDN, asi que se permite explicitamente.
const VERCEL_ANALYTICS = "https://va.vercel-scripts.com";

// React en modo desarrollo usa eval() para reconstruir stacktraces. En
// produccion nunca lo hace, por eso 'unsafe-eval' se concede solo en la fase
// de dev server. Se usa la fase que entrega Next y no NODE_ENV, porque al
// cargar el config NODE_ENV todavia no refleja de forma fiable el modo.
function buildCsp(isDev: boolean) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${VERCEL_ANALYTICS}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self' ${VERCEL_ANALYTICS}`,
    "frame-src 'none'",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function securityHeaders(isDev: boolean) {
  return [
    { key: "Content-Security-Policy", value: buildCsp(isDev) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "DENY" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    },
  ];
}

const buildConfig = (isDev: boolean): NextConfig => ({
  trailingSlash: true,
  // No anunciar el framework en las respuestas.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders(isDev) }];
  },
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
});

export default function config(phase: string): NextConfig {
  return buildConfig(phase === PHASE_DEVELOPMENT_SERVER);
}
