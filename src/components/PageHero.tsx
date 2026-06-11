import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  showMono = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  showMono?: boolean;
}) {
  const { t } = useI18n();
  void t;
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
        <div className="flex items-start gap-6">
          {showMono && <Logo size={64} className="ring-2 ring-primary/50 neon-glow shrink-0" />}
          <div className="flex-1">
            {eyebrow && (
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">
                <span className="text-muted-foreground">~/</span>
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
