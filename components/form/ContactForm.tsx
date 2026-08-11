"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { enviarContacto, type ContactoState } from "@/app/actions/contacto";
import ProductoChips from "@/components/form/ProductoChips";

// Mejora progresiva: si se llega con ?producto=... (desde el CTA de una
// pagina de producto), marca el chip correspondiente. No bloquea el
// renderizado del formulario si no hay JS.
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

const initialState: ContactoState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Enviando..." : "Enviar"}
    </button>
  );
}

// Sitekey publica del plan gratuito de Web3Forms (no es un secreto).
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export default function ContactForm() {
  const [state, formAction] = useActionState(enviarContacto, initialState);
  const captchaRef = useRef<HCaptcha>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  // El token va a un input no controlado: nada visual depende de el, asi que
  // se escribe directo en el DOM y se evita un render por cada verificacion.
  const setToken = (token: string) => {
    if (tokenRef.current) tokenRef.current.value = token;
  };

  // El token de hCaptcha es de un solo uso. Si el envio a Web3Forms fallo se
  // reinicia el widget, o el siguiente intento seria rechazado. Los errores de
  // campo se validan antes de gastarlo, por eso no disparan el reinicio (no
  // obligamos al usuario a rehacer el captcha por un email mal escrito).
  useEffect(() => {
    if (state.status === "error" && !state.fieldErrors) {
      captchaRef.current?.resetCaptcha();
      setToken("");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6" noValidate>
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
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-3 focus:ring-ring/30"
            aria-invalid={Boolean(state.fieldErrors?.nombre)}
          />
          {state.fieldErrors?.nombre && (
            <p className="mt-1 text-sm text-destructive">{state.fieldErrors.nombre}</p>
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
            className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-3 focus:ring-ring/30"
            aria-invalid={Boolean(state.fieldErrors?.telefono)}
          />
          {state.fieldErrors?.telefono && (
            <p className="mt-1 text-sm text-destructive">{state.fieldErrors.telefono}</p>
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
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-3 focus:ring-ring/30"
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-sm text-destructive">{state.fieldErrors.email}</p>
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
          className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-brand-900 outline-none focus:border-brand-500 focus:ring-3 focus:ring-ring/30"
          aria-invalid={Boolean(state.fieldErrors?.mensaje)}
        />
        {state.fieldErrors?.mensaje && (
          <p className="mt-1 text-sm text-destructive">{state.fieldErrors.mensaje}</p>
        )}
      </div>

      {/* Honeypot: campo oculto para bots, invisible y fuera del flujo de foco */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botcheck">No completar este campo</label>
        <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/*
        El script de hCaptcha suele inyectar su propio textarea llamado
        "h-captcha-response" dentro del form. Usamos un nombre distinto para no
        depender de ese detalle ni arriesgar dos campos homonimos: la Server
        Action lee este campo y lo reenvia a Web3Forms con el nombre que su
        API espera.
      */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITEKEY}
          reCaptchaCompat={false}
          languageOverride="es"
          onVerify={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
        <input ref={tokenRef} type="hidden" name="captcha_token" defaultValue="" />
        {state.fieldErrors?.captcha && (
          <p className="mt-1 text-sm text-destructive">{state.fieldErrors.captcha}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
