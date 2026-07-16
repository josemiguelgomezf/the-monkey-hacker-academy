import { Link } from "@tanstack/react-router";
import { Youtube, Instagram, Music2 } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("footer.product"),
      links: [
        { to: "/academia", label: t("nav.academy") },
        { to: "/blog", label: t("nav.blog") },
        { to: "/recursos", label: t("nav.resources") },
        { to: "/mongomail", label: t("nav.mongomail") },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { to: "/sobre", label: t("nav.about") },
        { to: "/comunidad", label: t("nav.community") },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { to: "/", label: t("footer.privacy") },
        { to: "/", label: t("footer.terms") },
        { to: "/", label: t("footer.cookies") },
      ],
    },
  ] as const;

  return (
    <footer className="border-t border-border/60 bg-card/30 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={40} className="ring-2 ring-primary/40" />
              <div className="font-display text-lg font-bold">
                Mongo<span className="neon-text">Hacker</span>
              </div>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("footer.tagline")}</p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="https://www.youtube.com/@MongoHacker" target="_blank" rel="noreferrer" className="hover:text-primary transition" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/mongohacker/" target="_blank" rel="noreferrer" className="hover:text-primary transition" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@mongohacker" target="_blank" rel="noreferrer" className="hover:text-primary transition" aria-label="TikTok">
                <Music2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                {c.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="font-mono">
            <span className="text-primary">$</span> © {year} MongoHacker · {t("footer.rights")}
          </p>
          <p className="font-mono">{"</>"} 1010 · hecho con caña y plátanos</p>
        </div>
      </div>
    </footer>
  );
}
