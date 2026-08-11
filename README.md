# Vidanautica

Web corporativa de Vidanautica, fabricante chileno de chalecos salvavidas certificados para pesca,
acuicultura, salmonicultura, fuerzas armadas y turismo. Next.js (App Router) + TypeScript +
Tailwind CSS v4, desplegado en Vercel.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

- `WEB3FORMS_ACCESS_KEY`: access key gratuita de [web3forms.com](https://web3forms.com), registrada
  con `ventas@vidanautica.cl`. Sin esta variable, el formulario de contacto muestra un error y no
  envía correos.
- `NEXT_PUBLIC_SITE_URL`: URL base del sitio en producción (usada por `metadataBase`, el sitemap y
  los datos estructurados JSON-LD).

## Contenido

Los textos y datos de los 7 productos viven en `lib/productos.ts` — es la fuente única que
alimenta la navegación, el footer, el hub de productos, cada página de producto, el selector del
formulario y el sitemap. Los datos de contacto y redes sociales están en `lib/site.ts`.

## Comandos

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm start    # sirve el build de producción
pnpm lint     # ESLint
```

## Deploy

Pensado para desplegar en [Vercel](https://vercel.com/new). Configurar las variables de entorno
del punto anterior en el proyecto de Vercel antes del primer deploy.
