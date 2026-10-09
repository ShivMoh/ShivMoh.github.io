"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { forgetToken, login, logout, restoreSession, savedToken, type Session } from "./auth"
import { commit, readEntries, readFile, type BlogEntry, type FileChange } from "./github"
import { applyMeta, getBody, hasBody, setBody, slugify } from "./post"
import { POST_TEMPLATE } from "./post-template"
import { MAX_UPLOAD_BYTES, mediaSnippet, safeName } from "./media"
import MediaLibrary from "./media-library"
import "./studio.scss"

const DRAFT_KEY = "studio-draft"

interface Draft {
  originalId: string | null // id of the existing entry being edited, null for a new post
  path: string | null
  id: string
  title: string
  date: string
  excerpt: string
  tags: string
  mode: "body" | "full"
  shell: string // full file; its <main> contents are ignored in body mode
  body: string
  full: string
}

interface Media {
  repoPath: string
  url: string
  file: File
  blobUrl: string
  committed: boolean
}

const today = () => new Date().toISOString().slice(0, 10)

const newDraft = (): Draft => ({
  originalId: null,
  path: null,
  id: "",
  title: "",
  date: today(),
  excerpt: "",
  tags: "",
  mode: "body",
  shell: POST_TEMPLATE,
  body: "<p>Start writing here...</p>",
  full: POST_TEMPLATE,
})

const composeHtml = (d: Draft) => (d.mode === "full" ? d.full : setBody(d.shell, d.body))
const tagList = (tags: string) => tags.split(",").map(t => t.trim()).filter(Boolean)
const metaOf = (d: Draft) => ({ title: d.title, date: d.date, tags: tagList(d.tags) })

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveDraft(d: Draft | null) {
  try {
    if (d) localStorage.setItem(DRAFT_KEY, JSON.stringify(d))
    else localStorage.removeItem(DRAFT_KEY)
  } catch {}
}

/* ───────────────────────────── Login ───────────────────────────── */

function Login({ expired, onLogin }: { expired: boolean; onLogin: (s: Session) => void }) {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [needsToken] = useState(() => !savedToken())
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError("")
    try {
      onLogin(await login(password, token))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="studio-login-backdrop">
      <form className="studio-login" onSubmit={submit}>
        <h1>Studio</h1>
        {expired && <p className="studio-note">Your session expired. Log back in — your draft is still here.</p>}
        <input
          type="password"
          placeholder="Password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {needsToken && (
          <>
            <input
              type="password"
              placeholder="GitHub token (first time on this browser)"
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <p className="studio-note">
              Fine-grained token for ShivMoh.github.io with Contents: read &amp; write. Saved in this browser only.
            </p>
          </>
        )}
        <button type="submit" disabled={busy || !password || (needsToken && !token)}>
          {busy ? "Checking…" : "Log in"}
        </button>
        {error && <p className="studio-error">{error}</p>}
      </form>
    </div>
  )
}

/* ───────────────────────────── Toolbar ───────────────────────────── */

type Wrap = [before: string, after: string, placeholder: string]

const TOOLS: { label: string; title: string; wrap: Wrap }[] = [
  { label: "P", title: "Paragraph", wrap: ["<p>", "</p>", "Paragraph text"] },
  { label: "H2", title: "Heading", wrap: ["<h2>", "</h2>", "Heading"] },
  { label: "H3", title: "Subheading", wrap: ["<h3>", "</h3>", "Subheading"] },
  { label: "B", title: "Bold (Ctrl+B)", wrap: ["<strong>", "</strong>", "bold"] },
  { label: "I", title: "Italic (Ctrl+I)", wrap: ["<em>", "</em>", "italic"] },
  { label: "</>", title: "Inline code", wrap: ["<code>", "</code>", "code"] },
  { label: "{ }", title: "Code block", wrap: ["<pre><code>", "</code></pre>", "code"] },
  { label: "“ ”", title: "Quote", wrap: ["<blockquote>\n  ", "\n</blockquote>", "Quote"] },
  { label: "Link", title: "Link (Ctrl+K)", wrap: ['<a href="https://">', "</a>", "link text"] },
  { label: "• List", title: "Bulleted list", wrap: ["<ul>\n  <li>", "</li>\n</ul>", "item"] },
  { label: "1. List", title: "Numbered list", wrap: ["<ol>\n  <li>", "</li>\n</ol>", "item"] },
]

/* ───────────────────────────── Studio ───────────────────────────── */

