/**
 * Configuración de descargas de inklineMD.
 *
 * Cada URL publicada enlaza a su instalador real; lo que siga en `null` se
 * muestra en la landing como «Próximamente». No se inventan URLs.
 *
 * `repository` (owner/repo) es opcional: si tiene valor, la landing puede
 * usar la última release pública como referencia. Déjalo vacío si el repo no
 * es público.
 *
 * Los instaladores se sirven desde el CDN del proyecto
 * (https://s3.ipepio.com/public/inkline/<versión>/…), que se actualiza con
 * scripts/upload-artifacts.py. La release pública de GitHub
 * (…/releases/download/v<versión>/…) queda como espejo: cambiar el prefijo es
 * suficiente para apuntar allí.
 */
window.INKLINEMD_RELEASES = {
  repository: 'ipepio/inkline-md',
  version: '0.3.0',
  downloads: {
    'macos-arm64': 'https://s3.ipepio.com/public/inkline/0.3.0/Inkline_0.3.0_aarch64.dmg',
    'macos-x64': null,
    'windows-x64': 'https://s3.ipepio.com/public/inkline/0.3.0/Inkline_0.3.0_x64-setup.exe',
    'windows-arm64': null,
    'linux-deb': 'https://s3.ipepio.com/public/inkline/0.3.0/Inkline_0.3.0_amd64.deb'
  }
};
