import { RecipeIngredientSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Recipe from '#models/recipe'

export default class RecipeIngredient extends RecipeIngredientSchema {
  @belongsTo(() => Recipe)
  declare recipe: BelongsTo<typeof Recipe>
}
