import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

/**
 * Neon/Render: parse DATABASE_URL into the explicit fields Lucid/Knex expect.
 * Avoids connectionString edge-cases that can yield bogus DNS lookups.
 */
function connectionFromDatabaseUrl(databaseUrl: string) {
  const sanitized = databaseUrl
    .trim()
    .replace(/[?&]channel_binding=require/g, '')
    .replace(/[?&]$/, '')

  let url: URL
  try {
    url = new URL(sanitized)
  } catch {
    throw new Error(
      'DATABASE_URL inválida. Use a connection string do Neon (postgresql://...).'
    )
  }

  const database = url.pathname.replace(/^\//, '').trim()
  if (!url.hostname || !database) {
    throw new Error(
      'DATABASE_URL sem host ou database. Confira o valor no painel do Render.'
    )
  }

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 5432,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database,
    ssl: { rejectUnauthorized: false },
  }
}

const databaseUrl = env.get('DATABASE_URL')

const postgresConnection = databaseUrl
  ? connectionFromDatabaseUrl(databaseUrl)
  : {
      host: env.get('DB_HOST'),
      port: env.get('DB_PORT'),
      user: env.get('DB_USER'),
      password: env.get('DB_PASSWORD'),
      database: env.get('DB_DATABASE'),
    }

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),

  connections: {
    sqlite: {
      client: 'better-sqlite3',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      schemaGeneration: {
        enabled: app.inDev,
        rulesPaths: ['./database/schema_rules.js'],
      },
    },

    postgres: {
      client: 'pg',
      connection: postgresConnection,
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      schemaGeneration: {
        enabled: app.inDev,
        rulesPaths: ['./database/schema_rules.js'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig
