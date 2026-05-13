# Call for Speakers Z: entrena, aplica y conquista el escenario

Repositorio base para una sesión práctica de 45 minutos: **PPT + demo** para construir un scouter de oportunidades C4S orientado a speakers de comunidades GitHub y Microsoft.

## Objetivo de la demo
Crear una app que permita:

- Detectar Call for Speakers activos.
- Controlar deadlines y priorizar por urgencia.
- Organizar propuestas de charla.
- Hacer seguimiento de candidaturas.

## Stack de la sesión

- GitHub Spark para idear y prototipar la app.
- GitHub Copilot para evolucionar funcionalidades.
- Visual Studio Code para aterrizar la demo como proyecto editable.

## Estructura

```text
slides/                         Presentación PowerPoint
session/                        Guion, agenda y checklist
.prompts/                       Prompts para Spark y Copilot
.github/copilot-instructions.md Instrucciones de contexto para Copilot
demo/                           Demo web local del C4S Scout
```

## Ejecutar la demo

```bash
cd demo
npm install
npm run dev
```

Abre la URL local que muestre Vite.

## Publicar en GitHub

```bash
gh repo create speaker-c4s-radar --public --source=. --remote=origin --push
```

## Historia de la sesión

> Los C4S aparecen y desaparecen. Esta demo enseña cómo pasar de reaccionar tarde a operar con un sistema sencillo: detectar, priorizar, preparar y seguir oportunidades.
