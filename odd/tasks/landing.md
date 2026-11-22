# Landing bilingüe de Inkline con demo embebida

Landing estática ES/EN para Inkline (app) / inklineMD (proyecto), con la demo del
build de Vite dentro de un iframe y el modo demo web en el app para que la demo
tenga contenido real. Entregable dentro de `~/Workspace/ipepio/inlink-md-web`, separado del repo de la app.

## Specs

S1. Referencia y assets: «/Users/ipepio/Desktop/inklineMD-site/assets
/Users/ipepio/Desktop/inklineMD-site/index.html
/Users/ipepio/Desktop/inklineMD-site/README.md con esto tenemos que hadcer una
landing para /Users/ipepio/Workspace/ipepio/md_viewer».

S2. Demo: «la demo será un iframe del build».

S3. Idioma: «Bilingüe (ES + EN)». Ambas páginas llevan el mismo contenido,
conmutador visible y `<html lang>` correcto: `es` en `index.html`, `en` en
`en.html`.

S4. Marca: «Inkline como app / inklineMD como proyecto». El producto se llama
Inkline; inklineMD aparece como nombre del proyecto en cabecera/metadatos/footer,
nunca como nombre del producto en los CTAs.

S5. Ubicación: «Sitio nuevo fuera del repo», con el build copiado dentro:
`index.html`, `en.html`, `assets/`, `app/` (copia de `dist/`).

S6. Modo demo en el app («Modo demo en el app (recomendado)»): sin backend Tauri,
el build carga un documento de ejemplo y no muestra el error
«No se pudo cargar el espacio de trabajo: … invoke» en la barra de estado.

S7. Descargas honestas: no se inventan URLs. Cada formato publicado enlaza a su
instalador; lo no publicado se muestra como «Próximamente».

## Tasks

| ID | Spec | Ruta | Entrega |
| --- | --- | --- | --- |
| T1 | S1, S6 | app `src/App.tsx`, `src/lib/demo/`, `src/assets/demo/` | Modo demo web + documento de ejemplo + test |
| T2 | S1, S5 | `assets/` (marca, fuentes), `scripts/sync-demo.sh` | Scaffold y build copiado en `app/` |
| T3 | S3, S4 | `assets/site.css`, `assets/site.js` | Sistema visual y JS compartido |
| T4 | S1-S4, S7 | `index.html` | Landing ES |
| T5 | S3, S4 | `en.html` | Landing EN |
| T6 | S5, S7 | `README.md`, `assets/releases.js` | Configuración de descargas y documentación |
| T7 | S2, S6 | — | Verificación visual y funcional |

## Log

L1 (usuario, literal): «/Users/ipepio/Desktop/inklineMD-site/assets
/Users/ipepio/Desktop/inklineMD-site/index.html
/Users/ipepio/Desktop/inklineMD-site/README.md con esto tenemos que hadcer una
landing para /Users/ipepio/Workspace/ipepio/md_viewer y la demo será un iframe
del build. vale?»

L2 (decisiones del usuario): idioma «Bilingüe (ES + EN)»; marca «Inkline como app
/ inklineMD como proyecto»; estructura «Sitio nuevo fuera del repo» con copia del
build en `app/`; demo «Modo demo en el app (recomendado)».

L3 (evidencia): el build de Vite usa rutas absolutas (`src="/assets/…"`), por eso
la copia de la demo se genera con `vite build --base=./`. En navegador el app
arranca sin backend: `invoke` no existe y la barra de estado mostraba el
TypeError. `github.com/ipepio/inkline-md` responde 404, así que ningún enlace de
descarga se publica sin URL real.

L4 (evidencia de cierre, 2026-11-22): el sitio queda en `index.html`, `en.html`,
`app/` (build de la demo), `assets/{site.css,site.js,releases.js,icons.svg,fonts/,
demo-poster.png}` y `downloads/Inkline_0.1.1_aarch64.dmg`. El modo demo del app se
commiteó en el repo de la app: rama `feat/web-demo-mode`, commit `5abcb92`
(`pnpm build:demo` = `tsc -b && VITE_DEMO=1 vite build --base=./`; 239 tests de
vitest en verde). Verificado con capturas headless a 1440 y 390 px: demo en vivo
en escritorio (iframe con escala 0,83 y `#root` presente), captura estática y
botón «Abrir la demo» por debajo de 700 px (no se descargan 1,5 MB de JS), sin
imágenes rotas, sin desbordamiento horizontal y sin errores de consola. La
sección de descargas deja Windows y Linux en «Próximamente» porque
`github.com/ipepio/inkline-md` responde 404 y no hay binarios publicados.

