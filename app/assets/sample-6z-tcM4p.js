const n=`# Escribe en Markdown. Lee como se ve.

Inkline es un estudio de Markdown local-first: visor, editor con vista previa en
vivo y exportador, todo en una ventana.

> **Estás viendo el frontend real de la app en el navegador.** Escribe aquí
> mismo, cambia de modo y exporta el documento a HTML. Abrir y guardar archivos
> locales necesita la versión de escritorio.

## Tres modos, un documento

- **Lectura** — el Markdown renderizado, sin ruido.
- **Edición** — CodeMirror 6 con numeración, resaltado y barra de formato.
- **Dividido** — fuente y vista previa a la vez, con el divisor a tu medida.

## Atajos que ya funcionan aquí

| Acción | Atajo | Resultado |
| --- | --- | --- |
| Paleta de comandos | \`⌘K\` | Archivos y comandos en un solo campo |
| Nuevo documento | \`⌘N\` | Pestaña en blanco |
| Cambiar de tema | \`⌘,\` | Preferencias: claro, oscuro o sistema |
| Zoom de texto | \`⌘+\` / \`⌘−\` | Editor y visor escalan juntos |
| Exportar HTML | \`⌘E\` | Documento autónomo, sin dependencias |

## Diagramas con Mermaid

\`\`\`mermaid
flowchart LR
  A[archivo.md] --> B{Modo}
  B -->|Lectura| C[Vista renderizada]
  B -->|Edición| D[CodeMirror 6]
  B -->|Dividido| E[Fuente + vista]
  C --> F[HTML autónomo]
  E --> F
\`\`\`

## Código con resaltado de sintaxis

\`\`\`ts
type Documento = {
  path: string;
  contents: string;
  dirty: boolean;
};

/** Los archivos se escriben con write-then-rename. */
export async function guardar(doc: Documento): Promise<void> {
  const temporal = \`\${doc.path}.tmp\`;
  await escribir(temporal, doc.contents);
  await renombrar(temporal, doc.path);
}
\`\`\`

## Lista de tareas

- [x] Visor con GFM, tablas y listas de tareas
- [x] Editor con vista previa en vivo
- [x] Diagramas Mermaid
- [x] Exportación a HTML, Markdown y Office
- [ ] Sincronizar con la nube, porque tus archivos ya están en tu equipo

---

Todo lo que ves arriba está escrito en este mismo documento: **edítalo**. Si
algo se rompe, siempre puedes recargar la página y volver al ejemplo.
`;export{n as default};
