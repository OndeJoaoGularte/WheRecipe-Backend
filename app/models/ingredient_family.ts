import { IngredientFamilySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ingredient from '#models/ingredient'

export default class IngredientFamily extends IngredientFamilySchema {
  @hasMany(() => Ingredient, { foreignKey: 'familyId' })
  declare ingredients: HasMany<typeof Ingredient>
}
