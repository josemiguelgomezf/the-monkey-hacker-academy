import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categoryById } from "@/data/categories";
import type { Article } from "@/data/articles";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const { t, lang } = useI18n();
  const cat = categoryById(article.category);

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className={`terminal-card group flex flex-col p-5 ${featured ? "md:p-7" : ""}`}
    >
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
        <span className={`${cat.accent}`}>{t(cat.labelKey)}</span>
        <span className="text-muted-foreground/60">·</span>
        <span className="text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" /> {article.minRead} {t("blog.minRead")}
        </span>
      </div>
      <h3
        className={`mt-3 font-display font-bold text-foreground group-hover:text-primary transition ${
          featured ? "text-2xl md:text-3xl" : "text-lg"
        }`}
      >
        {article.title[lang]}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt[lang]}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
