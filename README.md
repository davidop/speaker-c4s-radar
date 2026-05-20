# Speaker C4S Radar

[![Deploy demo to GitHub Pages](https://github.com/davidop/speaker-c4s-radar/actions/workflows/pages.yml/badge.svg)](https://github.com/davidop/speaker-c4s-radar/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Made with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![GitHub Copilot](https://img.shields.io/badge/Built%20with-GitHub%20Copilot-000?logo=github&logoColor=white)](https://github.com/features/copilot)

> Un radar visual para que speakers, MVPs y comunidades técnicas no pierdan oportunidades de Call for Speakers entre mensajes, posts y deadlines imposibles.

Repositorio de referencia para la sesión técnica **"Call for Speakers Z: entrena, aplica y conquista el escenario"** — 45 minutos de demo en vivo con GitHub Spark, GitHub Copilot y VS Code.

Este proyecto nace como una demo práctica para enseñar cómo GitHub Spark, GitHub Copilot y Visual Studio Code pueden ayudarnos a convertir una necesidad real de comunidad en una app útil, visual y fácil de adaptar.

---

## ¿Para qué sirve?

Los C4S aparecen y desaparecen. Este radar pasa de reaccionar tarde a operar con un sistema sencillo:

| Fase | Qué hace la app |
|---|---|
| 🔍 **Detectar** | Lista Call for Speakers activos con urgencia visual por deadline |
| ⏱️ **Priorizar** | Semáforo de riesgo: crítico / próximo / controlado |
| 📝 **Preparar** | Asocia propuestas de charla a cada oportunidad |
| 📬 **Seguir** | Pipeline kanban de candidaturas: Idea → Submitted → Accepted |

---

## Demo en vivo

![Speaker C4S Radar — dashboard](https://raw.githubusercontent.com/davidop/speaker-c4s-radar/main/docs/screenshot.png)

> Puedes ver la versión desplegada en GitHub Pages cuando esté activada desde Settings → Pages → GitHub Actions.

---

## Ejecutar en local

```bash
git clone https://github.com/davidop/speaker-c4s-radar.git
cd speaker-c4s-radar/demo
npm install
npm run dev
```

Abre la URL que muestre Vite (normalmente `http://localhost:5173`).

---

## Estructura del repositorio

```text
demo/                           App web (Vite + Vanilla JS)
  src/
    main.js                     Lógica principal de la app
    styles.css                  Estilos
    data/calls.json             Dataset de C4S de ejemplo
slides/                         Presentación de la sesión
session/                        Guion, agenda y runbook de demo
.github/
  workflows/pages.yml           CI/CD → GitHub Pages
  copilot-instructions.md       Contexto para GitHub Copilot
```

---

## Stack

| Herramienta | Rol en la sesión |
|---|---|
| **GitHub Spark** | Prototipar la app desde un prompt |
| **GitHub Copilot** | Evolucionar features en VS Code |
| **Vite** | Build y dev server del frontend |
| **GitHub Actions** | Despliegue automático a Pages |
| **Vanilla JS** | Sin frameworks: código legible en directo |

---

## Adapta este radar a tu stack

Puedes personalizar `demo/src/data/calls.json` con tus propias oportunidades y usar este repo como base de tu propio radar. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para saber cómo.

---

## Publicar tu fork en GitHub Pages

```bash
gh repo create speaker-c4s-radar --public --source=. --remote=origin --push
```

Activa **Pages** en `Settings → Pages → Source: GitHub Actions` y el workflow se encargará del resto.

---

## Contribuir

¿Tienes una mejora, un bug o quieres añadir una oportunidad C4S al dataset de ejemplo?  
Lee [CONTRIBUTING.md](CONTRIBUTING.md) y abre un issue o un pull request.

---

## Licencia

[MIT](LICENSE) · Hecho con GitHub Copilot para la comunidad técnica hispana.
