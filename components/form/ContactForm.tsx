"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import ProductoChips from "@/components/form/ProductoChips";

// Mejora progresiva: si se llega con ?producto=... (desde el CTA de una
// pagina de producto), marca el chip correspondiente.
function PreseleccionarProducto() {
  useEffect(() => {
    const producto = new URLSearchParams(window.location.search).get("producto");
    if (!producto) return;
    const input = document.querySelector<HTMLInputElement>(
      `input[name="productos"][value="${CSS.escape(producto)}"]`
    );
    if (input) input.checked = true;
  }, []);
  return null;
}

// El plan gratuito de Web3Forms rechaza los envios desde servidor
// ("Use our API in client side... Pro plan is required"), asi que la peticion
// tiene que salir del navegador y la clave viaja al cliente. No es un secreto
// en este modelo: solo habilita enviar correo a la direccion registrada con
// ella. El control antispam correspondiente es la lista de dominios permitidos
// en el panel de Web3Forms, que aqui si aplica porque la peticion lleva Origin.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(datos: FormData) {
  const errores: Record<string, string> = {};
  const texto = (campo: string) => String(datos.get(campo) ?? "").trim();

  if (!texto("nombre")) errores.nombre = "Ingresa tu nombre.";
  if (texto("telefono").length < 8) errores.telefono = "Ingresa un teléfono válido.";
  if (!EMAIL_RE.test(texto("email"))) errores.email = "Ingresa un correo válido.";
  if (!texto("mensaje")) errores.mensaje = "Cuéntanos qué necesitas.";
  else if (texto("mensaje").length > 3000) errores.mensaje = "El mensaje es demasiado largo.";

  return errores;
}

const CLASE_CAMPO =
  "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-3 focus:ring-ring/30";

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [erroresCampo, setErroresCampo] = useState<Record<string, string>>({});

  async function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);

    // Honeypot: si un bot completo el campo oculto se simula exito para no
    // revelar la trampa, sin llegar a enviar nada.
    if (String(datos.get("botcheck") ?? "").trim() !== "") {
      router.push("/confirmacion/");
      return;
    }

    const errores = validar(datos);
    setErroresCampo(errores);
    if (Object.keys(errores).length > 0) {
      setError("Revisa los campos marcados.");
      return;
    }

    if (!ACCESS_KEY) {
      setError(
        `El formulario aún no está conectado. Escríbenos directamente a ${site.email}`
      );
      return;
    }

    setError("");
    setEnviando(true);

    const productos = datos.getAll("productos").map(String);
    const nombre = String(datos.get("nombre"));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Nueva cotización desde vidanautica.cl — ${nombre}`,
          from_name: "Web Vidanautica",
          nombre,
          telefono: String(datos.get("telefono")),
          email: String(datos.get("email")),
          "Modelo(s) de interés": productos.length ? productos.join(", ") : "No especifica",
          mensaje: String(datos.get("mensaje")),
        }),
      });
      const data: { success?: boolean; message?: string } = await res.json();

      if (!data.success) {
        // Queda en la consola del navegador para diagnosticar sin exponer
        // detalles de la API a quien rellena el formulario.
        console.error("[contacto] Web3Forms:", res.status, data.message);
        throw new Error(data.message);
      }

      formRef.current?.reset();
      router.push("/confirmacion/");
    } catch (fallo) {
      console.error("[contacto] fallo el envio:", fallo);
      setError(`No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos a ${site.email}`);
      setEnviando(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={enviar} className="space-y-6" noValidate>
      <PreseleccionarProducto />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-brand-900">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className={CLASE_CAMPO}
            aria-invalid={Boolean(erroresCampo.nombre)}
          />
          {erroresCampo.nombre && (
            <p className="mt-1 text-sm text-destructive">{erroresCampo.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="mb-2 block text-sm font-medium text-brand-900">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            defaultValue="+56"
            maxLength={12}
            required
            className={CLASE_CAMPO}
            aria-invalid={Boolean(erroresCampo.telefono)}
          />
          {erroresCampo.telefono && (
            <p className="mt-1 text-sm text-destructive">{erroresCampo.telefono}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-brand-900">
          Correo Electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          spellCheck={false}
          className={CLASE_CAMPO}
          aria-invalid={Boolean(erroresCampo.email)}
        />
        {erroresCampo.email && (
          <p className="mt-1 text-sm text-destructive">{erroresCampo.email}</p>
        )}
      </div>

      <ProductoChips />

      <div>
        <label htmlFor="mensaje" className="mb-2 block text-sm font-medium text-brand-900">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          maxLength={3000}
          required
          className={CLASE_CAMPO}
          aria-invalid={Boolean(erroresCampo.mensaje)}
        />
        {erroresCampo.mensaje && (
          <p className="mt-1 text-sm text-destructive">{erroresCampo.mensaje}</p>
        )}
      </div>

      {/* Honeypot: campo oculto para bots, invisible y fuera del flujo de foco */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botcheck">No completar este campo</label>
        <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {enviando ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
