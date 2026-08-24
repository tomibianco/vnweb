"use server";

import { redirect } from "next/navigation";
import { site } from "@/lib/site";

export type ContactoState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  /** TEMPORAL: motivo crudo del rechazo de Web3Forms, para diagnosticar en produccion. */
  debug?: string;
};

type Web3FormsRespuesta = { success?: boolean; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function enviarContacto(
  _prevState: ContactoState,
  formData: FormData
): Promise<ContactoState> {
  // Honeypot: si un bot completo este campo oculto, se descarta en
  // silencio simulando exito para no revelar la trampa.
  const honeypot = String(formData.get("botcheck") ?? "");
  if (honeypot.trim() !== "") {
    redirect("/confirmacion/");
  }

  const nombre = String(formData.get("nombre") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const productos = formData.getAll("productos").map(String);

  const fieldErrors: Record<string, string> = {};
  if (!nombre) fieldErrors.nombre = "Ingresa tu nombre.";
  if (telefono.length < 8) fieldErrors.telefono = "Ingresa un teléfono válido.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Ingresa un correo válido.";
  if (!mensaje) fieldErrors.mensaje = "Cuéntanos qué necesitas.";
  if (mensaje.length > 3000) fieldErrors.mensaje = "El mensaje es demasiado largo.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return {
      status: "error",
      message:
        "El formulario aún no está conectado (falta WEB3FORMS_ACCESS_KEY). Escríbenos directamente a " +
        site.email,
    };
  }

  let ok = false;
  // Web3Forms explica el rechazo en `message` ("Invalid Access Key",
  // "Invalid Captcha", ...). Sin capturarlo, todos los fallos colapsan en un
  // unico mensaje generico y no hay forma de diagnosticar produccion.
  let motivo = "";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nueva cotización desde vidanautica.cl — ${nombre}`,
        from_name: "Web Vidanautica",
        nombre,
        telefono,
        email,
        "Modelo(s) de interés": productos.length ? productos.join(", ") : "No especifica",
        mensaje,
      }),
    });
    // Se lee como texto antes de parsear: si Web3Forms devuelve HTML (error de
    // gateway, bloqueo por dominio) `res.json()` lanzaria y perderiamos la pista.
    const cuerpo = await res.text();
    let data: Web3FormsRespuesta | null = null;
    try {
      data = JSON.parse(cuerpo) as Web3FormsRespuesta;
    } catch {
      motivo = `respuesta no JSON (HTTP ${res.status}): ${cuerpo.slice(0, 200)}`;
    }
    ok = res.ok && data?.success === true;
    if (!ok && !motivo) {
      motivo = `HTTP ${res.status}: ${data?.message ?? cuerpo.slice(0, 200)}`;
    }
  } catch (error) {
    motivo = `la peticion fallo: ${error instanceof Error ? error.message : String(error)}`;
  }

  if (!ok) {
    // Queda en los Runtime Logs de Vercel aunque no se muestre en pantalla.
    console.error("[contacto] Web3Forms rechazo el envio ->", motivo);
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos a " + site.email,
      debug: motivo,
    };
  }

  redirect("/confirmacion/");
}
