import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  ListChecks,
  Lock,
  Award,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { courseBySlug, type Course, type QuizQuestion } from "@/data/courses";
import { categoryById } from "@/data/categories";
import { useI18n } from "@/lib/i18n";
import { EmailGate } from "@/components/EmailGate";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/academia/$slug")({
  loader: ({ params }) => {
    const course = courseBySlug(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.course;
    if (!c) return { meta: [{ title: "Curso — MongoHacker" }] };
    return {
      meta: [
        { title: `${c.title.es} — MongoHacker` },
        { name: "description", content: c.summary.es },
        { property: "og:title", content: c.title.es },
        { property: "og:description", content: c.summary.es },
        { property: "og:url", content: `/academia/${c.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/academia/${c.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Curso no encontrado</h1>
      <Link to="/academia" className="mt-4 inline-block text-primary hover:underline">
        ← Volver al catálogo
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Algo falló</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: CoursePage,
});

interface Enrollment {
  name: string;
  email: string;
  startedAt: string;
}

function storageKey(slug: string) {
  return `mh-course:${slug}`;
}

function CoursePage() {
  const { course } = Route.useLoaderData() as { course: Course };
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(course.slug));
      if (raw) setEnrollment(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, [course.slug]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-muted-foreground">Cargando…</div>
    );
  }

  if (!enrollment) {
    return (
      <EnrollGate
        course={course}
        onDone={(payload) => {
          const e: Enrollment = {
            name: payload.name ?? "Estudiante MongoHacker",
            email: payload.email,
            startedAt: new Date().toISOString(),
          };
          localStorage.setItem(storageKey(course.slug), JSON.stringify(e));
          setEnrollment(e);
        }}
      />
    );
  }

  return <CoursePlayer course={course} enrollment={enrollment} />;
}

function EnrollGate({ course, onDone }: { course: Course; onDone: (p: { name: string; email: string }) => void }) {
  const { lang } = useI18n();
  const cat = categoryById(course.category);
  const Icon = cat.icon;
  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <>
      <section className="relative border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
          <Link to="/academia" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 font-mono">
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <div className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider ${cat.accent}`}>
            <Icon className="h-4 w-4" /> Inteligencia Artificial · Principiante
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
            {course.title[lang]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{course.description[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-mono text-muted-foreground">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {course.durationHours}h estimadas</span>
            <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> {totalLessons} lecciones</span>
            <span className="flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" /> {course.modules.length} módulos + examen</span>
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certificado personalizado</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
        <div className="terminal-card p-8 scanlines relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary">
            <Lock className="h-3.5 w-3.5" /> Acceso gratuito
          </div>
          <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold">
            Rellena el formulario y empieza ahora
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            El curso es 100% gratis. Solo necesitamos tu nombre (para el certificado) y tu email para darte acceso.
          </p>
          <div className="mt-6">
            <EmailGate
              source={`course:${course.slug}`}
              ctaLabel="Empezar curso"
              placeholder="tu@email.com"
              requireName
              successMessage="¡Acceso desbloqueado! Empecemos."
              onSuccess={(p) => onDone({ name: p.name ?? "Estudiante MongoHacker", email: p.email })}
            />
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-xl font-bold mb-4">Lo que vas a aprender</h3>
          <ul className="space-y-2">
            {course.modules.map((m) => (
              <li key={m.id} className="terminal-card p-4 text-sm">
                <div className="font-display font-semibold text-foreground">{m.title}</div>
                <p className="text-muted-foreground mt-1">{m.intro}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// ----- Player -----

interface ProgressState {
  completedLessons: Record<string, boolean>;
  quizScores: Record<string, number>; // per moduleId, 0-100
  finalScore?: number;
  finalPassed?: boolean;
}

function loadProgress(slug: string): ProgressState {
  try {
    const raw = localStorage.getItem(storageKey(slug) + ":progress");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedLessons: {}, quizScores: {} };
}

function saveProgress(slug: string, p: ProgressState) {
  localStorage.setItem(storageKey(slug) + ":progress", JSON.stringify(p));
}

function CoursePlayer({ course, enrollment }: { course: Course; enrollment: Enrollment }) {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(course.slug));
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [view, setView] = useState<"lesson" | "quiz" | "final">("lesson");

  useEffect(() => saveProgress(course.slug, progress), [progress, course.slug]);

  const modules = course.modules;
  const activeModule = modules[activeModuleIdx];
  const activeLesson = activeModule.lessons[activeLessonIdx];

  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
  const completedCount = Object.values(progress.completedLessons).filter(Boolean).length;
  const overallPct = Math.round((completedCount / totalLessons) * 100);

  const allModulesPassed = modules.every((m) => (progress.quizScores[m.id] ?? 0) >= course.passingScore);

  const markLessonDone = () => {
    setProgress((p) => ({
      ...p,
      completedLessons: { ...p.completedLessons, [activeLesson.id]: true },
    }));
  };

  const goNext = () => {
    markLessonDone();
    if (activeLessonIdx + 1 < activeModule.lessons.length) {
      setActiveLessonIdx(activeLessonIdx + 1);
    } else {
      setView("quiz");
    }
  };

  const goPrev = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
    } else if (activeModuleIdx > 0) {
      const prevMod = modules[activeModuleIdx - 1];
      setActiveModuleIdx(activeModuleIdx - 1);
      setActiveLessonIdx(prevMod.lessons.length - 1);
    }
  };

  const onQuizComplete = (score: number) => {
    setProgress((p) => ({ ...p, quizScores: { ...p.quizScores, [activeModule.id]: score } }));
    if (score >= course.passingScore) {
      toast.success(`¡Aprobado con ${score}%!`);
      if (activeModuleIdx + 1 < modules.length) {
        setActiveModuleIdx(activeModuleIdx + 1);
        setActiveLessonIdx(0);
        setView("lesson");
      } else {
        setView("final");
      }
    } else {
      toast.error(`Puntuaste ${score}%. Repasa el módulo e inténtalo de nuevo (necesitas ${course.passingScore}%).`);
    }
  };

  const jumpTo = (mIdx: number, lIdx: number) => {
    setActiveModuleIdx(mIdx);
    setActiveLessonIdx(lIdx);
    setView("lesson");
  };

  const resetCourse = () => {
    if (!confirm("¿Reiniciar todo el progreso del curso?")) return;
    localStorage.removeItem(storageKey(course.slug) + ":progress");
    setProgress({ completedLessons: {}, quizScores: {} });
    setActiveModuleIdx(0);
    setActiveLessonIdx(0);
    setView("lesson");
  };

  return (
    <>
      <PageHero
        eyebrow={`hola, ${enrollment.name.split(" ")[0].toLowerCase()}`}
        title={course.title.es}
        subtitle={`Progreso: ${overallPct}% · ${completedCount}/${totalLessons} lecciones`}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="terminal-card p-4 h-fit lg:sticky lg:top-24">
          <div className="mb-4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${overallPct}%` }} />
            </div>
            <p className="mt-2 text-xs font-mono text-muted-foreground">{overallPct}% completado</p>
          </div>

          <nav className="space-y-4 text-sm">
            {modules.map((m, mIdx) => {
              const passed = (progress.quizScores[m.id] ?? 0) >= course.passingScore;
              return (
                <div key={m.id}>
                  <div className="flex items-center justify-between font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    <span>{`M${mIdx + 1}`}</span>
                    {passed && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {m.lessons.map((l, lIdx) => {
                      const done = progress.completedLessons[l.id];
                      const active = view === "lesson" && mIdx === activeModuleIdx && lIdx === activeLessonIdx;
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => jumpTo(mIdx, lIdx)}
                            className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                              active ? "bg-primary/15 text-primary" : "hover:bg-secondary text-foreground/80"
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                            ) : (
                              <span className="h-3.5 w-3.5 rounded-full border border-border shrink-0" />
                            )}
                            <span className="truncate">{l.title}</span>
                          </button>
                        </li>
                      );
                    })}
                    <li>
                      <button
                        onClick={() => {
                          setActiveModuleIdx(mIdx);
                          setView("quiz");
                        }}
                        className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-xs font-mono ${
                          view === "quiz" && mIdx === activeModuleIdx
                            ? "bg-primary/15 text-primary"
                            : "hover:bg-secondary text-muted-foreground"
                        }`}
                      >
                        <ListChecks className="h-3.5 w-3.5 shrink-0" />
                        Quiz módulo {mIdx + 1}
                        {passed && <span className="ml-auto text-primary">{progress.quizScores[m.id]}%</span>}
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
            <div>
              <button
                onClick={() => setView("final")}
                disabled={!allModulesPassed}
                className={`w-full text-left flex items-center gap-2 px-2 py-2 rounded text-xs font-mono ${
                  view === "final" ? "bg-primary/15 text-primary" : "hover:bg-secondary text-foreground"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <Award className="h-3.5 w-3.5 shrink-0" />
                Examen final
                {progress.finalPassed && <CheckCircle2 className="h-3.5 w-3.5 text-primary ml-auto" />}
              </button>
            </div>
          </nav>

          <button
            onClick={resetCourse}
            className="mt-6 w-full inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-destructive font-mono"
          >
            <RefreshCw className="h-3 w-3" /> Reiniciar progreso
          </button>
        </aside>

        {/* Content */}
        <div>
          {view === "lesson" && (
            <article className="terminal-card p-6 md:p-10">
              <p className="text-xs font-mono uppercase tracking-wider text-primary">{activeModule.title}</p>
              <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold">{activeLesson.title}</h2>
              <p className="mt-1 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> {activeLesson.minutes} min
              </p>
              <div className="mt-6 space-y-4 text-foreground/90 leading-relaxed">
                {renderContent(activeLesson.content)}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6">
                <button
                  onClick={goPrev}
                  disabled={activeModuleIdx === 0 && activeLessonIdx === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Anterior
                </button>
                <button
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 neon-glow"
                >
                  {activeLessonIdx + 1 < activeModule.lessons.length ? "Siguiente lección" : "Hacer quiz del módulo"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          )}

          {view === "quiz" && (
            <QuizView
              key={activeModule.id + (progress.quizScores[activeModule.id] ?? "")}
              title={`Quiz · ${activeModule.title}`}
              questions={activeModule.quiz}
              passingScore={course.passingScore}
              onDone={onQuizComplete}
              onBackToLessons={() => {
                setActiveLessonIdx(activeModule.lessons.length - 1);
                setView("lesson");
              }}
            />
          )}

          {view === "final" && (
            <FinalExamView
              course={course}
              enrollment={enrollment}
              locked={!allModulesPassed}
              alreadyPassed={progress.finalPassed}
              lastScore={progress.finalScore}
              onDone={(score, passed) =>
                setProgress((p) => ({ ...p, finalScore: score, finalPassed: passed }))
              }
            />
          )}
        </div>
      </section>
    </>
  );
}

function renderContent(md: string) {
  const blocks = md.split(/\n\n+/);
  return blocks.map((b, i) => {
    if (b.startsWith("- ") || b.startsWith("* ")) {
      const items = b.split("\n").map((l) => l.replace(/^[-*]\s+/, ""));
      return (
        <ul key={i} className="list-disc pl-5 space-y-1.5">
          {items.map((it, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
          ))}
        </ul>
      );
    }
    if (b.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-2 border-primary/60 pl-4 italic text-muted-foreground">
          <span dangerouslySetInnerHTML={{ __html: inline(b.replace(/^>\s?/gm, "")) }} />
        </blockquote>
      );
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b) }} />;
  });
}

function inline(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>')
    .replace(/\n/g, "<br/>");
}

function QuizView({
  title,
  questions,
  passingScore,
  onDone,
  onBackToLessons,
}: {
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  onDone: (score: number) => void;
  onBackToLessons?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let ok = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) ok++;
    });
    return Math.round((ok / questions.length) * 100);
  }, [answers, questions]);

  const submit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Responde todas las preguntas");
      return;
    }
    setSubmitted(true);
    onDone(score);
  };

  return (
    <div className="terminal-card p-6 md:p-10">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2">
        <ListChecks className="h-6 w-6 text-primary" /> {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Necesitas al menos {passingScore}% para pasar al siguiente módulo.
      </p>

      <div className="mt-6 space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="border border-border/60 rounded-lg p-4">
            <p className="font-display font-semibold">
              {i + 1}. {q.q}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const chosen = answers[i] === oi;
                const correct = submitted && oi === q.answer;
                const wrong = submitted && chosen && oi !== q.answer;
                return (
                  <label
                    key={oi}
                    className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition text-sm ${
                      correct
                        ? "border-primary bg-primary/10"
                        : wrong
                        ? "border-destructive bg-destructive/10"
                        : chosen
                        ? "border-primary/60 bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${i}`}
                      className="mt-0.5 accent-primary"
                      disabled={submitted}
                      checked={chosen}
                      onChange={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={submit}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 neon-glow"
        >
          Enviar respuestas
        </button>
      ) : (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div
            className={`rounded-md px-4 py-3 font-mono text-sm ${
              score >= passingScore ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
            }`}
          >
            Puntuación: {score}%
          </div>
          {score < passingScore && (
            <>
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="text-sm underline text-muted-foreground hover:text-foreground"
              >
                Reintentar
              </button>
              {onBackToLessons && (
                <button
                  onClick={onBackToLessons}
                  className="text-sm underline text-muted-foreground hover:text-foreground"
                >
                  Volver a repasar
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function FinalExamView({
  course,
  enrollment,
  locked,
  alreadyPassed,
  lastScore,
  onDone,
}: {
  course: Course;
  enrollment: Enrollment;
  locked: boolean;
  alreadyPassed?: boolean;
  lastScore?: number;
  onDone: (score: number, passed: boolean) => void;
}) {
  const [state, setState] = useState<"intro" | "exam" | "result">(alreadyPassed ? "result" : "intro");
  const [finalScore, setFinalScore] = useState<number>(lastScore ?? 0);

  if (locked) {
    return (
      <div className="terminal-card p-10 text-center">
        <Lock className="h-10 w-10 text-muted-foreground mx-auto" />
        <h2 className="mt-4 font-display text-2xl font-bold">Examen bloqueado</h2>
        <p className="mt-2 text-muted-foreground">
          Termina y aprueba los quizzes de todos los módulos para desbloquear el examen final.
        </p>
      </div>
    );
  }

  if (state === "intro") {
    return (
      <div className="terminal-card p-10 text-center">
        <Sparkles className="h-10 w-10 text-primary mx-auto" />
        <h2 className="mt-4 font-display text-3xl font-bold">Examen final</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          10 preguntas que cubren todo el curso. Necesitas {course.passingScore}% para obtener tu certificado personalizado.
        </p>
        <button
          onClick={() => setState("exam")}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 neon-glow"
        >
          Empezar examen
        </button>
      </div>
    );
  }

  if (state === "exam") {
    return (
      <QuizView
        title="Examen final"
        questions={course.finalExam}
        passingScore={course.passingScore}
        onDone={(score) => {
          const passed = score >= course.passingScore;
          setFinalScore(score);
          onDone(score, passed);
          if (passed) {
            setTimeout(() => setState("result"), 800);
          }
        }}
      />
    );
  }

  // result
  return <CertificateView course={course} enrollment={enrollment} score={finalScore || (lastScore ?? 100)} />;
}

function CertificateView({
  course,
  enrollment,
  score,
}: {
  course: Course;
  enrollment: Enrollment;
  score: number;
}) {
  const download = () => generateCertificate({ name: enrollment.name, course: course.title.es, hours: course.durationHours, score });

  return (
    <div className="terminal-card p-8 md:p-10 text-center">
      <Award className="h-14 w-14 text-primary mx-auto neon-text" />
      <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold">¡Enhorabuena, {enrollment.name.split(" ")[0]}!</h2>
      <p className="mt-2 text-muted-foreground">
        Has completado <strong>{course.title.es}</strong> con un {score}%. Descarga tu certificado personalizado.
      </p>

      <div className="mt-8 mx-auto max-w-2xl border-2 border-primary/40 rounded-lg p-8 bg-gradient-to-br from-card via-card to-primary/5 text-left">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary">MongoHacker Academy</div>
        <div className="mt-4 text-sm text-muted-foreground">Certifica que</div>
        <div className="mt-1 font-display text-2xl md:text-3xl font-bold">{enrollment.name}</div>
        <div className="mt-4 text-sm text-muted-foreground">ha completado con éxito el curso</div>
        <div className="mt-1 font-display text-xl font-bold text-primary">{course.title.es}</div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono text-muted-foreground">
          <div>
            <div className="uppercase tracking-wider">Duración</div>
            <div className="text-foreground text-sm">{course.durationHours} horas</div>
          </div>
          <div>
            <div className="uppercase tracking-wider">Puntuación</div>
            <div className="text-foreground text-sm">{score}%</div>
          </div>
          <div>
            <div className="uppercase tracking-wider">Fecha</div>
            <div className="text-foreground text-sm">{new Date().toLocaleDateString("es-ES", { dateStyle: "long" })}</div>
          </div>
          <div>
            <div className="uppercase tracking-wider">Firma</div>
            <div className="text-foreground text-sm">José M. Gómez · MongoHacker</div>
          </div>
        </div>
      </div>

      <button
        onClick={download}
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 neon-glow"
      >
        <Download className="h-4 w-4" /> Descargar certificado (PNG)
      </button>
    </div>
  );
}

function generateCertificate({ name, course, hours, score }: { name: string; course: string; hours: number; score: number }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1130;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#0a0f0a");
  grad.addColorStop(1, "#0f1a12");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
  ctx.strokeStyle = "rgba(34,197,94,0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

  ctx.textAlign = "center";
  ctx.fillStyle = "#22c55e";
  ctx.font = "bold 28px monospace";
  ctx.fillText("MONGOHACKER · ACADEMY", canvas.width / 2, 160);

  ctx.fillStyle = "#a8b3a8";
  ctx.font = "24px sans-serif";
  ctx.fillText("Certificado de finalización", canvas.width / 2, 240);

  ctx.fillStyle = "#e6ffe6";
  ctx.font = "italic 26px serif";
  ctx.fillText("Se otorga a", canvas.width / 2, 340);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 76px 'Georgia', serif";
  ctx.fillText(name, canvas.width / 2, 450);

  ctx.fillStyle = "#a8b3a8";
  ctx.font = "24px sans-serif";
  ctx.fillText("por haber completado con éxito el curso", canvas.width / 2, 530);

  ctx.fillStyle = "#22c55e";
  ctx.font = "bold 44px sans-serif";
  wrapText(ctx, `«${course}»`, canvas.width / 2, 610, canvas.width - 260, 54);

  ctx.fillStyle = "#a8b3a8";
  ctx.font = "22px sans-serif";
  ctx.fillText(
    `Duración estimada: ${hours} horas · Puntuación final: ${score}%`,
    canvas.width / 2,
    760,
  );

  const date = new Date().toLocaleDateString("es-ES", { dateStyle: "long" });
  ctx.fillText(`Emitido el ${date}`, canvas.width / 2, 800);

  // Signature
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 200, 960);
  ctx.lineTo(canvas.width / 2 + 200, 960);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 24px serif";
  ctx.fillText("José Miguel Gómez Fernández", canvas.width / 2, 995);
  ctx.fillStyle = "#a8b3a8";
  ctx.font = "18px sans-serif";
  ctx.fillText("Fundador · MongoHacker", canvas.width / 2, 1025);

  ctx.fillStyle = "rgba(34,197,94,0.5)";
  ctx.font = "16px monospace";
  ctx.fillText("mongohacker.academy · </> 1010", canvas.width / 2, 1080);

  const link = document.createElement("a");
  const safe = name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  link.download = `certificado-mongohacker-${safe}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}
