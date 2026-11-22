import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

// Recolorea tinta oscura -> blanco (conservando el lima) y recorta al contenido.
// Uso: swift scripts/make-wordmark.swift \
//   ../../md_viewer/src/assets/brand/inklineMD-text.png assets/wordmark.png
let args = CommandLine.arguments
guard args.count >= 3 else { exit(1) }
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let source = CGImageSourceCreateWithURL(inURL as CFURL, nil),
      let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { exit(2) }

let width = image.width
let height = image.height
let bytesPerRow = width * 4
var buffer = [UInt8](repeating: 0, count: bytesPerRow * height)

guard let ctx = CGContext(
  data: &buffer,
  width: width,
  height: height,
  bitsPerComponent: 8,
  bytesPerRow: bytesPerRow,
  space: CGColorSpace(name: CGColorSpace.sRGB)!,
  bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else { exit(3) }

ctx.draw(image, in: CGRect(x: 0, y: 0, width: width, height: height))

var minX = width, minY = height, maxX = -1, maxY = -1
for y in 0..<height {
  for x in 0..<width {
    let i = y * bytesPerRow + x * 4
    let a = Double(buffer[i + 3]) / 255.0
    if a <= 0.02 { continue }
    // Des-premultiplica para juzgar el color real.
    let r = Double(buffer[i]) / 255.0 / a
    let g = Double(buffer[i + 1]) / 255.0 / a
    let b = Double(buffer[i + 2]) / 255.0 / a
    if max(r, max(g, b)) < 0.42 {
      buffer[i] = UInt8(255 * a)
      buffer[i + 1] = UInt8(255 * a)
      buffer[i + 2] = UInt8(255 * a)
    }
    if x < minX { minX = x }
    if x > maxX { maxX = x }
    if y < minY { minY = y }
    if y > maxY { maxY = y }
  }
}

guard maxX > minX, maxY > minY, let full = ctx.makeImage() else { exit(4) }
let box = CGRect(x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1)
guard let cropped = full.cropping(to: box) else { exit(5) }
guard let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(6) }
CGImageDestinationAddImage(dest, cropped, nil)
guard CGImageDestinationFinalize(dest) else { exit(7) }
print("ok \(cropped.width)x\(cropped.height)")