L5 (descargas, decisión del humano): «Enlazar a la release de GitHub». Los tres
instaladores de la release v0.1.1 quedan enlazados desde `assets/releases.js`
(dmg arm64, NSIS x64, AppImage amd64) y se retira la copia local en `downloads/`.
Queda anotado en el README que el repo es privado hoy: los enlaces piden sesión
autorizada hasta que se haga público o se sirvan los binarios desde el sitio.

L6 (corrección del humano): «dódne has dejado la landing/repo? la idea era que
estuviera aquí /Users/ipepio/Workspace/ipepio/inlink-md-web». El sitio se movió
desde `~/Desktop/inklineMD-site` a ese directorio; allí solo quedó el `demo.html`
viejo del prototipo, que no forma parte de esta landing. Los tres instaladores de
la release ya estaban en el directorio.

L7 (ajustes de diseño pedidos por el humano con capturas): la cabecera se adapta
a la referencia que enseñó —símbolo + logotipo a la izquierda, navegación a la
derecha, conmutador ES/EN y un botón outlined «Probar demo →»— y la marca deja de
usar el PNG compuesto (`inklinemd-logo-on-dark.png`, que se recortaba al
escalar): ahora es el símbolo del repo (`src/assets/brand/inkline-white.png`) más
el logotipo en tipo, con «MD» en lima. El pie usa solo el símbolo (sin texto),
con las columnas alineadas y sin el hueco doble que dejaba el CTA de cierre; ese
bloque CTA (`Escribe Markdown. Mira el resultado.`) se elimina por pedido
explícito. Icono nuevo `i-arrow-right` para el botón de la cabecera.

L8 (la cabecera no coincidía con la referencia): el logotipo en tipo no reproducía
la marca. Ahora el «inklineMD» es el PNG del repo `src/assets/brand/inklineMD-text.png`
recolorado a blanco conservando el «MD» lima, con `scripts/make-wordmark.swift`
(CoreGraphics; el repo no tiene ese lockup para fondo oscuro). Cabecera a 92 px,
símbolo 41 px, logotipo 25 px de alto, nav a 14 px con 34 px de separación, el
conmutador ES/EN pasa de píldora a dos enlaces discretos y el CTA outlined sube a
44 px. Verificado a 1440 y 390, sin imágenes rotas ni desbordamiento.

L9 (el hero también se adapta a la referencia): titular en tres líneas
«Markdown. / Sin ruido. / Sin límites.» (blanco, gris, lima), entradilla a la
izquierda, CTA principal «Probar demo web →» y secundario outlined «Descargar
para <SO>», fila de tres comprobaciones con ✓, y a la derecha el panel
decorativo: retícula + halo lima, icono de la app (`assets/app-icon.png`), píldora
«Focus mode · on» y tarjeta de pistas 01/02/03. El fondo del hero lleva retícula
tenue enmascarada. La sección de demo en vivo sigue debajo, a ancho completo.
Verificado en ES/EN a 1440 y 390: sin imágenes rotas ni desbordamiento.

L10 (release 0.2.0): el humano actualizó el build, hizo push y pidió re-sincronizar
la demo, coger los enlaces de las Actions, construir el dmg y actualizar la
landing. Hecho: `./scripts/sync-demo.sh` con el main de 0.2.0
(`index-BcUyIOZB.js`); dmg local `Inkline_0.2.0_aarch64.dmg` (8,31 MiB);
artefactos de CI descargados y descomprimidos (`Inkline_0.2.0_x64-setup.exe`
5,6 MB e `Inkline_0.2.0_amd64.AppImage` 87 MB); landing y `releases.js` con
versión y nombres de archivo 0.2.0; captura `demo-poster.png` regenerada.
Hallazgo: el job «Web checks» del run 44973562035 falló por MI test
`App.demo.test.tsx`, que afirmaba el h2 renderizado («Tres modos, un
documento»): depende del modo de vista (CodeMirror solo monta las primeras
líneas en jsdom) y del diagrama Mermaid. Reescrito para verificar el recuento de
palabras de la barra de estado; 402/402 en verde con Node 22; commit `910ba33`
en `main`. Pendiente de decisión: la release v0.2.0 existe sin assets, así que
los tres enlaces del sitio apuntan a archivos que todavía no están publicados.

