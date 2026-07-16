import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CourseCard } from "@/components/CourseCard";
import { useI18n } from "@/lib/i18n";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/academia/")({
  head: () => ({
    meta: [
      { title: "Academia — MongoHacker" },
      {
        name: "description",
        content:
          "Curso gratuito de Conceptos de IA para cualquier persona: prompts, tokens, contexto, memorias, modelos y automatización.",
      },
      { property: "og:title", content: "Academia MongoHacker" },
      { property: "og:description", content: "Cursos para humanos: aprende IA sin tecnicismos." },
      { property: "og:url", content: "/academia" },
    ],
    links: [{ rel: "canonical", href: "/academia" }],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        eyebrow="academia"
        title={t("academy.title")}
        subtitle={t("academy.subtitle")}
        showMono
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground font-mono">
          Más cursos en camino. Suscríbete a <a href="/mongomail" className="text-primary hover:underline">MongoMail</a> para enterarte primero.
        </p>
      </section>
    </>
  );
}
