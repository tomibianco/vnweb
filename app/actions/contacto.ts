"use server";

import { redirect } from "next/navigation";
import { site } from "@/lib/site";

export type ContactoState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

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
  const captchaToken = String(formData.get("captcha_token") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!nombre) fieldErrors.nombre = "Ingresa tu nombre.";
  if (telefono.length < 8) fieldErrors.telefono = "Ingresa un teléfono válido.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Ingresa un correo válido.";
  if (!mensaje) fieldErrors.mensaje = "Cuéntanos qué necesitas.";
  if (mensaje.length > 3000) fieldErrors.mensaje = "El mensaje es demasiado largo.";
  // Web3Forms verifica el token contra hCaptcha; aca solo comprobamos que
  // exista para no gastar una llamada ni dar un error generico al usuario.
  if (!captchaToken) {
    fieldErrors.captcha = "Completa la verificación de seguridad.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", fieldErrors };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      status: "error",
      message:
        "El formulario aún no está conectado (falta WEB3FORMS_ACCESS_KEY). Escríbenos directamente a " +
        site.email,
    };
  }

  let ok = false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        "h-captcha-response": captchaToken,
        subject: `Nueva cotización desde vidanautica.cl — ${nombre}`,
        from_name: "Web Vidanautica",
        to: site.email,
        nombre,
        telefono,
        email,
        "Modelo(s) de interés": productos.length ? productos.join(", ") : "No especifica",
        mensaje,
      }),
    });
    const data = await res.json();
    ok = res.ok && data?.success === true;
  } catch {
    ok = false;
  }

  if (!ok) {
    return {
      status: "error",
      message: "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos a " + site.email,
    };
  }

  redirect("/confirmacion/");
}
