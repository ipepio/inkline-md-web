#!/usr/bin/env python3
"""Sube instaladores al CDN público con firma AWS SigV4.

El endpoint es S3-compatible y no hay `aws` CLI en este equipo, así que la
firma se calcula aquí con la biblioteca estándar.

Uso:
    export S3_ACCESS_KEY_ID=...
    export S3_SECRET_ACCESS_KEY=...
    ./scripts/upload-artifacts.py 0.2.0 dist/Inkline_0.2.0_aarch64.dmg ...

Variables opcionales:
    S3_ENDPOINT   host del endpoint (por defecto s3.ipepio.com)
    S3_BUCKET     bucket destino (por defecto public)
    S3_PREFIX     prefijo de los objetos (por defecto inkline)

Cada archivo se publica en https://<endpoint>/<bucket>/<prefix>/<versión>/<nombre>.
La lectura anónima depende de la política del bucket: solo el prefijo `inkline/*`
está abierto a lectura pública, por eso los objetos van siempre bajo él.
"""

import hashlib
import hmac
import http.client
import os
import sys
from datetime import UTC, datetime

ENDPOINT = os.environ.get("S3_ENDPOINT", "s3.ipepio.com")
BUCKET = os.environ.get("S3_BUCKET", "public")
PREFIX = os.environ.get("S3_PREFIX", "inkline")
REGION = os.environ.get("S3_REGION", "us-east-1")

CONTENT_TYPES = {
    ".dmg": "application/x-apple-diskimage",
    ".deb": "application/vnd.debian.binary-package",
    ".exe": "application/octet-stream",
    ".AppImage": "application/octet-stream",
}


def credentials():
    key = os.environ.get("S3_ACCESS_KEY_ID")
    secret = os.environ.get("S3_SECRET_ACCESS_KEY")
    if not key or not secret:
        sys.exit("Faltan S3_ACCESS_KEY_ID y S3_SECRET_ACCESS_KEY en el entorno.")
    return key, secret


def sign(method, path, query, payload_hash, extra_headers):
    key, secret = credentials()
    now = datetime.now(UTC)
    amz_date = now.strftime("%Y%m%dT%H%M%SZ")
    date_stamp = now.strftime("%Y%m%d")

    headers = {"host": ENDPOINT, "x-amz-content-sha256": payload_hash, "x-amz-date": amz_date}
    headers.update({name.lower(): value for name, value in extra_headers.items()})

    signed_headers = ";".join(sorted(headers))
    canonical_headers = "".join(f"{name}:{headers[name]}\n" for name in sorted(headers))
    canonical_request = "\n".join(
        [method, path, query, canonical_headers, signed_headers, payload_hash]
    )
    scope = f"{date_stamp}/{REGION}/s3/aws4_request"
    string_to_sign = "\n".join(
        [
            "AWS4-HMAC-SHA256",
            amz_date,
            scope,
            hashlib.sha256(canonical_request.encode()).hexdigest(),
        ]
    )

    signing_key = ("AWS4" + secret).encode()
    for part in (date_stamp, REGION, "s3", "aws4_request"):
        signing_key = hmac.new(signing_key, part.encode(), hashlib.sha256).digest()
    signature = hmac.new(signing_key, string_to_sign.encode(), hashlib.sha256).hexdigest()

    headers["authorization"] = (
        f"AWS4-HMAC-SHA256 Credential={key}/{scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )
    return headers


def upload(path, version):
    name = os.path.basename(path)
    with open(path, "rb") as handle:
        body = handle.read()

    object_path = f"/{BUCKET}/{PREFIX}/{version}/{name}"
    extension = os.path.splitext(name)[1]
    headers = sign(
        "PUT",
        object_path,
        "",
        hashlib.sha256(body).hexdigest(),
        {
            "content-type": CONTENT_TYPES.get(extension, "application/octet-stream"),
            "content-length": str(len(body)),
        },
    )

    connection = http.client.HTTPSConnection(ENDPOINT, timeout=180)
    connection.request("PUT", object_path, body=body, headers=headers)
    response = connection.getresponse()
    response.read()
    if response.status not in (200, 201):
        raise SystemExit(f"{response.status} al subir {name}")

    url = f"https://{ENDPOINT}{object_path}"
    digest = hashlib.sha256(body).hexdigest()
    print(f"{name} · {len(body)} bytes · sha256 {digest}\n  {url}")


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    version = sys.argv[1]
    for path in sys.argv[2:]:
        upload(path, version)


if __name__ == "__main__":
    main()
