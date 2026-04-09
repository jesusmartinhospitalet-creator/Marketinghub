# Ligrow Tasks — Project Brief

Este documento define el objetivo funcional, la visión de producto y las reglas de reconstrucción de la aplicación.

Este documento es especialmente importante para el agente de IA que trabaja sobre el repositorio.

---

# Objetivo del producto

Ligrow Tasks es un gestor interno de tareas completamente operativo diseñado para un equipo de marketing y gestión web.

La aplicación debe permitir:

- gestionar clientes de forma integral
- gestionar tareas diarias
- gestionar tareas recurrentes mensuales
- visualizar prioridades
- detectar urgencias
- planificar trabajo del equipo
- mantener comentarios internos
- adjuntar archivos
- generar recordatorios automáticos
- obtener una visión clara del estado del trabajo
- utilizar un asistente IA para automatizar operaciones

El sistema debe facilitar el trabajo diario y mejorar la organización interna.

---

# Contexto inicial

El proyecto parte de una versión existente desarrollada con:

- Google Apps Script (.gs)
- HTML manual
- Google Sheets como base de datos
- lógica de clientes
- lógica de tareas
- lógica de plantillas mensuales
- generación mensual de tareas
- asistente IA básico conectado a Anthropic

La nueva versión NO debe depender de Google Sheets como base principal.

La lógica útil existente debe conservarse y mejorarse.

---

# Usuarios

Usuarios internos del equipo.

Inicialmente:

3 personas

Requisitos:

- acceso mediante email y contraseña
- opción de login con Google
- solo usuarios autorizados pueden acceder
- nadie externo puede entrar
- todos los usuarios tienen permisos completos por ahora

La arquitectura debe permitir roles futuros.

---

# Objetivos principales de la app

## visión general

la app debe permitir entrar y ver:

- situación general del trabajo
- tareas urgentes
- tareas próximas a vencer
- estado de cada cliente
- carga de trabajo del equipo

flujo ideal de uso diario:

1 entrar en el dashboard  
2 revisar urgencias  
3 revisar tareas activas  
4 revisar estado de clientes  
5 crear o ajustar tareas  
6 generar planificación mensual si procede  
7 consultar gantt o kanban  
8 usar asistente IA para acelerar operaciones  

---

# Módulos principales

## dashboard general

visión global del estado del trabajo

indicadores:

- tareas urgentes
- tareas activas
- tareas completadas
- tareas vencidas
- tareas que vencen en 24 horas
- tareas que vencen en 72 horas
- tareas que vencen esta semana
- carga por persona
- carga por cliente

---

## clientes

cada cliente debe tener:

- nombre
- código interno
- concepto
- resumen
- fecha de inicio
- enlaces clave
- notas internas
- tareas asociadas
- tareas mensuales habituales
- tareas puntuales habituales

la ficha de cliente debe ser clara y visual

---

## tareas

las tareas son el núcleo operativo

propiedades:

- nombre
- descripción
- responsable
- estado
- prioridad
- fechas
- comentarios
- adjuntos

tipos de tareas:

- puntuales
- mensuales recurrentes

acciones:

- crear
- editar
- eliminar con confirmación
- cambiar estado
- cambiar prioridad
- asignar responsable
- añadir comentarios
- añadir archivos

---

## vistas

la app debe incluir:

- vista general
- lista de tareas
- kanban por estado
- gantt
- resumen ejecutivo

el gantt debe permitir detectar fácilmente:

- tareas vencidas
- tareas urgentes
- tareas completadas
- planificación temporal

---

## planificación mensual

la app debe permitir crear plantillas mensuales por cliente

cada plantilla debe incluir:

- nombre de tarea
- responsable por defecto
- prioridad por defecto
- estado por defecto
- día de vencimiento dentro del mes
- descripción base

la app debe permitir:

- generar automáticamente el siguiente mes
- generar un mes específico
- evitar duplicados
- cerrar un mes
- reabrir un mes
- visualizar histórico de meses

las tareas generadas deben poder editarse independientemente

---

## comentarios internos

cada tarea debe permitir:

- comentarios
- historial
- autor
- fecha

estilo tipo monday.com

---

## adjuntos

las tareas deben permitir:

- subir archivos
- visualizar archivos
- descargar archivos

formatos comunes:

- pdf
- imagen
- documento
- otros formatos habituales

---

## asistente IA

la app debe incluir un asistente IA integrado

la IA debe leer el contexto real del dashboard

debe poder:

- crear clientes
- editar clientes
- eliminar clientes con confirmación
- crear tareas
- editar tareas
- eliminar tareas con confirmación
- resumir estado general
- detectar urgencias
- proponer planificación mensual

flujo obligatorio:

1 interpretar instrucción  
2 explicar qué entiende  
3 explicar qué va a hacer  
4 pedir confirmación si la acción es sensible  
5 ejecutar  
6 registrar acción  

acciones sensibles:

- eliminar cliente
- eliminar tarea
- cambios masivos

---

## recordatorios automáticos

la app debe enviar recordatorios automáticos:

- tareas que vencen en 24 horas
- tareas que vencen en 72 horas
- tareas que vencen esta semana
- tareas vencidas

canal principal:

email

arquitectura preparada para:

- google calendar
- gmail
- whatsapp

---

# criterios de diseño

mantener esencia visual del html actual:

- estilo profesional
- interfaz clara
- jerarquía visual clara
- navegación lateral por cliente
- uso cómodo diario
- enfoque escritorio

no simplificar el diseño en exceso

---

# criterios técnicos

la nueva app debe:

- guardar datos correctamente
- actualizar datos correctamente
- ser consistente
- ser mantenible
- tener estructura clara
- evitar dependencias innecesarias
- permitir crecimiento

---

# reglas para el agente

no inventar un producto distinto

usar el html y el .gs como referencia funcional

cuando algo del código actual sea débil técnicamente pero útil funcionalmente:

mantener la lógica  
mejorar la implementación  

trabajar por fases

no intentar terminar todo en una sola iteración

dejar siempre el proyecto funcional después de cada fase

documentar decisiones importantes

priorizar claridad y robustez

no eliminar funcionalidades útiles sin reemplazo equivalente

mantener coherencia en naming y estructura

---

# resultado esperado

una aplicación interna robusta, visual, clara y útil que permita gestionar el trabajo del equipo de forma eficiente y escalable
