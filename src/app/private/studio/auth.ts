import bcrypt from "bcryptjs"

// bcrypt hash of the studio password. The typed password is checked against it in the browser.
const PASSWORD_HASH = "$2a$12$xe5BTDzUDWuwkO3D24TJEe84EvpvDcguVcHaa/NfH9KfBijoAakji"

// The GitHub token used to publish is never in the code — it's pasted once and kept in this browser.
const TOKEN_KEY = "studio-github-token"

const COOKIE = "studio_session"
const SESSION_MS = 60 * 60 * 1000

export interface Session {
  token: string
  expiresAt: number
}

export function savedToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function forgetToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {}
}

/** Checks the password, then stores the hash in a 1-hour cookie. */
export async function login(password: string, newToken?: string): Promise<Session> {
  if (!(await bcrypt.compare(password, PASSWORD_HASH))) throw new Error("Incorrect password.")
  const token = newToken?.trim() || savedToken()
  if (!token) throw new Error("Paste a GitHub token to publish with.")
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {}

  const expiresAt = Date.now() + SESSION_MS
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${COOKIE}=${encodeURIComponent(`${PASSWORD_HASH}|${expiresAt}`)}; Max-Age=${SESSION_MS / 1000}; Path=/private; SameSite=Strict${secure}`
  return { token, expiresAt }
}

/** Restores a session from the cookie, or returns null if missing/expired/invalid. */
export function restoreSession(): Session | null {
  const match = document.cookie.split("; ").find(c => c.startsWith(`${COOKIE}=`))
  if (!match) return null
  const [hash, exp] = decodeURIComponent(match.slice(COOKIE.length + 1)).split("|")
  const expiresAt = Number(exp)
  const token = savedToken()
  if (hash !== PASSWORD_HASH || !expiresAt || expiresAt <= Date.now() || !token) {
    logout()
    return null
  }
  return { token, expiresAt }
}

export function logout() {
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/private; SameSite=Strict`
}
