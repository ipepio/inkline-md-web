# inklineMD — landing + demo

Sitio estático de la app **Inkline** (proyecto **inklineMD**): landing bilingüe
(ES/EN) con la demo real del frontend dentro de un iframe. Sin framework, sin
build y sin dependencias externas: solo HTML, CSS y un par de scripts.

## Estructura

```text
index.html          Landing en español (idioma por defecto)
en.html             Landing en inglés
app/                Build de Inkline copiado tal cual (iframe de la demo)
assets/
  site.css          Hoja de estilo compartida (tokens de la app)
  site.js           Escalado del iframe, detección de SO y descargas
  releases.js       URLs de los instaladores (configuración)
  icons.svg         Sprite de iconos
  fonts/            Inter Variable (woff2, servido en local)
  inklinemd-*.png   Marca
  demo-poster.png   Captura de la app (móvil y respaldo del iframe)
  inkline-mark.png  Símbolo del repo (blanco + trazo lima)
  wordmark.png      Logotipo «inklineMD» recolorado a blanco y lima
  app-icon.png      Icono de la app (favicon y og:image)
scripts/sync-demo.sh         Regenera app/ desde el repo de la app
scripts/make-wordmark.swift  Regenera wordmark.png desde el asset del repo
scripts/upload-artifacts.py  Sube instaladores al CDN (SigV4)
odd/tasks/landing.md         Specs y seguimiento del trabajo (ODD)
```

Los instaladores **no** se versionan aquí: viven en el CDN del proyecto (ver
«Descargas»). El `.gitignore` excluye los binarios locales.

## Probar en local

```bash
python3 -m http.server 8090
# http://localhost:8090
```

`file://` no sirve para la demo: el iframe y el sprite de iconos necesitan un
origen http.

## Actualizar la demo

La demo es el frontend real compilado **sin** el backend de Tauri. El repo de la
app activa el modo demo con `VITE_DEMO=1` (`pnpm build:demo`), que carga un
documento de ejemplo y evita el error de espacio de trabajo en la barra de
estado.

```bash
./scripts/sync-demo.sh                      # usa ~/Workspace/ipepio/md_viewer
./scripts/sync-demo.sh /ruta/al/md_viewer   # otro checkout
```

El script compila y copia `dist/` en `app/`. Si el iframe no encuentra la app,
la landing muestra el aviso con el comando que falta en lugar de un hueco en
blanco.

## Descargas

`assets/releases.js` es la única fuente de verdad de las descargas. Cada clave
con URL se convierte en un botón; las que siguen en `null` se muestran como
«Próximamente». Los botones de las tarjetas también llevan el `href` definitivo
para que funcionen sin JavaScript.

```js
window.INKLINEMD_RELEASES = {
  repository: 'ipepio/inkline-md',
  version: '0.2.0',
  downloads: {
    'macos-arm64': 'https://s3.ipepio.com/public/inkline/0.2.0/Inkline_0.2.0_aarch64.dmg',
    'macos-x64': null,
    'windows-x64': 'https://s3.ipepio.com/public/inkline/0.2.0/Inkline_0.2.0_x64-setup.exe',
    'windows-arm64': null,
    'linux-deb': 'https://s3.ipepio.com/public/inkline/0.2.0/Inkline_0.2.0_amd64.deb'
  }
};
```

Linux se distribuye **solo como `.deb`** (x86_64, Debian/Ubuntu y derivadas).
La matriz publicada hoy es macOS arm64, Windows x64 y Linux x86_64.

### CDN

Los binarios se sirven desde el endpoint S3-compatible del proyecto. El layout
es estable y versionado, así que un release nuevo son URLs nuevas, nunca un
objeto sobrescrito:

```text
https://s3.ipepio.com/public/inkline/<versión>/<nombre-del-artefacto>
```

Las descargas **no** apuntan a `github.com/.../releases`: el CDN desacopla la
entrega del repo y permite servir binarios grandes sin gastar ancho de banda de
GitHub. Desde el 22/11/2026 el repo `ipepio/inkline-md` es público y el código
está bajo Apache-2.0, así que las URLs de la release funcionan igual como
alternativa.

La lectura anónima del bucket `public` es una política de bucket limitada al
prefijo `inkline/*` (`s3:GetObject` para `arn:aws:s3:::public/inkline/*`). Nada
fuera de ese prefijo es público. Las ACL por objeto no están implementadas en
este endpoint.

### Publicar una versión nueva

```bash
export S3_ACCESS_KEY_ID=...
export S3_SECRET_ACCESS_KEY=...
./scripts/upload-artifacts.py 0.2.0 \
  Inkline_0.2.0_aarch64.dmg \
  Inkline_0.2.0_amd64.deb \
  Inkline_0.2.0_x64-setup.exe
```

El script imprime la URL y el `sha256` de cada archivo. Después:

1. Actualiza `version` y las URLs de `assets/releases.js`.
2. Actualiza `href`, tamaños y textos de las tarjetas en `index.html` y `en.html`.
3. Comprueba que cada URL responde `200` sin credenciales:

```bash
curl -sI https://s3.ipepio.com/public/inkline/0.2.0/Inkline_0.2.0_amd64.deb | head -1
```

La landing detecta el sistema del visitante (User-Agent) para marcar su tarjeta
y etiquetar el botón principal. Los binarios no están firmados: el sitio lo dice
explícitamente en la sección de descargas y en las preguntas frecuentes.

## Despliegue

Es un sitio estático sin build: publica la raíz del repo tal cual (GitHub Pages,
Cloudflare Pages, Netlify, Nginx…). Mantén `app/` junto a `index.html`: el
iframe usa rutas relativas.

## Marca

Los dos PNG de la cabecera salen del repo de la app:

```bash
cp ../md_viewer/src/assets/brand/inkline-white.png assets/inkline-mark.png
cp ../md_viewer/src-tauri/icons/icon.png assets/app-icon.png
swift scripts/make-wordmark.swift \
  ../md_viewer/src/assets/brand/inklineMD-text.png assets/wordmark.png
```

El repo no tiene un logotipo con el «MD» en lima sobre fondo oscuro (solo lo
tiene negro, o blanco entero). `make-wordmark.swift` toma `inklineMD-text.png`
—texto negro, «MD» lima— y convierte la tinta oscura en blanca conservando el
lima, recortando al contenido. En la cabecera símbolo y logotipo se escalan por
altura, así que no se recortan a ningún tamaño.

## Licencia

El código de la app (`ipepio/inkline-md`) es Apache-2.0. Este sitio comparte la
misma licencia; la marca y el logotipo no están licenciados.
