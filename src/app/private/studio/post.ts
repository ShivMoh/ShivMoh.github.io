// Helpers for reading/patching a post's HTML file. Posts follow the structure
// of public/blog/entries/first-blog.html; the editable body lives inside
// <main class="blog-content">.

const MAIN_OPEN = /<main[^>]*class="[^"]*blog-content[^"]*"[^>]*>/

export interface PostMeta {
  title: string
  date: string // YYYY-MM-DD
  tags: string[]
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

function bodyRange(html: string): [number, number] | null {
  const open = MAIN_OPEN.exec(html)
  const close = html.lastIndexOf("</main>")
  if (!open || close < open.index) return null
  return [open.index + open[0].length, close]
}

export const hasBody = (html: string) => bodyRange(html) !== null

// Kept lossless (no re-indenting) so whitespace inside <pre> blocks survives edits.
export function getBody(html: string): string {
  const range = bodyRange(html)
  if (!range) return html
  return html.slice(...range).replace(/^\n+|\s+$/g, "")
}

export function setBody(html: string, body: string): string {
  const range = bodyRange(html)
  if (!range) return html
  return `${html.slice(0, range[0])}\n${body}\n        ${html.slice(range[1])}`
}

export function readMinutes(html: string): number {
  const text = getBody(html).replace(/<[^>]+>/g, " ")
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDate(date: string): string {
  const d = new Date(`${date}T00:00:00`)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

/** Syncs <title>, the header, read time and tag chips with the metadata fields. */
export function applyMeta(html: string, meta: PostMeta): string {
  const title = escapeHtml(meta.title || "Untitled")
  const tags = meta.tags.map(t => `\n            <span class="blog-tag">${escapeHtml(t)}</span>`).join("")
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title} | Shivesh Mohamed</title>`)
    .replace(/(<h1 class="blog-title">)[\s\S]*?(<\/h1>)/, `$1${title}$2`)
    .replace(
      /(<div class="blog-meta">)[\s\S]*?(<\/div>)/,
      `$1\n                <span>${formatDate(meta.date)}</span>\n                <span>${readMinutes(html)} min read</span>\n            $2`,
    )
    .replace(/(<div class="blog-tags">)[\s\S]*?(<\/div>)/, `$1${tags}\n        $2`)
}

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
