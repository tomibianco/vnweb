import { ImageResponse } from "next/og";
import { getProducto, productos } from "@/lib/productos";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

function sinTildes(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/Ñ/g, "N")
    .replace(/ñ/g, "n");
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const producto = getProducto(slug);
  const nombre = producto ? sinTildes(producto.nombre) : "Vidanautica";
  const tipo = producto?.tipo ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #16294f 0%, #203f7f 60%, #3a5fa8 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 32, letterSpacing: 8, color: "#b8c7e8", display: "flex" }}>
          VIDANAUTICA
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            display: "flex",
            maxWidth: 950,
          }}
        >
          {nombre}
        </div>
        {tipo && (
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "#dbe3f4",
              border: "2px solid #6d8fd1",
              borderRadius: 999,
              padding: "10px 28px",
              display: "flex",
            }}
          >
            {`Tipo ${tipo}`}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
