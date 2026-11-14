import { RecipeSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import RecipeIngredient from '#models/recipe_ingredient'

function prepareJson(value: unknown) {
  if (value === null || value === undefined) return null
  return typeof value === 'string' ? value : JSON.stringify(value)
}

function consumeJson(value: unknown) {
  if (value === null || value === undefined) return null
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export default class Recipe extends RecipeSchema {
  @column({
    prepare: prepareJson,
    consume: consumeJson,
  })
  declare steps: string[]

  @column({
    prepare: prepareJson,
    consume: consumeJson,
  })
  declare tags: string[]

  @column({
    prepare: prepareJson,
    consume: consumeJson,
  })
  declare nutrition: Record<string, number> | null

  @hasMany(() => RecipeIngredient)
  declare recipeIngredients: HasMany<typeof RecipeIngredient>
}