L11 (release v0.2.0 lista): commit `bbaab9b` en `main` con el trabajo pendiente
del repo (menú contextual de archivos —abrir, abrir en dividido, mostrar en
Finder/Explorador, copiar ruta— y `useAppHardening`, que bloquea F5/F12/⌘R en el
WebView): 408/408 tests y build en verde antes de commitear. Push a `main`:
`c8f7128..bbaab9b`. El tag `v0.2.0` y su release ya existían (apuntan a
`c8f7128`), así que no se movió ningún tag publicado. Subido el dmg a la release
con `gh release upload`: `Inkline_0.2.0_aarch64.dmg` (8,3 MB), y verificado
bajándolo otra vez (mismo sha256 que el build local). Demo re-sincronizada desde
`bbaab9b` (`index-CIi8GNgV.js`) y captura regenerada. Pendiente: `.exe` y
`.AppImage` de 0.2.0 están descomprimidos en `/tmp/inkline-ci`, sin subir; y `main`
va dos commits por delante del tag, así que una release de lo actual exigiría
0.2.1.

L12 (release completa): subidos los tres instaladores de 0.2.0 a la release con
`gh release upload`: dmg 8.717.621 B, exe 5.842.117 B, AppImage 91.445.752 B.
Integridad verificada bajándolos de nuevo y comparando sha256 con los artefactos
de CI (coinciden). Procedencia comprobada: jobs «Linux AppImage» (ubuntu-latest)
y «Windows NSIS installer» (windows-latest) del run 44973562035, head_sha
c8f7128. El AppImage es un ELF con 194 KB de cargador y 91,2 MB de squashfs:
lleva GTK3 + WebKitGTK dentro, mientras el dmg y el exe usan el WebView del
sistema (15 MB de app comprimidos a 8,3 y 5,6 MB). Pendiente de decisión: añadir
`--bundles deb` (y el hueco `linux-deb` que ya existe en releases.js) para
ofrecer un instalador ligero en Debian/Ubuntu.

L13 (.deb publicado): el workflow pasa a `pnpm tauri build --bundles appimage,deb`
y sube el artefacto `inkline-linux-deb` (commit `b29b229` en `main`, run
45013079013 con los tres jobs en verde). Para que el .deb de la release saliera
del mismo código que el resto de assets, se construyó desde el commit del tag
(`c8f7128`) en una rama temporal `ci/deb-v020`, ya eliminada junto con su
worktree. Subido a la release v0.2.0: `Inkline_0.2.0_amd64.deb` (8.119.880 B, 7,7
MB), sha256 idéntico al artefacto de CI. Su `control` declara `Version: 0.2.0`,
`Installed-Size: 19261` y `Depends: libwebkit2gtk-4.1-0, libgtk-3-0`: eso explica
los 87 MB del AppImage (empaqueta ambas bibliotecas) frente a los 7,7 MB del
paquete. La tarjeta de Linux muestra ahora dos botones —AppImage 87 MB y .deb 7,7
MB— y una nota que explica la diferencia; `releases.js` ya usa `linux-deb`.

L14 (licencia y repo público): el humano pide cambiar la licencia a Apache-2.0 y
publicar el repositorio. Hecho en `md_viewer` (commit `647b2c0`, pusheado):
`LICENSE` con el texto canónico de apache.org (202 líneas), `NOTICE` nuevo
(copyright 2026 ipepio + avisos de terceros: Marked y PrismJS del mockup,
modern-web-guidance Apache-2.0), `package.json` y `src-tauri/Cargo.toml` con
`Apache-2.0`, README con la sección de licencia y la nota de que el nombre y el
logo no se licencian. Antes de publicar se revisó el historial completo en busca
de secretos, `.env` y claves: limpio; solo PNG de iconos. `gh repo edit … 
--visibility public`: el repo pasa a público con descripción, homepage y temas.
Verificado anónimamente: repo 200, assets de la release 200. En la landing se
respetó el cambio del humano a CDN propio (`s3.ipepio.com`): solo se añadió el
enlace al repo y la licencia, y se corrigió el comentario de `releases.js` que
daba el repo por privado. El `.deb` descargado del CDN es byte a byte el de la
release (mismo sha256).
