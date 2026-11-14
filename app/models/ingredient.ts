import { IngredientSchema } from '#database/schema'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import IngredientCategory from '#models/ingredient_category'
import IngredientFamily from '#models/ingredient_family'

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

export default class Ingredient extends IngredientSchema {
  @column({
    prepare: prepareJson,
    consume: consumeJson,
  })
  declare aliases: string[] | null

  @belongsTo(() => IngredientCategory, { foreignKey: 'categoryId' })
  declare category: BelongsTo<typeof IngredientCategory>

  @belongsTo(() => IngredientFamily, { foreignKey: 'familyId' })
  declare family: BelongsTo<typeof IngredientFamily>
}
