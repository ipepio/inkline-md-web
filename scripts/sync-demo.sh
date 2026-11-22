#!/usr/bin/env bash
#
# Copia el build de Inkline (con el modo demo activado) en app/ para que la
# landing lo muestre dentro del iframe.
#
# Uso:
#   ./scripts/sync-demo.sh                 # usa ~/Workspace/ipepio/md_viewer
#   ./scripts/sync-demo.sh /ruta/al/repo   # otro checkout
#
set -euo pipefail

REPO="${1:-${INKLINE_REPO:-$HOME/Workspace/ipepio/md_viewer}}"
SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$REPO/package.json" ]; then
  echo "No encuentro el repo de Inkline en: $REPO" >&2
  echo "Pasa la ruta como argumento: ./scripts/sync-demo.sh /ruta/al/md_viewer" >&2
  exit 1
fi

echo "→ Build de la demo en $REPO"
(
  cd "$REPO"
  # `build:demo` compila con VITE_DEMO=1 y rutas relativas (--base=./), así el
  # iframe funciona servido en un subdirectorio.
  pnpm build:demo
)

echo "→ Copiando dist/ en $SITE/app/"
mkdir -p "$SITE/app"
rsync -a --delete "$REPO/dist/" "$SITE/app/"

echo "✓ Demo actualizada: $SITE/app/index.html"
echo "  Recuerda comprobar que no quedan rutas absolutas:"
grep -o 'src="[^"]*"' "$SITE/app/index.html" || true
