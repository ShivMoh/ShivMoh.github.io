"use client"

import { useCallback, useEffect, useState } from "react"
import { commit, listFiles, readFile } from "./github"
import { MAX_UPLOAD_BYTES, isImage, safeName } from "./media"

// The gallery page imports this file at build time, so saving here triggers a redeploy with the new images.
const GALLERY_JSON = "src/app/gallery/gallery.json"
// Not public/gallery/ — a folder with the same name as the /gallery route would shadow it on GitHub Pages.
const UPLOAD_DIR = "public/gallery-images"

interface Item {
  img: string
  title: string
  file?: File // set until the image has been committed
  blobUrl?: string
}

const titleFromFile = (name: string) =>
  name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase())

export default function GalleryManager({ token }: { token: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [taken, setTaken] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [json, files] = await Promise.all([readFile(token, GALLERY_JSON), listFiles(token, "public/")])
      setItems(JSON.parse(json))
      setTaken(new Set(files))
      setDirty(false)
      setStatus("")
    } catch (err) {
      setStatus(`Couldn't load the gallery: ${(err as Error).message}`)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const change = (next: Item[]) => {
    setItems(next)
    setDirty(true)
  }

  const add = (list: FileList | null) => {
    if (!list?.length) return
    const used = new Set([...taken, ...items.map(i => `public${i.img}`)])
    const added: Item[] = []
    for (const file of Array.from(list)) {
      if (!isImage(file.name)) {
        setStatus(`${file.name} isn't an image.`)
        continue
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setStatus(`${file.name} is over 50 MB — compress it first.`)
        continue
      }
      const name = safeName(file.name)
      const dot = name.lastIndexOf(".")
      let path = `${UPLOAD_DIR}/${name}`
      for (let i = 2; used.has(path); i++) path = `${UPLOAD_DIR}/${name.slice(0, dot)}-${i}${name.slice(dot)}`
      used.add(path)
      added.push({ img: path.slice("public".length), title: titleFromFile(file.name), file, blobUrl: URL.createObjectURL(file) })
    }
    if (added.length) change([...added, ...items])
  }

  const move = (i: number, by: number) => {
    const j = i + by
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    change(next)
  }

  const save = async () => {
    setSaving(true)
    setStatus("Saving…")
    try {
      const uploads = items.filter(i => i.file)
      const json = JSON.stringify(items.map(({ img, title }) => ({ img, title })), null, 2) + "\n"
      await commit(token, `gallery: update (${items.length} images)`, [
        { path: GALLERY_JSON, content: json },
        ...uploads.map(i => ({ path: `public${i.img}`, content: i.file! })),
      ])
      setTaken(t => new Set([...t, ...uploads.map(i => `public${i.img}`)]))
      setItems(its => its.map(({ file: _file, ...rest }) => rest))
      setDirty(false)
      setStatus("Saved ✓ — the gallery updates once the deploy finishes (~1–2 min).")
    } catch (err) {
      setStatus(`Save failed: ${(err as Error).message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section
      className="studio-main studio-gallery"
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); add(e.dataTransfer.files) }}
    >
      <div className="studio-gallery-head">
        <h2>Gallery</h2>
        <label className="studio-button studio-primary">
          + Add images
          <input type="file" multiple accept="image/*" hidden onChange={e => { add(e.target.files); e.target.value = "" }} />
        </label>
        <button onClick={() => (!dirty || confirm("Discard unsaved gallery changes?")) && load()} disabled={saving || loading}>
          Revert
        </button>
        <button className="studio-primary" onClick={save} disabled={!dirty || saving}>
          {saving ? "Saving…" : "Save gallery"}
        </button>
      </div>
      <p className="studio-note">
        {status || "Drop images here to add them. Order here is the order on the page; titles are used as alt text."}
      </p>

      {loading ? (
        <p className="studio-note">Loading…</p>
      ) : (
        <ol className="studio-gallery-list">
          {items.map((item, i) => (
            <li key={item.img}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.blobUrl ?? item.img} alt="" loading="lazy" />
              <div className="studio-gallery-fields">
                <input
                  value={item.title}
                  onChange={e => change(items.map((it, k) => (k === i ? { ...it, title: e.target.value } : it)))}
                  placeholder="Caption / alt text"
                />
                <small>{item.img}{item.file && " · new"}</small>
              </div>
              <div className="studio-gallery-actions">
                <button title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
                <button
                  className="studio-danger"
                  title="Remove from gallery (the file stays in the repo)"
                  onClick={() => change(items.filter((_, k) => k !== i))}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
