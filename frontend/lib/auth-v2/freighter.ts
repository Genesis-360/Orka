export async function connectFreighter(): Promise<string | null> {
  return null
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}
