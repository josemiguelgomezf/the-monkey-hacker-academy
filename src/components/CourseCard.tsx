import { Link } from "@tanstack/react-router";
import { Clock, BookOpen, Star, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { categoryById } from "@/data/categories";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  const { t, lang } = useI18n();
  const cat = categoryById(course.category);
  const Icon = cat.icon;
  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <Link
      to="/academia/$slug"
      params={{ slug: course.slug }}
      className="terminal-card group relative flex flex-col p-5 overflow-hidden"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`p-2 rounded-md bg-primary/10 ${cat.accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex gap-1.5">
          {course.isNew && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
              <Sparkles className="h-3 w-3" /> {t("common.new")}
            </span>
          )}
          {course.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <Star className="h-3 w-3" /> {t("common.featured")}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-foreground group-hover:text-primary transition">
        {course.title[lang]}
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{course.summary[lang]}</p>

      <div className="mt-auto pt-5 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {course.durationHours}h
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" /> {totalLessons} {t("academy.lessons")}
        </span>
        <span className="text-primary">{t(`common.${course.level}` as const)}</span>
      </div>
    </Link>
  );
}
