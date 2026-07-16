import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { subscribeEmail } from "@/lib/email.functions";

const schema = z.object({
  email: z.string().trim().email("Email no válido").max(255),
  name: z.string().trim().max(120).optional(),
});

interface Props {
  source: string;
  ctaLabel?: string;
  placeholder?: string;
  requireName?: boolean;
  onSuccess?: (payload: { email: string; name?: string }) => void;
  variant?: "default" | "compact";
  successMessage?: string;
}

export function EmailGate({
  source,
  ctaLabel = "Suscribirme",
  placeholder = "tu@email.com",
  requireName = false,
  onSuccess,
  variant = "default",
  successMessage = "¡Listo! Te hemos añadido.",
}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const call = useServerFn(subscribeEmail);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, name: requireName ? name : undefined });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Datos no válidos");
      return;
    }
    if (requireName && !name.trim()) {
      toast.error("Escribe tu nombre para el certificado");
      return;
    }
    setLoading(true);
    try {
      await call({ data: { email: parsed.data.email, source, name: parsed.data.name } });
      toast.success(successMessage);
      onSuccess?.({ email: parsed.data.email, name: parsed.data.name });
      if (!onSuccess) {
        setEmail("");
        setName("");
      }
    } catch (err) {
      console.error(err);
      toast.error("No pudimos guardar tu email. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full space-y-3">
      {requireName && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre completo (para el certificado)"
          required
          maxLength={120}
          className="w-full rounded-md bg-input border border-border px-4 py-3 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/60"
        />
      )}
      <div className={`flex w-full ${variant === "compact" ? "flex-row" : "flex-col sm:flex-row"} gap-2`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          maxLength={255}
          className="flex-1 rounded-md bg-input border border-border px-4 py-3 text-sm font-mono outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition neon-glow whitespace-nowrap disabled:opacity-60"
        >
          {loading ? "Enviando…" : ctaLabel}
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Al enviar tu email aceptas que podamos escribirte con novedades, cursos y contenido de MongoHacker.
        Puedes darte de baja cuando quieras.
      </p>
    </form>
  );
}
