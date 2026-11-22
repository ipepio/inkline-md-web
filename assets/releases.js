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
 * Los instaladores se sirven desde el CDN público del proyecto
 * (https://s3.ipepio.com/public/inkline/<versión>/…), no desde GitHub: el
 * repositorio de la app es privado y un visitante anónimo recibiría 404.
 */
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
