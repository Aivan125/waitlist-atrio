# Landing — lista de espera (brokers)

Next.js (App Router), Prisma ORM **7**, PostgreSQL (Supabase), shadcn/ui y validación con Zod.

- **Planeación del producto:** [lib/docs/PROJECT_PLAN.md](lib/docs/PROJECT_PLAN.md)

## Requisitos

- Node.js LTS
- Proyecto Supabase con Postgres (connection strings de pooling y directa)

## Configuración

1. Copia variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

2. Rellena `DATABASE_URL` (pooler, p. ej. puerto `6543`) y `DIRECT_URL` (conexión directa, puerto `5432`) desde el dashboard de Supabase.

3. Aplica migraciones (usa `DIRECT_URL` vía `prisma.config.ts`):

   ```bash
   npx prisma migrate deploy
   ```

   En desarrollo, también:

   ```bash
   npx prisma migrate dev
   ```

4. Instala dependencias y genera el cliente Prisma:

   ```bash
   npm install
   ```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Producción local

```bash
npm run build
npm start
```

## Prisma 7

- Configuración: [`prisma.config.ts`](prisma.config.ts) (URL para migraciones: `DIRECT_URL` o `DATABASE_URL`).
- Esquema: [`prisma/schema.prisma`](prisma/schema.prisma) (sin `url` en el datasource; [documentación](https://pris.ly/d/config-datasource)).
- Cliente generado en `src/generated/prisma` con adaptador [`@prisma/adapter-pg`](https://pris.ly/d/prisma7-client-config) en [`src/lib/prisma.ts`](src/lib/prisma.ts).

## Despliegue (Vercel)

Configura `DATABASE_URL` y `DIRECT_URL` en el panel del proyecto. Ejecuta `prisma migrate deploy` contra la base de producción según tu flujo.