export default function StudioPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)
  const [expired, setExpired] = useState(false)

  const [entries, setEntries] = useState<BlogEntry[]>([])
  const [draft, setDraft] = useState<Draft>(newDraft)
  const [dirty, setDirty] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false)
  const [media, setMedia] = useState<Media[]>([])
  const [view, setView] = useState<"split" | "editor" | "preview">("split")
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)
  const [preview, setPreview] = useState("")
  const [libraryOpen, setLibraryOpen] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef(0)

  // Restore session from cookie + any unsaved draft.
  useEffect(() => {
    setSession(restoreSession())
    setChecking(false)
    const saved = loadDraft()
    if (saved) {
      setDraft(saved)
      setDirty(true)
      setSlugTouched(true)
      setStatus("Restored your unsaved draft.")
    }
  }, [])

  // Kick back to the login screen when the hour is up (draft stays in memory).
  useEffect(() => {
    if (!session) return
    const t = setTimeout(() => {
      logout()
      setSession(null)
      setExpired(true)
    }, session.expiresAt - Date.now())
    return () => clearTimeout(t)
  }, [session])

  const refreshEntries = useCallback(async (token: string) => {
    try {
      setEntries(await readEntries(token))
    } catch (err) {
      setStatus(`Couldn't load posts: ${(err as Error).message}`)
    }
  }, [])

  useEffect(() => {
    if (session) refreshEntries(session.token)
  }, [session, refreshEntries])

  // Autosave draft locally so nothing is lost on expiry or a closed tab.
  useEffect(() => {
    if (dirty) saveDraft(draft)
  }, [draft, dirty])

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  const html = useMemo(() => applyMeta(composeHtml(draft), metaOf(draft)), [draft])

  // Debounced preview: staged media → blob URLs, and a <base> so relative paths resolve like the live post.
  useEffect(() => {
    const t = setTimeout(() => {
      let out = html
      for (const m of media) out = out.split(m.url).join(m.blobUrl)
      out = out.replace(/<head([^>]*)>/i, `<head$1><base href="/blog/entries/">`)
      scrollRef.current = iframeRef.current?.contentWindow?.scrollY ?? 0
      setPreview(out)
    }, 250)
    return () => clearTimeout(t)
  }, [html, media])

  const update = (patch: Partial<Draft>) => {
    setDraft(d => ({ ...d, ...patch }))
    setDirty(true)
  }

  const onTitle = (title: string) => {
    update(draft.originalId || slugTouched ? { title } : { title, id: slugify(title) })
  }

  const editorValue = draft.mode === "full" ? draft.full : draft.body
  const setEditorValue = (v: string) => update(draft.mode === "full" ? { full: v } : { body: v })

  const switchMode = (mode: Draft["mode"]) => {
    if (mode === draft.mode) return
    if (mode === "full") return update({ mode, full: composeHtml(draft) })
    if (!hasBody(draft.full)) {
      setStatus('Body mode needs a <main class="blog-content"> element in the file.')
      return
    }
    update({ mode, shell: draft.full, body: getBody(draft.full) })
  }

  // Insert via execCommand so the browser's undo stack keeps working.
  const insert = (text: string, selectStart?: number, selectEnd?: number) => {
    const ta = textareaRef.current
    if (!ta) return
    ta.focus()
    const start = ta.selectionStart
    if (!document.execCommand("insertText", false, text)) {
      setEditorValue(ta.value.slice(0, start) + text + ta.value.slice(ta.selectionEnd))
    }
    if (selectStart !== undefined) {
      requestAnimationFrame(() => ta.setSelectionRange(start + selectStart, start + (selectEnd ?? selectStart)))
    }
  }

  const wrap = ([before, after, placeholder]: Wrap) => {
    const ta = textareaRef.current
    if (!ta) return
    const selected = ta.value.slice(ta.selectionStart, ta.selectionEnd) || placeholder
    insert(before + selected + after, before.length, before.length + selected.length)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const mod = e.ctrlKey || e.metaKey
    if (e.key === "Tab" && !mod) {
      e.preventDefault()
      insert("  ")
    } else if (mod && e.key === "b") {
      e.preventDefault()
      wrap(TOOLS[3].wrap)
    } else if (mod && e.key === "i") {
      e.preventDefault()
      wrap(TOOLS[4].wrap)
    } else if (mod && e.key === "k") {
      e.preventDefault()
      wrap(TOOLS[8].wrap)
    } else if (mod && e.key === "s") {
      e.preventDefault()
      publish()
    }
  }

  const onFiles = (files: FileList | null) => {
    if (!files?.length) return
    const slug = draft.id || slugify(draft.title) || "untitled"
    const added: Media[] = []
    let snippet = ""
    for (const file of Array.from(files)) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setStatus(`${file.name} is over 50 MB — GitHub won't accept it. Compress it first.`)
        continue
      }
      const url = `/blog/media/${slug}/${safeName(file.name)}`
      added.push({ repoPath: `public${url}`, url, file, blobUrl: URL.createObjectURL(file), committed: false })
      snippet += mediaSnippet(url)
    }
    setMedia(m => [...m.filter(x => !added.some(a => a.url === x.url)), ...added])
    if (snippet) insert(snippet)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const localUrls = useMemo(() => Object.fromEntries(media.map(m => [m.url, m.blobUrl])), [media])

  const onLibraryUploaded = useCallback((uploads: { url: string; file: File }[]) => {
    setMedia(ms => [
      ...ms.filter(m => !uploads.some(u => u.url === m.url)),
      ...uploads.map(u => ({ repoPath: `public${u.url}`, url: u.url, file: u.file, blobUrl: URL.createObjectURL(u.file), committed: true })),
    ])
  }, [])

  const insertFromLibrary = (url: string) => {
    setLibraryOpen(false)
    if (view === "preview") setView("split")
    requestAnimationFrame(() => insert(mediaSnippet(url)))
  }

  const confirmDiscard = () => !dirty || confirm("Discard unsaved changes?")

  const startNew = () => {
    if (!confirmDiscard()) return
    setDraft(newDraft())
    setMedia([])
    setDirty(false)
    setSlugTouched(false)
    saveDraft(null)
    setStatus("")
  }

  const openEntry = async (entry: BlogEntry) => {
    if (!session || !confirmDiscard()) return
    setBusy(true)
    setStatus(`Loading ${entry.title}…`)
    try {
      const file = await readFile(session.token, `public${entry.path}`)
      const body = hasBody(file)
      setDraft({
        originalId: entry.id,
        path: entry.path,
        id: entry.id,
        title: entry.title,
        date: entry.date,
        excerpt: entry.excerpt,
        tags: entry.tags.join(", "),
        mode: body ? "body" : "full",
        shell: file,
        body: body ? getBody(file) : "",
        full: file,
      })
      setMedia([])
      setDirty(false)
      setSlugTouched(true)
      saveDraft(null)
      setStatus(body ? "" : "This post has no blog-content <main>, so you're editing the full file.")
    } catch (err) {
      setStatus(`Couldn't load post: ${(err as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  async function publish() {
    if (!session || busy) return
    const id = draft.id.trim()
    if (!draft.title.trim()) return setStatus("Add a title first.")
    if (!/^[a-z0-9-]+$/.test(id)) return setStatus("Slug can only contain lowercase letters, numbers and dashes.")
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date)) return setStatus("Pick a date.")

    setBusy(true)
    setStatus("Publishing…")
    try {
      const latest = await readEntries(session.token)
      if (!draft.originalId && latest.some(e => e.id === id)) {
        throw new Error(`A post with slug "${id}" already exists.`)
      }
      const path = draft.path ?? `/blog/entries/${id}.html`
      const entry: BlogEntry = {
        id: draft.originalId ?? id,
        title: draft.title.trim(),
        date: draft.date,
        excerpt: draft.excerpt.trim(),
        tags: tagList(draft.tags),
        path,
      }
      const idx = latest.findIndex(e => e.id === entry.id)
      const next = idx >= 0 ? latest.map((e, i) => (i === idx ? entry : e)) : [...latest, entry]

      const pending = media.filter(m => !m.committed && html.includes(m.url))
      const changes: FileChange[] = [
        { path: `public${path}`, content: html },
        { path: "public/blog/entries.json", content: JSON.stringify(next, null, 2) + "\n" },
        ...pending.map(m => ({ path: m.repoPath, content: m.file })),
      ]
      await commit(session.token, `blog: ${draft.originalId ? "update" : "publish"} "${entry.title}"`, changes)

      setEntries(next)
      setMedia(ms => ms.map(m => (pending.includes(m) ? { ...m, committed: true } : m)))
      // Re-split so the editor reflects exactly what was committed.
      update({ originalId: entry.id, path, shell: html, full: html })
      setDirty(false)
      saveDraft(null)
      setStatus(`Published ✓ — live in a minute or two once the Pages build finishes.`)
    } catch (err) {
      setStatus(`Publish failed: ${(err as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  const deletePost = async () => {
    if (!session || !draft.originalId || !draft.path) return
    if (!confirm(`Delete "${draft.title}" from the site? This commits immediately.`)) return
    setBusy(true)
    setStatus("Deleting…")
    try {
      const next = (await readEntries(session.token)).filter(e => e.id !== draft.originalId)
      await commit(session.token, `blog: delete "${draft.title}"`, [
        { path: `public${draft.path}`, content: null },
        { path: "public/blog/entries.json", content: JSON.stringify(next, null, 2) + "\n" },
      ])
      setEntries(next)
      setDraft(newDraft())
      setDirty(false)
      saveDraft(null)
      setStatus("Deleted ✓")
    } catch (err) {
      setStatus(`Delete failed: ${(err as Error).message}`)
    } finally {
      setBusy(false)
    }
  }

  const signOut = () => {
    logout()
    setSession(null)
    setExpired(false)
  }

  if (checking) return <div className="studio" />

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="studio">
      {session && libraryOpen && (
        <MediaLibrary
          token={session.token}
          localUrls={localUrls}
          onUploaded={onLibraryUploaded}
          onInsert={insertFromLibrary}
          onClose={() => setLibraryOpen(false)}
        />
      )}
      {!session && <Login expired={expired} onLogin={s => { setSession(s); setExpired(false) }} />}

      <aside className="studio-sidebar">
        <button className="studio-primary" onClick={startNew}>+ New post</button>
        <h2>Posts</h2>
        <ul>
          {sorted.map(e => (
            <li key={e.id}>
              <button
                className={e.id === draft.originalId ? "active" : ""}
                onClick={() => openEntry(e)}
                disabled={busy}
              >
                <span>{e.title}</span>
                <small>{e.date}</small>
              </button>
            </li>
          ))}
        </ul>
        <button className="studio-link" onClick={signOut}>Log out</button>
        <button className="studio-link" onClick={() => { if (confirm("Remove the saved GitHub token from this browser?")) { forgetToken(); signOut() } }}>
          Forget GitHub token
        </button>
      </aside>

      <section className="studio-main">
        <div className="studio-meta">
          <label className="wide">
            Title
            <input value={draft.title} onChange={e => onTitle(e.target.value)} placeholder="Post title" />
          </label>
          <label>
            Slug
            <input
              value={draft.id}
              disabled={!!draft.originalId}
              onChange={e => { setSlugTouched(true); update({ id: e.target.value }) }}
              placeholder="my-post"
            />
          </label>
          <label>
            Date
            <input type="date" value={draft.date} onChange={e => update({ date: e.target.value })} />
          </label>
          <label>
            Tags <small>(comma separated)</small>
            <input value={draft.tags} onChange={e => update({ tags: e.target.value })} placeholder="deep-learning, notes" />
          </label>
          <label className="full">
            Excerpt
            <textarea rows={2} value={draft.excerpt} onChange={e => update({ excerpt: e.target.value })} placeholder="Shown on the blog listing" />
          </label>
        </div>

        <div className="studio-bar">
          <div className="studio-tools">
            {TOOLS.map(t => (
              <button key={t.label} title={t.title} onClick={() => wrap(t.wrap)} disabled={view === "preview"}>
                {t.label}
              </button>
            ))}
            <button title="Attach image / video / audio to this post (uploads on publish)" onClick={() => fileInputRef.current?.click()} disabled={view === "preview"}>
              + Media
            </button>
            <button title="Browse & upload images, then insert or copy their links" onClick={() => setLibraryOpen(true)} disabled={!session}>
              Library
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,application/pdf"
              hidden
              onChange={e => onFiles(e.target.files)}
            />
          </div>
          <div className="studio-toggles">
            <div className="studio-seg">
              <button className={draft.mode === "body" ? "on" : ""} onClick={() => switchMode("body")} title="Edit only the post content">Body</button>
              <button className={draft.mode === "full" ? "on" : ""} onClick={() => switchMode("full")} title="Edit the whole HTML file, incl. <style>">Full file</button>
            </div>
            <div className="studio-seg">
              {(["editor", "split", "preview"] as const).map(v => (
                <button key={v} className={view === v ? "on" : ""} onClick={() => setView(v)}>
                  {v[0].toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`studio-panes ${view}`}>
          <textarea
            ref={textareaRef}
            className="studio-editor"
            spellCheck={false}
            value={editorValue}
            onChange={e => setEditorValue(e.target.value)}
            onKeyDown={onKeyDown}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); onFiles(e.dataTransfer.files) }}
            onPaste={e => { if (e.clipboardData.files.length) { e.preventDefault(); onFiles(e.clipboardData.files) } }}
          />
          <iframe
            ref={iframeRef}
            className="studio-preview"
            title="Preview"
            srcDoc={preview}
            onLoad={() => iframeRef.current?.contentWindow?.scrollTo(0, scrollRef.current)}
          />
        </div>

        <footer className="studio-footer">
          <span className="studio-status">
            {status}
            {media.some(m => !m.committed) && ` · ${media.filter(m => !m.committed).length} media file(s) will upload on publish`}
          </span>
          <div>
            {draft.originalId && (
              <button className="studio-danger" onClick={deletePost} disabled={busy}>Delete</button>
            )}
            <button className="studio-primary" onClick={publish} disabled={busy || !session}>
              {busy ? "Working…" : draft.originalId ? "Update post" : "Publish"}
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}
