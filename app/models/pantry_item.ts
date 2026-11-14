import { PantryItemSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ingredient from '#models/ingredient'
import User from '#models/user'

export default class PantryItem extends PantryItemSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Ingredient)
  declare ingredient: BelongsTo<typeof Ingredient>
}
