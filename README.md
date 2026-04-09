# Ligrow Tasks

Ligrow Tasks es una aplicación web interna para la gestión integral de clientes, tareas operativas y planificación mensual.

El objetivo es disponer de un dashboard visual, claro y potente que permita al equipo gestionar el trabajo diario, detectar prioridades, organizar tareas recurrentes y mantener una visión global del estado de cada cliente.

La aplicación incluye:

- gestión completa de clientes
- gestión completa de tareas
- planificación mensual recurrente
- dashboard operativo
- vista tabla
- vista kanban
- vista gantt
- comentarios internos
- adjuntos
- recordatorios automáticos
- asistente IA integrado
- arquitectura preparada para crecimiento

---

# Stack tecnológico

La aplicación se construye sobre un stack moderno y profesional:

- Node.js
- Next.js
- MySQL
- Prisma ORM
- Autenticación con email/password
- Opción de login con Google (restringido)
- API de Anthropic para asistente IA

---

# Estructura general del proyecto

El proyecto sigue una arquitectura full-stack basada en Next.js.

Ejemplo orientativo:

/app
/components
/lib
/prisma
/public
/styles
/services
/modules
  /auth
  /clients
  /tasks
  /comments
  /attachments
  /templates
  /months
  /ai
  /notifications

---

# Funcionalidades principales

## Clientes

- alta
- edición
- eliminación con confirmación
- ficha completa
- resumen ejecutivo
- enlaces clave
- notas internas

## Tareas

- crear
- editar
- eliminar
- cambiar estado
- cambiar prioridad
- asignar responsable
- comentarios
- adjuntos

## Dashboard

- tareas urgentes
- tareas activas
- tareas completadas
- tareas vencidas
- tareas próximas a vencer
- carga por persona
- carga por cliente

## Vistas

- general
- lista
- kanban
- gantt
- resumen ejecutivo

## Planificación mensual

- plantillas por cliente
- generación automática de meses
- generación manual de meses
- cierre de mes
- reapertura de mes

## IA integrada

- lectura del contexto del dashboard
- creación de tareas
- edición de tareas
- eliminación con confirmación
- creación de clientes
- resúmenes operativos
- sugerencias de planificación

## Recordatorios

- tareas que vencen en 24 horas
- tareas que vencen en 72 horas
- tareas que vencen esta semana
- tareas vencidas

---

# Variables de entorno

Ejemplo:

DATABASE_URL=

ANTHROPIC_API_KEY=

AUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=

NEXT_PUBLIC_APP_URL=

---

# Setup local

Instalar dependencias:

npm install

Configurar variables de entorno:

cp .env.example .env

Ejecutar migraciones:

npx prisma migrate dev

Ejecutar servidor:

npm run dev

---

# Despliegue

El proyecto está preparado para desplegarse en un entorno Node.js profesional desde GitHub.

Pasos generales:

1. conectar repositorio
2. configurar variables de entorno
3. configurar base de datos MySQL
4. ejecutar migraciones
5. iniciar aplicación

---

# Estado del proyecto

Este proyecto está siendo reconstruido desde una versión inicial basada en:

- Google Apps Script
- HTML manual
- Google Sheets como base de datos

El objetivo es convertirlo en una aplicación robusta y escalable.

---

# Principios clave

- persistencia real de datos
- claridad visual
- rapidez operativa
- facilidad de uso diaria
- arquitectura mantenible
- integración IA útil
- base preparada para crecimiento
