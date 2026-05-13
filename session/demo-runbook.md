# Demo runbook

## Preparación

1. Tener VS Code abierto en la carpeta `demo`.
2. Ejecutar `npm install` previamente si no hay conexión estable.
3. Lanzar `npm run dev`.
4. Tener abierta la presentación en modo ponente.

## Demo principal

1. Mostrar dashboard inicial: KPIs, C4S activos, deadlines y pipeline.
2. Filtrar por comunidad Microsoft / GitHub.
3. Buscar por ciudad, tecnología o formato.
4. Abrir una oportunidad y asociarla a una propuesta.
5. Mover una candidatura de `Draft` a `Submitted`.
6. Mostrar cómo el deadline cambia la prioridad.

## Momento Copilot

Pedir a Copilot:

```text
Añade una función que marque como "riesgo alto" cualquier C4S cuyo deadline sea menor o igual a 7 días y que no tenga propuesta asociada.
```

Después enseñar dónde encaja el cambio: `src/main.js`.

## Plan B sin GitHub Spark

Usar `.prompts/spark-prompt.md` como artefacto mostrado y ejecutar directamente la app local.
