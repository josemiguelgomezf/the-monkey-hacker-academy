import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Target, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { EmailGate } from "@/components/EmailGate";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/comunidad")({
  head: () => ({
    meta: [
      { title: "Comunidad — MongoHacker" },
      {
        name: "description",
        content:
          "Únete a la comunidad MongoHacker. Retos mensuales muy sencillos, ranking y aprendizaje compartido. Solo necesitas tu email.",
      },
      { property: "og:title", content: "Comunidad MongoHacker" },
      { property: "og:description", content: "Retos mensuales y comunidad para curiosos digitales." },
      { property: "og:url", content: "/comunidad" },
    ],
    links: [{ rel: "canonical", href: "/comunidad" }],
  }),
  component: CommunityPage,
});

const ranking = [
  { user: "@banana_root", points: 320, badge: "🥇" },
  { user: "@n30nkong", points: 285, badge: "🥈" },
  { user: "@l4ra.byte", points: 240, badge: "🥉" },
  { user: "@zerocool_es", points: 210, badge: "" },
  { user: "@monke.exe", points: 180, badge: "" },
  { user: "@pxlwitch", points: 160, badge: "" },
  { user: "@grumpy_shell", points: 145, badge: "" },
  { user: "@_kernel_kid", points: 120, badge: "" },
];

function CommunityPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow="comunidad"
        title={t("community.title")}
        subtitle="Aquí no hay Discord ni ruido: retos cortos cada mes, ranking y aprendizaje compartido. Déjanos tu email y te avisamos del reto del mes."
        showMono
      />

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <div className="terminal-card p-8 scanlines relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(closest-side, oklch(0.82 0.24 145 / 0.6), transparent)" }}
            aria-hidden
          />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-wider">~/entra-al-clan</p>
                <p className="font-display text-lg font-bold">Recibe el reto del mes</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Cada mes proponemos un reto muy sencillo (10 minutos, sin instalar nada) para practicar lo aprendido. Suscríbete con tu email y te lo enviamos.
            </p>
            <div className="mt-5">
              <EmailGate source="comunidad" ctaLabel="Apuntarme a los retos" successMessage="¡Dentro! Te avisaremos del próximo reto." />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8">
        <div className="terminal-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="font-display text-xl font-bold">Ranking del mes</h3>
          </div>
          <ul className="divide-y divide-border/60">
            {ranking.map((u, i) => (
              <li key={u.user} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-muted-foreground w-6">{i + 1}</span>
                  <span className="text-2xl w-7 text-center">{u.badge}</span>
                  <span className="font-mono">{u.user}</span>
                </div>
                <span className="font-mono text-sm neon-text">{u.points} XP</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="terminal-card p-6 scanlines relative overflow-hidden">
          <div className="flex items-center gap-2 mb-5">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-bold">Retos mensuales</h3>
          </div>
          <div className="space-y-3">
            <div className="border border-primary/40 rounded-lg p-4 bg-primary/5">
              <div className="text-xs font-mono uppercase tracking-wider text-primary">
                Reto activo · Julio 2026
              </div>
              <h4 className="mt-2 font-display text-lg font-bold">Auditoría express de contraseñas</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Revisa 3 de tus cuentas importantes: comprueba si tienen contraseña única, si están en un gestor y si tienen 2FA. Comparte tu antes/después (sin datos reales) respondiendo al email del mes.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 opacity-70">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Junio 2026</div>
              <h4 className="mt-1 font-display font-bold">Diseña tu primer prompt con CRAFT</h4>
            </div>
            <div className="border border-border rounded-lg p-4 opacity-70">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Mayo 2026</div>
              <h4 className="mt-1 font-display font-bold">Caza un intento de phishing</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
