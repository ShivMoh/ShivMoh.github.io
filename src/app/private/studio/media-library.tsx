"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { commit, listFiles } from "./github"
import { MAX_UPLOAD_BYTES, isImage, isMedia, isVideo, safeName } from "./media"

const UPLOAD_DIR = "public/blog/media"

interface Props {
  token: string
  /** site URL → local blob URL, for files uploaded this session that aren't deployed yet */
  localUrls: Record<string, string>
  onUploaded: (uploads: { url: string; file: File }[]) => void
  onInsert: (url: string) => void
  onClose: () => void
}

export default function MediaLibrary({ token, localUrls, onUploaded, onInsert, onClose }: Props) {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [query, setQuery] = useState("")
  const [blogOnly, setBlogOnly] = useState(true)
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      setFiles((await listFiles(token, "public/")).filter(isMedia))
    } catch (err) {
      setMessage(`Couldn't list files: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const shown = useMemo(() => {
    const q = query.toLowerCase()
    return files
      .filter(f => !blogOnly || f.startsWith("public/blog/"))
      .filter(f => f.toLowerCase().includes(q))
      .sort((a, b) => Number(!!localUrls[b.slice(6)]) - Number(!!localUrls[a.slice(6)]) || a.localeCompare(b))
  }, [files, query, blogOnly, localUrls])

  // Uploads commit immediately so the links work as soon as the site redeploys.
  const upload = async (list: FileList | null) => {
    if (!list?.length) return
    const taken = new Set(files)
    const picked: { path: string; file: File }[] = []
    for (const file of Array.from(list)) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setMessage(`${file.name} is over 50 MB — compress it first.`)
        continue
      }
      const name = safeName(file.name)
      const dot = name.lastIndexOf(".")
      let path = `${UPLOAD_DIR}/${name}`
      for (let i = 2; taken.has(path); i++) path = `${UPLOAD_DIR}/${name.slice(0, dot)}-${i}${name.slice(dot)}`
      taken.add(path)
      picked.push({ path, file })
    }
    if (inputRef.current) inputRef.current.value = ""
    if (!picked.length) return

    setUploading(true)
    setMessage(`Uploading ${picked.length} file(s)…`)
    try {
      await commit(token, `blog: upload ${picked.map(p => p.path.split("/").pop()).join(", ")}`,
        picked.map(p => ({ path: p.path, content: p.file })))
      setFiles(f => [...f, ...picked.map(p => p.path)])
      onUploaded(picked.map(p => ({ url: p.path.slice(6), file: p.file })))
      setMessage("Uploaded ✓ — links work in the preview now and on the live site after the deploy (~1–2 min).")
    } catch (err) {
      setMessage(`Upload failed: ${(err as Error).message}`)
    } finally {
      setUploading(false)
    }
  }

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setMessage(`Copied ${url}`)
    } catch {
      setMessage(url)
    }
  }

  return (
    <div className="studio-library-backdrop" onClick={onClose}>
      <div
        className="studio-library"
        onClick={e => e.stopPropagation()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); upload(e.dataTransfer.files) }}
      >
        <header>
          <h2>Media library</h2>
          <button className="studio-primary" onClick={() => inputRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </button>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*,audio/*,application/pdf" hidden onChange={e => upload(e.target.files)} />
          <button onClick={onClose}>Close</button>
        </header>

        <div className="studio-library-filters">
          <input placeholder="Search files…" value={query} onChange={e => setQuery(e.target.value)} autoFocus />
          <label>
            <input type="checkbox" checked={blogOnly} onChange={e => setBlogOnly(e.target.checked)} /> Blog files only
          </label>
        </div>
        <p className="studio-note">{message || "Drop files anywhere here to upload. Click a file to insert it at your cursor."}</p>

        <div className="studio-library-grid">
          {loading && <p className="studio-note">Loading…</p>}
          {!loading && shown.length === 0 && <p className="studio-note">No files yet — upload some.</p>}
          {shown.map(path => {
            const url = path.slice("public".length)
            const src = localUrls[url] ?? url
            return (
              <figure key={path} title={url}>
                <button className="studio-thumb" onClick={() => onInsert(url)}>
                  {isImage(path) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" loading="lazy" />
                  ) : isVideo(path) ? (
                    <video src={src} muted preload="metadata" />
                  ) : (
                    <span>{path.split(".").pop()}</span>
                  )}
                </button>
                <figcaption>
                  <span>{url.split("/").pop()}</span>
                  <button onClick={() => copy(url)}>Copy link</button>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </div>
  )
}
