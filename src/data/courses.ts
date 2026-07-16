import type { CategoryId } from "./categories";

export type Level = "beginner" | "intermediate" | "advanced";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index of correct option
  explain?: string;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  content: string; // markdown-lite (paragraphs separated by \n\n; **bold**; - bullets)
}

export interface Module {
  id: string;
  title: string;
  intro: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface Course {
  slug: string;
  title: { es: string; en: string };
  summary: { es: string; en: string };
  description: { es: string; en: string };
  category: CategoryId;
  level: Level;
  durationHours: number;
  featured?: boolean;
  isNew?: boolean;
  modules: Module[];
  finalExam: QuizQuestion[];
  passingScore: number; // 0-100
}

export const courses: Course[] = [
  {
    slug: "conceptos-de-ia",
    title: {
      es: "Conceptos de IA para cualquier persona",
      en: "AI concepts for everyone",
    },
    summary: {
      es: "Entiende de una vez qué es un prompt, un token, el contexto, las memorias y cuándo automatizar con IA. Sin tecnicismos.",
      en: "Finally understand prompts, tokens, context, memories and when to automate with AI. No jargon.",
    },
    description: {
      es: "Un curso corto y directo pensado para personas sin base técnica. En unas 2 horas dominarás el vocabulario real de la IA generativa (prompt, token, contexto, sesión, memoria), aprenderás la metodología CRAFT para escribir prompts que funcionan, conocerás las diferencias entre ChatGPT, Claude, Gemini, DeepSeek y Copilot, y sabrás decidir cuándo automatizar un proceso con IA y cuándo no.",
      en: "A short, direct course for non-technical people. In about 2 hours you'll master the real vocabulary of generative AI (prompt, token, context, session, memory), learn the CRAFT methodology for prompts that work, understand the differences between ChatGPT, Claude, Gemini, DeepSeek and Copilot, and know when to automate a process with AI and when not to.",
    },
    category: "ai",
    level: "beginner",
    durationHours: 2,
    featured: true,
    isNew: true,
    passingScore: 70,
    modules: [
      {
        id: "m1-fundamentos",
        title: "Módulo 1 · Los fundamentos que nadie te explica",
        intro:
          "Antes de escribir un solo prompt, necesitas entender de qué hablamos cuando decimos IA generativa. Nada de matemáticas: analogías claras.",
        lessons: [
          {
            id: "l1-que-es",
            title: "¿Qué es realmente una IA generativa?",
            minutes: 6,
            content:
              "Una IA generativa (ChatGPT, Claude, Gemini...) no piensa ni entiende como un humano. Es un modelo estadístico gigantesco que ha leído millones de textos y aprendió a predecir la siguiente palabra más probable dado lo que escribiste.\n\nImagina un autocompletar del móvil, pero entrenado con casi toda la información pública de internet. Esa es la magia y el límite.\n\n**Consecuencias prácticas que debes recordar:**\n- No sabe si algo es verdad: sabe qué respuesta suena verdadera.\n- Puede inventarse datos (a esto se le llama **alucinación**).\n- Cada respuesta nueva se genera palabra a palabra, en tiempo real.\n- No tiene opiniones propias: replica patrones de lo que ha visto.",
          },
          {
            id: "l2-tokens",
            title: "Tokens: la unidad con la que la IA cobra y piensa",
            minutes: 5,
            content:
              "La IA no ve palabras, ve **tokens**. Un token es un trozo de texto: puede ser una palabra corta, parte de una palabra o incluso un signo de puntuación.\n\nRegla rápida en español: **1 token ≈ 0,75 palabras**. Un mensaje de 400 palabras son unos 530 tokens.\n\n¿Por qué te importa?\n- Los modelos cobran por token (entrada y salida).\n- Cada modelo tiene un límite de tokens por conversación: la famosa **ventana de contexto**.\n- Si tu prompt es enorme, gastas más y a veces la IA \"olvida\" lo del principio.\n\nPráctica: sé claro y conciso. Un buen prompt no es el más largo, es el más útil.",
          },
          {
            id: "l3-contexto",
            title: "Contexto, sesión y memoria: los tres se confunden",
            minutes: 7,
            content:
              "Estos tres conceptos parecen lo mismo y no lo son. Aclararlos te ahorra frustración.\n\n**Contexto:** todo lo que el modelo tiene delante en este mismo mensaje. Incluye tu prompt, los mensajes anteriores de la conversación y cualquier documento adjunto. Cuando se llena, empieza a olvidar lo más antiguo.\n\n**Sesión:** la conversación abierta. Si cierras el chat y abres uno nuevo, empieza en blanco (salvo que la app tenga memoria activada).\n\n**Memoria:** una funcionalidad extra donde el modelo guarda hechos sobre ti entre sesiones (por ejemplo: \"eres profesor\", \"te gusta el tono directo\"). No todos los modelos la tienen, y puede desactivarse.\n\nHoy conviven, básicamente, tres tipos de memoria:\n- **Memoria de sesión:** dura mientras la conversación esté abierta.\n- **Memoria persistente del asistente:** hechos que el modelo recuerda entre chats (ChatGPT, Gemini).\n- **Memoria vía RAG:** el sistema consulta una base de conocimiento externa (tus documentos, tu web) y la mete en el contexto solo cuando hace falta.",
          },
          {
            id: "l4-alucinaciones",
            title: "Alucinaciones y sesgos: lo que la IA no te dice",
            minutes: 4,
            content:
              "Cuando el modelo no sabe algo, **no calla: rellena**. Se lo inventa con seguridad. A eso lo llamamos alucinación.\n\nPara reducirlas:\n- Pide fuentes y verifícalas tú.\n- Da tú el contexto (pega el documento en lugar de pedirle que lo busque).\n- Usa modelos con navegación web activa cuando necesites datos actualizados.\n- Nunca uses IA como única fuente en temas legales, médicos o financieros.",
          },
        ],
        quiz: [
          {
            q: "¿Qué es un token?",
            options: [
              "Una moneda que se compra dentro de ChatGPT",
              "Un trozo de texto: la unidad mínima que la IA procesa y por la que se cobra",
              "El nombre técnico de una conversación",
              "Un archivo de configuración del modelo",
            ],
            answer: 1,
          },
          {
            q: "¿Qué diferencia hay entre contexto y memoria?",
            options: [
              "Son sinónimos",
              "El contexto es lo que el modelo ve ahora mismo; la memoria son hechos que persisten entre sesiones",
              "La memoria es lo que cuesta dinero, el contexto no",
              "El contexto solo existe en Gemini",
            ],
            answer: 1,
          },
          {
            q: "¿Qué es una alucinación en IA?",
            options: [
              "Un error de conexión",
              "Cuando el modelo se inventa información con seguridad",
              "Un tipo de prompt avanzado",
              "Un fallo del navegador",
            ],
            answer: 1,
          },
          {
            q: "¿Cuál de estas afirmaciones es cierta?",
            options: [
              "La IA piensa igual que un humano",
              "La IA sabe siempre si lo que dice es verdad",
              "La IA predice el siguiente token más probable según patrones aprendidos",
              "La IA solo funciona con conexión a bases de datos oficiales",
            ],
            answer: 2,
          },
        ],
      },
      {
        id: "m2-prompts-craft",
        title: "Módulo 2 · Prompts que funcionan: la metodología CRAFT",
        intro:
          "Escribir prompts no es magia, es método. CRAFT es una plantilla mental sencilla que puedes aplicar a cualquier petición.",
        lessons: [
          {
            id: "l1-que-es-prompt",
            title: "¿Qué es un prompt (y qué no lo es)?",
            minutes: 4,
            content:
              "Un **prompt** es la instrucción que le das a la IA. Puede ser una pregunta (\"¿qué es la fotosíntesis?\") o una orden compleja con formato, ejemplos y restricciones.\n\nLa calidad de la respuesta depende directamente de la calidad del prompt. La misma IA puede darte una respuesta genérica o brillante según cómo le hables.\n\nRegla de oro: **si el resultado no te gusta, el problema casi siempre está en el prompt, no en el modelo.**",
          },
          {
            id: "l2-craft",
            title: "La metodología CRAFT paso a paso",
            minutes: 8,
            content:
              "CRAFT es un acrónimo que te obliga a incluir lo esencial en cualquier prompt serio:\n\n**C — Contexto:** dile a la IA quién eres, para qué es y a quién va dirigido. Ej: \"Soy profesor de primaria y necesito explicar la fotosíntesis a niños de 8 años\".\n\n**R — Rol:** pídele que asuma un papel concreto. Ej: \"Actúa como un divulgador científico paciente\".\n\n**A — Acción:** deja clarísimo qué quieres que haga. Verbos concretos: resume, compara, redacta, traduce, corrige, genera.\n\n**F — Formato:** dile cómo quieres la respuesta. Lista, tabla, párrafos cortos, JSON, tono formal, número de palabras.\n\n**T — Target (objetivo/tono):** define el resultado ideal y las restricciones. Ej: \"Que sea divertido, sin jerga técnica, máximo 200 palabras\".\n\nCon CRAFT pasas de \"explícame la fotosíntesis\" a un prompt que produce exactamente lo que necesitas.",
          },
          {
            id: "l3-ejemplo",
            title: "Un antes y después real",
            minutes: 5,
            content:
              "**Prompt malo:** \"Escríbeme un email para pedir un aumento\".\n\nResultado: un texto genérico y plano.\n\n**Prompt con CRAFT:**\n\n> Contexto: llevo 3 años como diseñadora en una empresa de 40 personas, mi última evaluación fue excelente y no me han subido el sueldo en 2 años.\n> Rol: actúa como coach profesional experto en negociación salarial.\n> Acción: redacta un email para mi jefa pidiendo una reunión para hablar de mi salario.\n> Formato: máximo 150 palabras, tono profesional pero cercano, sin sonar exigente.\n> Target: quiero que ella sienta curiosidad y me diga que sí a la reunión.\n\nLa diferencia entre uno y otro es abismal. Y solo cuesta 60 segundos más.",
          },
          {
            id: "l4-iteracion",
            title: "Iterar es parte del proceso",
            minutes: 4,
            content:
              "Un prompt perfecto a la primera es raro. Lo normal es iterar:\n\n1. Lanzas tu prompt con CRAFT.\n2. Miras qué falla: ¿tono? ¿longitud? ¿estructura?\n3. Le pides ajustes concretos: \"más corto\", \"cambia el tono a más casual\", \"añade un ejemplo con datos\".\n\nHablarle a la IA como a un colaborador nuevo (con paciencia y feedback claro) es la habilidad que separa a quien usa IA de quien la aprovecha de verdad.",
          },
        ],
        quiz: [
          {
            q: "¿Qué significa la R en CRAFT?",
            options: ["Resultado", "Rol", "Reglas", "Rango"],
            answer: 1,
          },
          {
            q: "¿Cuál es el mayor problema del prompt \"escríbeme un email para pedir un aumento\"?",
            options: [
              "Es demasiado largo",
              "Le falta contexto, formato y objetivo",
              "Usa mayúsculas mal",
              "La IA no entiende la palabra aumento",
            ],
            answer: 1,
          },
          {
            q: "Si el resultado de un prompt no te gusta, ¿qué es lo más probable?",
            options: [
              "La IA está rota",
              "Necesitas cambiar de modelo obligatoriamente",
              "El prompt es mejorable",
              "Has usado demasiados tokens",
            ],
            answer: 2,
          },
          {
            q: "¿Qué representa la T en CRAFT?",
            options: [
              "Tiempo",
              "Tema",
              "Target (objetivo y tono deseado)",
              "Texto plano",
            ],
            answer: 2,
          },
        ],
      },
      {
        id: "m3-ecosistema",
        title: "Módulo 3 · El ecosistema: ChatGPT, Claude, Gemini, DeepSeek, Copilot",
        intro:
          "No hay una IA mejor que otra: hay una que encaja mejor con tu tarea. Este es el mapa práctico.",
        lessons: [
          {
            id: "l1-chatgpt",
            title: "ChatGPT (OpenAI)",
            minutes: 4,
            content:
              "El más popular. Muy equilibrado, con memoria persistente, navegación web, generación de imágenes, análisis de archivos y creación de \"GPTs\" personalizados.\n\n**Ideal para:** uso general, brainstorming, escritura, trabajar con documentos y automatizaciones vía API.\n**Puntos débiles:** puede ser demasiado \"complaciente\" y sonar genérico si no le exiges precisión.",
          },
          {
            id: "l2-claude",
            title: "Claude (Anthropic)",
            minutes: 4,
            content:
              "Enfocado en razonamiento largo y escritura de alta calidad. Su ventana de contexto es enorme, así que traga documentos larguísimos sin despeinarse.\n\n**Ideal para:** análisis de textos largos, redacción cuidada, código y tareas donde importa el matiz.\n**Puntos débiles:** más conservador con temas sensibles, disponibilidad geográfica limitada en algunos países.",
          },
          {
            id: "l3-gemini",
            title: "Gemini (Google)",
            minutes: 4,
            content:
              "Integrado con el ecosistema Google (Drive, Gmail, Docs, YouTube). Buenísimo con multimedia: entiende imágenes, audio y vídeo de serie.\n\n**Ideal para:** quien vive en Google Workspace, análisis multimodal y búsquedas actualizadas.\n**Puntos débiles:** su calidad varía según versión (Flash, Pro) y a veces es menos preciso en texto puro.",
          },
          {
            id: "l4-deepseek",
            title: "DeepSeek",
            minutes: 3,
            content:
              "Modelo open source de origen chino que ha sorprendido por ofrecer una calidad muy alta a coste bajísimo. Muy bueno en razonamiento matemático y programación.\n\n**Ideal para:** desarrolladores, tareas técnicas, entornos donde el coste importa.\n**Puntos débiles:** consideraciones de privacidad y contexto geopolítico según qué datos le des.",
          },
          {
            id: "l5-copilot",
            title: "Microsoft Copilot",
            minutes: 4,
            content:
              "La capa de IA de Microsoft. Vive dentro de Windows, Edge, Office (Word, Excel, PowerPoint, Outlook, Teams) y GitHub.\n\n**Ideal para:** productividad profesional, empresas Microsoft 365, programadores en GitHub Copilot.\n**Puntos débiles:** su calidad depende del modelo subyacente que use en cada momento y del contexto que le da tu empresa.",
          },
          {
            id: "l6-elegir",
            title: "Cómo elegir sin volverte loco",
            minutes: 4,
            content:
              "Regla práctica:\n- **Documentos largos y matiz:** Claude.\n- **Uso general y comunidad:** ChatGPT.\n- **Multimedia y ecosistema Google:** Gemini.\n- **Coste bajo y tareas técnicas:** DeepSeek.\n- **Ya trabajas con Microsoft:** Copilot.\n\nLo mejor: prueba la misma tarea en dos modelos distintos. En 10 minutos sabes cuál se adapta mejor a tu estilo.",
          },
        ],
        quiz: [
          {
            q: "¿Qué modelo destaca por su enorme ventana de contexto y calidad en textos largos?",
            options: ["Copilot", "Claude", "DeepSeek", "Gemini Flash"],
            answer: 1,
          },
          {
            q: "¿Qué modelo se integra de forma nativa con Word, Excel y Teams?",
            options: ["ChatGPT", "Gemini", "Copilot", "DeepSeek"],
            answer: 2,
          },
          {
            q: "¿Cuál es una fortaleza clara de Gemini?",
            options: [
              "Ser el más barato del mercado",
              "Su integración con Google Workspace y capacidades multimedia",
              "No tener límite de tokens",
              "Ser open source",
            ],
            answer: 1,
          },
          {
            q: "¿Por qué DeepSeek ha ganado tracción?",
            options: [
              "Es el más antiguo",
              "Ofrece calidad alta a coste muy bajo y buen rendimiento técnico",
              "Solo funciona en Windows",
              "Es exclusivo de empresas",
            ],
            answer: 1,
          },
        ],
      },
      {
        id: "m4-automatizacion",
        title: "Módulo 4 · Automatizar procesos con IA: cuándo sí y cuándo no",
        intro:
          "La IA puede ahorrarte horas… o meterte en un lío. Estos criterios te dicen cuándo merece la pena automatizar.",
        lessons: [
          {
            id: "l1-que-es-auto",
            title: "¿Qué significa \"automatizar un proceso\" con IA?",
            minutes: 5,
            content:
              "Automatizar es diseñar un flujo donde una tarea repetitiva se ejecuta sin tu intervención directa. Cuando metes IA en la ecuación, no solo se ejecutan pasos: también se toman pequeñas decisiones (clasificar, resumir, generar respuesta).\n\nEjemplos reales:\n- Un email de cliente llega → la IA lo clasifica → responde borrador o lo escala a soporte.\n- Se sube una factura al Drive → la IA extrae datos → los mete en una hoja de cálculo.\n- Alguien reserva en tu web → la IA genera un mensaje de bienvenida personalizado.\n\nHerramientas típicas: Zapier, Make, n8n, Power Automate, Apps Script, funciones en el navegador.",
          },
          {
            id: "l2-cuando-si",
            title: "Cuándo SÍ automatizar con IA",
            minutes: 5,
            content:
              "Es buena idea cuando se cumplen varias de estas:\n\n- La tarea es **repetitiva** y la haces (o alguien la hace) muchas veces al mes.\n- Hay **variabilidad ligera** en la entrada (por eso necesitas IA y no un simple if/else).\n- Puedes **medir el resultado** y detectar cuando falla.\n- Un error no es catastrófico o es fácil de revertir.\n- El tiempo ahorrado justifica montar el flujo.\n\nUn buen indicador: si cuando terminas la tarea piensas \"esto podría hacerlo un becario con instrucciones claras\", probablemente lo pueda hacer una IA con un buen prompt.",
          },
          {
            id: "l3-cuando-no",
            title: "Cuándo NO automatizar con IA",
            minutes: 6,
            content:
              "Malas ideas frecuentes:\n\n- **Decisiones legales, médicas o financieras** sin supervisión humana.\n- **Comunicaciones sensibles** con clientes cabreados o momentos delicados.\n- Procesos que **cambian cada semana**: pasarás más tiempo manteniendo el flujo que ahorrando trabajo.\n- **Datos personales o confidenciales** en modelos públicos sin cumplir RGPD.\n- Tareas donde **una alucinación** es inaceptable (por ejemplo, generar cifras oficiales).\n\nRegla de oro: **automatiza con IA lo aburrido, no lo crítico.** Y cuando dudes, pon un humano en medio del flujo.",
          },
          {
            id: "l4-empezar",
            title: "Cómo empezar sin romper nada",
            minutes: 4,
            content:
              "1. Elige **una** tarea pequeña que haces cada semana.\n2. Documéntala paso a paso como si se la explicaras a alguien nuevo.\n3. Construye el flujo con IA en modo \"borrador\": la IA prepara, tú apruebas antes de enviar.\n4. Mide durante 2-4 semanas: tiempo ahorrado, errores, calidad.\n5. Cuando funcione, quita el paso humano solo si el riesgo es bajo.\n\nAsí te ahorras tiempo de verdad sin pillarte los dedos.",
          },
        ],
        quiz: [
          {
            q: "¿Cuál es un buen candidato para automatizar con IA?",
            options: [
              "Firmar un contrato importante",
              "Clasificar y responder en borrador emails de soporte repetitivos",
              "Diagnosticar un problema médico",
              "Cambiar la estrategia de la empresa",
            ],
            answer: 1,
          },
          {
            q: "¿Cuál es la regla de oro para automatizar con IA?",
            options: [
              "Automatiza todo lo que puedas cuanto antes",
              "Automatiza lo aburrido, no lo crítico",
              "Solo automatiza si sabes programar",
              "Nunca automatices nada",
            ],
            answer: 1,
          },
          {
            q: "Si el proceso cambia cada semana, ¿qué conviene?",
            options: [
              "Automatizarlo igual",
              "No automatizar hasta que se estabilice",
              "Automatizar solo la parte final",
              "Cambiar de modelo de IA",
            ],
            answer: 1,
          },
          {
            q: "¿Qué es una buena forma de empezar a automatizar?",
            options: [
              "Cambiar todos los procesos de golpe",
              "Escoger una tarea pequeña y meter a la IA como borrador con validación humana",
              "Delegar todo a la IA sin revisar",
              "Comprar la herramienta más cara",
            ],
            answer: 1,
          },
        ],
      },
    ],
    finalExam: [
      {
        q: "¿Qué es un token en IA?",
        options: [
          "Una moneda virtual",
          "Un trozo de texto, la unidad que procesa y factura el modelo",
          "El nombre de la sesión",
          "Un fichero de configuración",
        ],
        answer: 1,
      },
      {
        q: "¿Qué son las alucinaciones?",
        options: [
          "Un modo creativo del modelo",
          "Cuando la IA inventa información con aparente seguridad",
          "Errores de red",
          "Un tipo de prompt",
        ],
        answer: 1,
      },
      {
        q: "En CRAFT, ¿qué representa la A?",
        options: ["Audiencia", "Acción", "Adjunto", "Ajuste"],
        answer: 1,
      },
      {
        q: "¿Cuál es la diferencia entre sesión y memoria?",
        options: [
          "Ninguna, son lo mismo",
          "La sesión es la conversación abierta; la memoria persiste entre sesiones si el modelo la soporta",
          "La memoria solo dura 5 minutos",
          "La sesión es de pago y la memoria es gratis",
        ],
        answer: 1,
      },
      {
        q: "¿Qué modelo destaca por integrarse con Word, Excel, Teams y GitHub?",
        options: ["Claude", "Gemini", "Copilot", "DeepSeek"],
        answer: 2,
      },
      {
        q: "¿Qué modelo suele elegirse para trabajar con documentos MUY largos?",
        options: ["Copilot", "Claude", "ChatGPT-3.5", "DeepSeek Coder"],
        answer: 1,
      },
      {
        q: "¿Cuándo NO es buena idea automatizar con IA?",
        options: [
          "En tareas repetitivas con impacto bajo",
          "En decisiones legales o médicas sin supervisión humana",
          "Cuando quieres ahorrar tiempo",
          "En clasificar emails de soporte",
        ],
        answer: 1,
      },
      {
        q: "¿Qué es el contexto?",
        options: [
          "Lo que la IA ve en este mismo momento: tu prompt, la conversación y adjuntos",
          "La velocidad de la respuesta",
          "El coste por mes",
          "Un tipo de modelo",
        ],
        answer: 0,
      },
      {
        q: "¿Cuál es la mejor forma de mejorar un mal resultado?",
        options: [
          "Cambiar de idioma",
          "Iterar el prompt con feedback concreto (formato, tono, longitud, ejemplos)",
          "Escribir todo en mayúsculas",
          "Pedirle que \"piense mejor\"",
        ],
        answer: 1,
      },
      {
        q: "¿Qué es la memoria vía RAG?",
        options: [
          "Un tipo de RAM del ordenador",
          "Un sistema que consulta una base de conocimiento externa y la mete en el contexto cuando hace falta",
          "El modo offline de la IA",
          "Una función solo de ChatGPT",
        ],
        answer: 1,
      },
    ],
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
