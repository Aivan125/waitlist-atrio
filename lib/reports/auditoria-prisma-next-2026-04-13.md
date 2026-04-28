# Informe de verificación: Prisma7 y Next.js

**Fecha:** 2026-04-13  
**Alcance:** Revisión de la configuración actual del repositorio frente a la documentación consultada vía **Context7** (Prisma: `/websites/prisma_io`; Next.js: `/vercel/next.js/v16.2.2`).  
**Nota:** Este documento es solo diagnóstico; **no implica cambios** en el código ni en archivos de configuración.

---

## 1. Resumen ejecutivo

La combinación **Next.js 16.2.x (App Router)** + **Prisma ORM 7.7.x** con **adaptador `@prisma/adapter-pg`** y cliente generado en `src/generated/prisma` es **coherente** con las guías actuales de Prisma 7. La separación entre URL usada por el **CLI de migraciones** (`prisma.config.ts`) y la **cadena de conexión en tiempo de ejecución** (`DATABASE_URL` en el adaptador dentro de `getPrisma()`) es un patrón **alineado** con las recomendaciones para despliegues tipo Vercel / pooler vs conexión directa.

No se ha inspeccionado el contenido de archivos `.env` (riesgo de secretos); la evaluación asume que las variables existen donde corresponde para desarrollo y producción.

---

## 2. Prisma 7

### 2.1 Hallazgos alineados con Context7


| Aspecto                                     | Estado en el repo                                                                                                | Referencia documental (Context7)                                                                                                                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `schema.prisma`: `datasource` **sin** `url` | `provider = "postgresql"` únicamente                                                                             | Documentación Prisma 7 / prompts Next.js: la URL del datasource para el flujo moderno no va en el bloque `datasource` del schema; va en `prisma.config.ts` (y la conexión de runtime vía adaptador). |
| `prisma.config.ts` con `defineConfig`       | Presente: `schema`, `migrations.path`, `datasource.url`                                                          | Patrón esperado para migraciones / CLI.                                                                                                                                                              |
| Cliente generado + adaptador                | `generator` con `prisma-client` y `output` bajo `src/generated/prisma`; `PrismaPg` + `PrismaClient({ adapter })` | Prisma 7 **requiere** adaptador para PostgreSQL; el ejemplo oficial usa `new PrismaPg({ connectionString: process.env.DATABASE_URL })`.                                                              |
| Import del cliente                          | Uso de `@/generated/prisma/client`                                                                               | Coherente con `output` relativo al directorio `prisma/` apuntando a `src/generated/prisma` (el entrypoint documentado es el cliente generado en esa ruta).                                           |


### 2.2 Comportamiento destacado (migraciones vs runtime)

- `**prisma.config.ts`** resuelve `datasource.url` como `DIRECT_URL ?? DATABASE_URL`, con carga previa de `.env` y `.env.local` mediante `dotenv`.
- `**getPrisma()**` usa exclusivamente `process.env.DATABASE_URL` para el adaptador `PrismaPg`.

Esto coincide con la **idea** recogida en Context7 de usar una cadena **adecuada para el CLI** (a menudo conexión directa / no pooler) en la configuración de Prisma para herramientas, mientras el runtime puede usar otra URL (p. ej. pooler en serverless). La documentación citada en Context7 menciona explícitamente URLs “non-pooled” para el CLI en escenarios de despliegue.

### 2.3 Puntos de atención (sin calificar como errores)

1. **Versión exacta:** el proyecto declara `^7.7.0`; la documentación indexada en Context7 lista ramas como7.6.x. Suele ser compatible; conviene revisar notas de versión al actualizar patch/minor.
2. **Pool / instancias serverless:** el singleton en `globalThis` mitiga conexiones múltiples en desarrollo y reutilización en el mismo proceso; en entornos con muchas instancias frías, el límite de conexiones de Postgres sigue siendo un tema operativo (fuera del alcance de este informe).
3. `**postinstall: prisma generate`:** adecuado para CI y plataformas que ejecutan `npm install` antes del build; requiere que el entorno de build pueda ejecutar el CLI sin credenciales reales si solo se genera el cliente (normalmente sí).

---

## 3. Next.js 16 (App Router)

### 3.1 Hallazgos alineados con Context7


| Aspecto                          | Estado en el repo                                                                                  | Referencia documental (Context7)                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Versión                          | `next@16.2.3`                                                                                      | Context7 consultado sobre la rama **v16.2.2**; diferencia de patch menor, patrones aplicables.        |
| Variables de entorno en servidor | Server Actions y código servidor pueden usar `process.env.DATABASE_URL` sin prefijo `NEXT_PUBLIC_` | Guía de variables de entorno: variables privadas en Route Handlers / servidor; no exponer al cliente. |
| Scripts                          | `dev` con `--turbopack`, `build` / `start` estándar                                                | Coherente con el stack actual de Next 16.                                                             |
| `next.config.ts`                 | Configuración mínima (objeto vacío de opciones)                                                    | Válido para un proyecto sin rewrites/headers personalizados aún.                                      |


### 3.2 Puntos de atención

1. **Build vs runtime:** las variables **no** `NEXT_PUBLIC_` se inyectan en el servidor en tiempo de build de forma que Next pueda analizar el grafo; para valores que deben cambiar **solo en runtime** sin rebuild, la documentación de Next16 (Context7) menciona patrones con APIs como `connection()` y render dinámico. El uso actual de Prisma en Server Actions suele evaluar `DATABASE_URL` en el momento de la invocación; si en el futuro se moviera inicialización al borde del build, habría que contrastar con esa guía.
2. **Turbopack en desarrollo:** es el valor por defecto recomendado en la línea actual de Next; no hay conflicto obvio con Prisma en servidor.

---

## 4. Integración Prisma + Next.js en este repo

- Las mutaciones pasan por **Server Actions** (`"use server"`), encaje natural con Prisma en el runtime de Node y sin exponer el cliente al navegador.
- El cliente Prisma se obtiene mediante `**getPrisma()`**, evitando crear instancias en cada import si ya existe en `globalThis`.
- **TypeScript:** alias `@/`* → `./src/*` incluye `src/generated/prisma` bajo `src/`; coherente con imports `@/generated/prisma/client`.

---

## 5. Conclusión

**Situación global:** la configuración revisada es **consistente** con Prisma ORM 7 (schema sin `url` en datasource, `prisma.config.ts`, cliente generado, `PrismaClient` con `@prisma/adapter-pg`) y con Next.js 16 App Router (variables servidor, acciones de servidor, scripts modernos).

**No se detectaron desviaciones graves** respecto a los fragmentos oficiales recuperados por Context7 para los temas consultados. Los únicos matices son **operativos y de versión** (pooler vs directo ya contemplado en el proyecto, límites de conexión en serverless, y posibles evoluciones si se exige más comportamiento “runtime-only” para env).

---

## 6. Metodología

- **Context7:** `resolve-library-id` + `query-docs` (2 consultas: Prisma en prisma.io docs; Next.js v16.2.2).
- **Repositorio:** lectura de `package.json`, `prisma/schema.prisma`, `prisma.config.ts`, `next.config.ts`, `tsconfig.json`, `src/lib/prisma.ts`, fragmento de `src/app/layout.tsx`.
- **No modificado:** ningún archivo del proyecto como parte de esta auditoría.

