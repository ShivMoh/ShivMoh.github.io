// Thin wrapper over the GitHub REST API. Publishing builds a single commit
// (Git Data API) so a post + its media + entries.json land in one deploy.

export const REPO = "ShivMoh/ShivMoh.github.io"
export const BRANCH = "main"
const API = `https://api.github.com/repos/${REPO}`

export interface BlogEntry {
  id: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  path: string
}

export interface FileChange {
  path: string
  /** utf-8 text, or a File/Blob for binary media; null deletes the path */
  content: string | Blob | null
}

async function gh<T>(token: string, path: string, init: RequestInit = {}, accept = "application/vnd.github+json"): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: accept,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
    },
  })
  if (!res.ok) {
    const body = await res.text()
    if (res.status === 401) throw new Error("GitHub rejected the token (expired or revoked). Use “Forget GitHub token” and log in with a new one.")
    if (res.status === 403 && body.includes("not accessible by personal access token")) {
      throw new Error(`Your GitHub token can't write to ${REPO}. Edit it at github.com/settings/personal-access-tokens: Repository access → only ${REPO}, Contents → Read and write.`)
    }
    throw new Error(`GitHub ${res.status}: ${body.slice(0, 300)}`)
  }
  return (accept.includes("raw") ? res.text() : res.json()) as Promise<T>
}

export const readFile = (token: string, path: string) =>
  gh<string>(token, `/contents/${path}?ref=${BRANCH}`, {}, "application/vnd.github.raw+json")

export async function readEntries(token: string): Promise<BlogEntry[]> {
  return JSON.parse(await readFile(token, "public/blog/entries.json"))
}

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve((reader.result as string).split(",")[1])
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

export async function commit(token: string, message: string, changes: FileChange[]) {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${BRANCH}`)
  const head = await gh<{ tree: { sha: string } }>(token, `/git/commits/${ref.object.sha}`)

  const tree = await Promise.all(
    changes.map(async ({ path, content }) => {
      if (content === null) return { path, mode: "100644", type: "blob", sha: null }
      if (typeof content === "string") return { path, mode: "100644", type: "blob", content }
      const blob = await gh<{ sha: string }>(token, "/git/blobs", {
        method: "POST",
        body: JSON.stringify({ content: await blobToBase64(content), encoding: "base64" }),
      })
      return { path, mode: "100644", type: "blob", sha: blob.sha }
    }),
  )

  const newTree = await gh<{ sha: string }>(token, "/git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: head.tree.sha, tree }),
  })
  const newCommit = await gh<{ sha: string }>(token, "/git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }),
  })
  await gh(token, `/git/refs/heads/${BRANCH}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: newCommit.sha }),
  })
  return newCommit.sha
}

/** Lists every file under `prefix` on the branch (one request, via the recursive tree). */
export async function listFiles(token: string, prefix: string): Promise<string[]> {
  const res = await gh<{ tree: { path: string; type: string }[] }>(token, `/git/trees/${BRANCH}?recursive=1`)
  return res.tree.filter(t => t.type === "blob" && t.path.startsWith(prefix)).map(t => t.path)
}
