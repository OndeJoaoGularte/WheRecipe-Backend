import { Env } from '@adonisjs/core/env'

/**
 * Defaults so Render can run with mostly DATABASE_URL,
 * similar to simpler Express apps (e.g. OndeEstudo).
 * Render injects PORT and RENDER_EXTERNAL_URL automatically.
 */
process.env.NODE_ENV ||= 'production'
process.env.HOST ||= '0.0.0.0'
process.env.PORT ||= '3333'
process.env.LOG_LEVEL ||= 'info'
process.env.SESSION_DRIVER ||= 'cookie'
process.env.DB_CONNECTION ||= process.env.DATABASE_URL ? 'postgres' : 'sqlite'
process.env.APP_URL ||=
  process.env.RENDER_EXTERNAL_URL || `http://127.0.0.1:${process.env.PORT}`
/**
 * Stable demo fallback (same idea as OndeEstudo's JWT || "fallback_secret").
 * Override with a real APP_KEY in production if you harden the app later.
 */
process.env.APP_KEY ||= 'f8iVXIBCKHAVUQJ2mpa/GgefwE0g4d6VLRXdYe4mlGQ='

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  APP_KEY: Env.schema.secret(),
  APP_URL: Env.schema.string({ format: 'url', tld: false }),

  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory', 'database'] as const),

  DB_CONNECTION: Env.schema.enum(['sqlite', 'postgres'] as const),
  DATABASE_URL: Env.schema.string.optional(),
  DB_HOST: Env.schema.string.optional({ format: 'host' }),
  DB_PORT: Env.schema.number.optional(),
  DB_USER: Env.schema.string.optional(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string.optional(),

  /**
   * Optional. If omitted, CORS reflects any origin (demo-friendly).
   * Example: https://whe-recipe-frontend.vercel.app
   */
  CORS_ORIGIN: Env.schema.string.optional(),

  TYPESENSE_HOST: Env.schema.string.optional({ format: 'host' }),
  TYPESENSE_PORT: Env.schema.number.optional(),
  TYPESENSE_PROTOCOL: Env.schema.enum.optional(['http', 'https'] as const),
  TYPESENSE_API_KEY: Env.schema.string.optional(),
})
