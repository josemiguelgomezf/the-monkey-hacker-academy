
# MongoHacker Academy — Plan Fase 1

Construir una web multi-página estática con identidad visual fuerte (mono hacker, tema oscuro, verde neón), totalmente responsive y SEO-ready. Sin backend ni auth en esta fase — los formularios y catálogos muestran datos mock pero con UX completa para iterar después.

## Identidad visual

- **Paleta**: negro profundo (`#0a0a0a`), verde neón (`#22c55e` / `#39ff14` para acentos), blanco roto, grises técnicos. Glow sutil en CTAs y elementos clave.
- **Tipografía**: display tipo tech/mono (Space Grotesk para headings, JetBrains Mono para acentos de código, Inter para body).
- **Mascota**: logo del mono se usa como avatar de marca en hero, navbar y footer. Subo el logo como asset CDN.
- **Detalles**: terminal-like cards, badges `</>` y `1010`, líneas de scanlines suaves, hover glow verde.

## Idiomas

i18n ES/EN desde el inicio con `react-i18next` (recursos JSON locales, switcher en navbar, ES por defecto). Sin routing por locale para mantenerlo simple — el idioma se persiste en localStorage.

## Estructura de rutas (TanStack Start)

```
src/routes/
  __root.tsx              -> shell (navbar + footer + i18n provider)
  index.tsx               -> Landing
  academia.tsx            -> Catálogo cursos + filtros por categoría
  academia.$slug.tsx      -> Ficha de curso (preview, temario, CTA)
  blog.tsx                -> Listado + buscador + categorías/etiquetas
  blog.$slug.tsx          -> Artículo (JSON-LD Article)
  mongomail.tsx           -> Newsletter + archivo
  recursos.tsx            -> Ebooks, checklists, plantillas, guías
  comunidad.tsx           -> Discord, ranking, retos
  sobre.tsx               -> José Miguel Gómez Fernández
```

Cada ruta con `head()` propio (title, description, og:*) en ambos idiomas. Canonical solo en hojas. JSON-LD Organization en root, Article en blog posts.

## Componentes reutilizables (`src/components/`)

- `Navbar` — logo mono, links, switcher idioma, CTA "Suscríbete"
- `Footer` — branding, enlaces, redes, mini newsletter
- `Hero` — eslogan "Ciberseguridad para humanos (y monos)", mono ilustrado, CTAs
- `StatsBar` — alumnos, artículos, suscriptores (counters)
- `CourseCard`, `CourseFilters`, `CategoryBadge`
- `ArticleCard`, `SearchBar`, `TagPill`
- `NewsletterForm` (validación zod, fake submit con toast)
- `ResourceCard` (con captura de email modal)
- `FeatureGrid`, `TestimonialCard`, `MonoIllustration`
- `SectionHeading`, `GlowButton`, `TerminalCard`

## Categorías de cursos

Ciberseguridad, IA, Programación, Productividad Digital — cada una con color/icono propio derivado del verde base.

## Datos mock

`src/data/` con `courses.ts`, `articles.ts`, `resources.ts`, `newsletters.ts` tipados. Suficiente contenido para que cada página se sienta viva (6+ cursos, 6+ artículos, 4+ recursos, 3+ newsletters).

## SEO y rendimiento

- `head()` por ruta con OG/Twitter completo
- Sitemap.xml y robots.txt
- JSON-LD Organization (root) + Article (blog leaf)
- Imágenes responsive, lazy loading, alt en ambos idiomas
- Tema oscuro nativo (sin toggle por ahora)

## Lo que NO entra en esta fase

Auth, panel alumno, sistema de cursos con vídeo/progreso/quiz, certificados, panel admin, pagos, Discord OAuth real, CMS de blog, descarga real de recursos. Todo eso queda planificado para fases siguientes — los CTAs/formularios existen y muestran toasts informativos.

## Roadmap posterior (referencia)

1. Lovable Cloud + auth (email + Google)
2. CMS blog + recursos descargables reales (newsletter gating)
3. Sistema de cursos: lecciones video, progreso, quizzes, certificados PDF
4. Panel alumno + perfil
5. Comunidad: Discord OAuth, ranking, retos
6. Pagos (Stripe): premium, membresía, donaciones
7. Panel admin (cursos, artículos, usuarios, métricas)

---

Si te parece bien, paso a construirlo.
