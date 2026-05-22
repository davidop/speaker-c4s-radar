# Phase 9 Context — Notificaciones de deadline PWA

## Goal
Alertar al usuario cuando haya deadlines críticos (<= 7 días) usando capacidades PWA del navegador.

## Constraint
No existe backend para Web Push (VAPID + subscription endpoint), por lo que la implementación será local-first para demo:
- Permiso de notificaciones
- Service Worker `showNotification(...)`
- Detección de deadlines críticos desde la app

## Requirements
- NOTIF-01: pedir permiso y permitir opt-in/opt-out de notificaciones.
- NOTIF-02: notificar deadlines críticos con nombre de evento y acción recomendada.
