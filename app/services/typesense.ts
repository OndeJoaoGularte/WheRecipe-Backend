import env from '#start/env'
import Typesense from 'typesense'

/**
 * Optional Typesense client. Search still works via Lucid/SQL when Typesense
 * is unavailable (local sqlite / Docker not running).
 */
export function createTypesenseClient() {
  const host = env.get('TYPESENSE_HOST') ?? '127.0.0.1'
  const port = env.get('TYPESENSE_PORT') ?? 8108
  const protocol = env.get('TYPESENSE_PROTOCOL') ?? 'http'
  const apiKey = env.get('TYPESENSE_API_KEY') ?? 'wherecipe-dev-key'

  return new Typesense.Client({
    nodes: [{ host, port, protocol }],
    apiKey,
    connectionTimeoutSeconds: 2,
  })
}

export async function isTypesenseAvailable() {
  try {
    const client = createTypesenseClient()
    await client.health.retrieve()
    return true
  } catch {
    return false
  }
}
