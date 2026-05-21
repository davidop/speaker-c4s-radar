# Copilot instructions for Speaker C4S Radar
This repository is a live-demo project for a technical community session.
## Product goal
Speaker C4S Radar helps speakers, MVPs, community leaders and technical contributors track Call for Speakers opportunities, deadlines, proposal status and next actions.
The app should feel useful, visual and friendly for community people, not like a corporate dashboard.
## Technical rules
- Keep the app simple and readable for a live demo.
- Use Vanilla JavaScript, HTML and CSS.
- Do not add frameworks unless explicitly requested.
- Prefer small, safe, incremental changes.
- Keep functions short and easy to explain on stage.
- Avoid overengineering.
- Preserve the existing Vite structure.
## UX and visual style
The style should be modern, polished and community-first.
Visual direction:
- Dark tech background.
- Soft gradients.
- Pink, purple, blue and mint accents.
- Rounded cards.
- Subtle glow effects.
- Clear visual hierarchy.
- Friendly but professional tone.
Avoid:
- Childish visuals.
- Excessive animations.
- Corporate cold dashboards.
- Hard-to-read contrast.
## Content tone
Use Spanish by default.
Tone:
- Clear.
- Warm.
- Practical.
- Community-oriented.
- Slightly playful when it helps the demo.
Preferred concepts:
- Radar
- Comunidad
- Speakers
- Propuestas
- Deadlines
- Siguiente acción
- Preparar, enviar, aprender
## Accessibility
- Keep good color contrast.
- Buttons must have clear labels.
- Important information should not rely only on color.
- Cards should be readable on mobile.
## Demo mindset
Every change should be easy to explain in a 45-minute session using GitHub Copilot and Visual Studio Code.

This change is important because it turns Copilot into “your copilot with judgement”, not only autocompletion.

<!-- GSD Configuration — managed by get-shit-done installer -->
# Instructions for GSD

- Use the get-shit-done skill when the user asks for GSD or uses a `gsd-*` command.
- Treat `/gsd-...` or `gsd-...` as command invocations and load the matching file from `.github/skills/gsd-*`.
- When a command says to spawn a subagent, prefer a matching custom agent from `.github/agents`.
- Do not apply GSD workflows unless the user explicitly asks for them.
- After completing any `gsd-*` command (or any deliverable it triggers: feature, bug fix, tests, docs, etc.), ALWAYS: (1) offer the user the next step by prompting via `ask_user`; repeat this feedback loop until the user explicitly indicates they are done.
<!-- /GSD Configuration -->
