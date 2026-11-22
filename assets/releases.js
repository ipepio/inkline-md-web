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
 * Los instaladores se sirven desde la release pública de GitHub
 * (…/releases/download/v<versión>/…), que no depende de credenciales. El CDN
 * del proyecto (https://s3.ipepio.com/public/inkline/<versión>/…) sigue
 * disponible como espejo: basta cambiar el prefijo y subir los archivos con
 * scripts/upload-artifacts.py.
 */
window.INKLINEMD_RELEASES = {
  repository: 'ipepio/inkline-md',
  version: '0.3.0',
  downloads: {
    'macos-arm64': 'https://github.com/ipepio/inkline-md/releases/download/v0.3.0/Inkline_0.3.0_aarch64.dmg',
    'macos-x64': null,
    'windows-x64': 'https://github.com/ipepio/inkline-md/releases/download/v0.3.0/Inkline_0.3.0_x64-setup.exe',
    'windows-arm64': null,
    'linux-deb': 'https://github.com/ipepio/inkline-md/releases/download/v0.3.0/Inkline_0.3.0_amd64.deb'
  }
};
