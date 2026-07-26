export function generateSessionToken(): string {
  return crypto.randomUUID()
}

export function clearSessionCookie() {
  // stub
}

export function getSessionFromCookie() {
  return null
}
