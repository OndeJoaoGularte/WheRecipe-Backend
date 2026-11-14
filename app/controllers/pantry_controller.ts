import PantryItem from '#models/pantry_item'
import { applyPantryUpdatesValidator, upsertPantryItemValidator } from '#validators/pantry'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

function serializePantry(items: PantryItem[]) {
  return items.map((item) => ({
    ingredientId: item.ingredientId,
    quantity: item.quantity,
  }))
}

async function listForUser(userId: number) {
  return PantryItem.query().where('user_id', userId).orderBy('ingredient_id', 'asc')
}

export default class PantryController {
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const items = await listForUser(user.id)
    return { data: serializePantry(items) }
  }

  async upsert({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { ingredientId, quantity } = await request.validateUsing(upsertPantryItemValidator)

    const existing = await PantryItem.query()
      .where('user_id', user.id)
      .where('ingredient_id', ingredientId)
      .first()

    if (existing) {
      existing.quantity = quantity
      await existing.save()
    } else {
      await PantryItem.create({
        userId: user.id,
        ingredientId,
        quantity,
      })
    }

    const items = await listForUser(user.id)
    return { data: serializePantry(items) }
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    await PantryItem.query()
      .where('user_id', user.id)
      .where('ingredient_id', params.ingredientId)
      .delete()

    const items = await listForUser(user.id)
    return { data: serializePantry(items) }
  }

  async applyUpdates({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const { updates } = await request.validateUsing(applyPantryUpdatesValidator)

    await db.transaction(async (trx) => {
      for (const update of updates) {
        const existing = await PantryItem.query({ client: trx })
          .where('user_id', user.id)
          .where('ingredient_id', update.ingredientId)
          .first()

        if (update.quantity === null || update.quantity.trim() === '') {
          if (existing) {
            await existing.useTransaction(trx).delete()
          }
          continue
        }

        const quantity = update.quantity.trim()
        if (existing) {
          existing.quantity = quantity
          await existing.useTransaction(trx).save()
        } else {
          await PantryItem.create(
            {
              userId: user.id,
              ingredientId: update.ingredientId,
              quantity,
            },
            { client: trx }
          )
        }
      }
    })

    const items = await listForUser(user.id)
    return { data: serializePantry(items) }
  }
}
