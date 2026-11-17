import env from '#start/env'
import { defineConfig } from '@adonisjs/cors'

function resolveOrigin(): boolean | string[] {
  const raw = env.get('CORS_ORIGIN')
  if (!raw) {
    // Same spirit as Express `cors()` with no options: allow any browser origin.
    return true
  }

  const origins = raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return origins.length > 0 ? origins : true
}

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: resolveOrigin(),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
