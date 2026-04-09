# Ligrow Tasks

Plataforma interna de gestión de tareas y clientes de marketing.

## Stack

- **Next.js 14** – App Router + TypeScript
- **React 18**
- **Tailwind CSS 3**
- **Prisma ORM** – MySQL
- **Node.js** – compatible con Hostinger

---

## Estructura del proyecto

```
/app                    → Páginas y layouts (Next.js App Router)
/components             → Componentes compartidos (UI genérica)
/lib                    → Utilidades, cliente Prisma, helpers de auth y API
/services               → Integraciones externas (Anthropic, email, storage)
/modules
  /auth                 → Autenticación y sesiones
  /clients              → Gestión de clientes
  /tasks                → Gestión de tareas
  /comments             → Comentarios internos por tarea
  /templates            → Plantillas de tareas recurrentes
  /months               → Planificación mensual
  /ai                   → Asistente IA (Anthropic Claude)
  /notifications        → Alertas y recordatorios
/prisma                 → Schema y migraciones de base de datos
/public                 → Assets estáticos
```

---

## Setup local

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd Marketinghub
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
DATABASE_URL=mysql://user:password@localhost:3306/ligrow_tasks
ANTHROPIC_API_KEY=sk-ant-...
AUTH_SECRET=una-clave-secreta-larga-y-aleatoria
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Inicializar la base de datos

> Requiere MySQL corriendo y la base de datos creada.

```bash
# Cuando los modelos estén definidos:
npx prisma migrate dev --name init

# O push directo (sin historial de migraciones):
npm run db:push

# Generar el cliente Prisma:
npm run db:generate
```

### 4. Arrancar en desarrollo

```bash
npm run dev
```

La aplicación estará en [http://localhost:3000](http://localhost:3000).

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Iniciar en producción |
| `npm run lint` | Linting de código |
| `npm run db:generate` | Generar cliente Prisma |
| `npm run db:push` | Sincronizar schema con DB (sin migraciones) |
| `npm run db:migrate` | Ejecutar migraciones en desarrollo |
| `npm run db:studio` | Prisma Studio (GUI de base de datos) |

---

## Despliegue en Hostinger (Node.js)

1. Conectar el repositorio desde el panel de Hostinger
2. Configurar las variables de entorno en el panel
3. Asegurarse de que MySQL esté configurado y accesible
4. Ejecutar las migraciones:
   ```bash
   npx prisma migrate deploy
   ```
5. Build y arranque:
   ```bash
   npm run build
   npm start
   ```

> La aplicación escucha en el puerto definido por `PORT` (Hostinger lo inyecta automáticamente).

---

## Variables de entorno

| Variable | Descripción | Requerida |
|---|---|---|
| `DATABASE_URL` | Cadena de conexión MySQL | Sí |
| `AUTH_SECRET` | Secreto para firmar sesiones/JWT | Sí |
| `ANTHROPIC_API_KEY` | API key de Anthropic (Claude) | Para IA |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app | Sí |
| `GOOGLE_CLIENT_ID` | OAuth Google (opcional) | No |
| `GOOGLE_CLIENT_SECRET` | OAuth Google (opcional) | No |
| `EMAIL_SERVER_*` | Config SMTP para emails | Para notifs |

---

## Estado del proyecto

Este proyecto está siendo reconstruido desde una versión inicial basada en Google Apps Script + HTML manual + Google Sheets.

**Fase actual:** Base técnica — estructura, configuración y dependencias.

**Próximas fases:**
1. Schema de base de datos (modelos Prisma)
2. Autenticación (email/password)
3. Módulo de clientes
4. Módulo de tareas
5. Dashboard operativo
6. Vistas (lista, kanban, gantt)
7. Planificación mensual
8. Asistente IA
9. Notificaciones y recordatorios

---

## Principios del proyecto

- Persistencia real de datos
- Claridad visual y rapidez operativa
- Arquitectura modular y mantenible
- Integración IA útil (no decorativa)
- Base preparada para crecer
