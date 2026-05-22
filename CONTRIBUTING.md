# Guía de contribución

¡Gracias por tu interés en mejorar Speaker C4S Radar!  
Este repositorio está pensado para ser una referencia práctica para la comunidad técnica hispana.

---

## ¿Cómo puedo contribuir?

### 1. Añadir oportunidades C4S al dataset de ejemplo

El fichero `demo/src/data/calls.json` contiene los C4S de muestra que aparecen en el dashboard.  
Puedes abrir un **pull request** añadiendo eventos reales o representativos.

Formato de cada entrada:

```json
{
  "id": "cfs-XXX",
  "name": "Nombre del evento",
  "community": "GitHub | Microsoft | AWS | GDE | ...",
  "deadline": "YYYY-MM-DD",
  "city": "Ciudad o 'Online'",
  "format": "In person | Remote | Hybrid",
  "tags": ["tema1", "tema2"],
  "status": "Idea",
  "proposalId": null
}
```

### 2. Reportar un bug

Abre un [issue de tipo Bug](../../issues/new?template=bug_report.md) con:

- Descripción del comportamiento incorrecto
- Pasos para reproducirlo
- Comportamiento esperado

### 3. Proponer una mejora

Abre un [issue de tipo Feature](../../issues/new?template=feature_request.md) explicando:

- El problema que resuelve
- La solución que propones
- Si ya tienes código listo, enlaza el PR

### 4. Adaptar el repo a tu propio radar

Este repo está licenciado bajo MIT. Puedes hacer fork y usarlo como base:

```bash
gh repo fork YOUR_USER/speaker-c4s-radar --clone
cd speaker-c4s-radar/demo
npm install && npm run dev
```

Personaliza `calls.json` con tus propias oportunidades y el workflow de Pages se encarga del despliegue automático.

---

## Contribuciones no técnicas
También puedes contribuir aunque no escribas código:
- Proponiendo nuevos Call for Speakers para el dataset.
- Mejorando textos del README.
- Sugiriendo estados o flujos más realistas para speakers.
- Revisando accesibilidad y claridad visual.
- Compartiendo ideas para futuras demos.

Este proyecto quiere ser útil para la comunidad, así que las mejoras de contenido, claridad y experiencia también son bienvenidas.


## Proceso para pull requests

1. Haz fork del repo y crea una rama descriptiva (`feat/filtro-por-ciudad`, `fix/deadline-timezone`).
2. Haz tus cambios manteniendo el estilo del código existente (JS simple, sin frameworks adicionales).
3. Abre el PR contra `main` describiendo qué cambia y por qué.
4. Un mantenedor revisará y hará merge si encaja con los objetivos del proyecto.

---

## Criterios de aceptación

- El código debe ser legible en directo (sesión de 45 min). Evita abstracciones innecesarias.
- No se aceptan dependencias nuevas sin justificación clara.
- Los cambios de UI deben mantener el diseño existente o mejorarlo de forma coherente.

---

## Flujo mínimo de comunidad y triage

### Labels base

El repositorio mantiene un set versionado de labels en `.github/labels.yml`.

Labels clave para empezar:
- `good first issue`: tareas de onboarding.
- `help wanted`: abiertas a colaboración.
- `status:needs-triage`: pendiente de clasificar.
- `status:ready`: lista para implementar.
- `priority:high` / `priority:medium`: urgencia.

### Cadencia recomendada

- 1 vez por semana: revisar issues nuevos y asignar labels de estado/prioridad.
- 1 vez por semana: promover al menos 1 issue a `good first issue`.
- Cada PR mergeado: cerrar o actualizar el issue relacionado.

### Backlog inicial para onboarding

Consulta y mantiene propuestas en `.github/ISSUES_PROPOSALS.md`.

Objetivo: tener siempre al menos 3 issues listos para personas que contribuyen por primera vez.
