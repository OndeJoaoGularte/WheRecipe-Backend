import { IngredientCategorySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ingredient from '#models/ingredient'

export default class IngredientCategory extends IngredientCategorySchema {
  @hasMany(() => Ingredient, { foreignKey: 'categoryId' })
  declare ingredients: HasMany<typeof Ingredient>
}
