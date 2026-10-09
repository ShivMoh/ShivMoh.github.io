import { slugify } from "./post"

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024

const IMAGE = /\.(png|jpe?g|gif|webp|svg|avif|ico)$/i
const VIDEO = /\.(mp4|webm|mov|ogv)$/i
const AUDIO = /\.(mp3|wav|ogg|m4a)$/i
export const isMedia = (path: string) => IMAGE.test(path) || VIDEO.test(path) || AUDIO.test(path) || /\.pdf$/i.test(path)
export const isImage = (path: string) => IMAGE.test(path)
export const isVideo = (path: string) => VIDEO.test(path)

/** "My Photo (1).JPG" → "my-photo-1.jpg" */
export function safeName(fileName: string): string {
  const dot = fileName.lastIndexOf(".")
  const base = slugify(dot > 0 ? fileName.slice(0, dot) : fileName) || "file"
  return base + (dot > 0 ? fileName.slice(dot).toLowerCase() : "")
}

/** HTML to drop into a post for a media URL. */
export function mediaSnippet(url: string): string {
  if (IMAGE.test(url)) return `<figure>\n  <img src="${url}" alt="">\n  <figcaption></figcaption>\n</figure>\n`
  if (VIDEO.test(url)) return `<video src="${url}" controls style="max-width: 100%; border-radius: 8px;"></video>\n`
  if (AUDIO.test(url)) return `<audio src="${url}" controls></audio>\n`
  return `<a href="${url}">${url.split("/").pop()}</a>`
}
